"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Volume2, VolumeX, Cloud, Flame, Sun, Gift } from "lucide-react"
import { wishes } from "@/lib/wishes-data"
import type { CategoryType } from "@/app/page"

interface DrawPageProps {
  category: CategoryType
  drawnWishes: number[]
  onDrawComplete: (wishId: number) => void
  onBack: () => void
}

const categoryConfig = {
  sad: { 
    name: "难过", 
    icon: Cloud,
    bgClass: "bg-sad-bg",
    textClass: "text-sad-text",
    cardBg: "from-blue-100 to-blue-200",
  },
  angry: { 
    name: "生气", 
    icon: Flame,
    bgClass: "bg-angry-bg",
    textClass: "text-angry-text",
    cardBg: "from-red-100 to-orange-100",
  },
  happy: { 
    name: "开心", 
    icon: Sun,
    bgClass: "bg-happy-bg",
    textClass: "text-happy-text",
    cardBg: "from-yellow-100 to-amber-100",
  },
  hidden: { 
    name: "隐藏", 
    icon: Gift,
    bgClass: "bg-hidden-bg",
    textClass: "text-hidden-text",
    cardBg: "from-purple-100 to-pink-100",
  },
}

export function DrawPage({ category, drawnWishes, onDrawComplete, onBack }: DrawPageProps) {
  const [currentWish, setCurrentWish] = useState<typeof wishes[0] | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const config = categoryConfig[category]
  const Icon = config.icon

  const availableWishes = wishes.filter(
    w => w.category === category && !drawnWishes.includes(w.id)
  )

  const handleDraw = () => {
    if (availableWishes.length === 0 || isDrawing) return

    setIsDrawing(true)
    setIsFlipped(false)

    // Play sound
    if (audioRef.current && !isMuted) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }

    // Simulate drawing animation
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * availableWishes.length)
      const wish = availableWishes[randomIndex]
      setCurrentWish(wish)
      
      setTimeout(() => {
        setIsFlipped(true)
        onDrawComplete(wish.id)
        setIsDrawing(false)
      }, 600)
    }, 400)
  }

  const handleContinue = () => {
    setCurrentWish(null)
    setIsFlipped(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="min-h-svh flex flex-col"
    >
      {/* Audio element */}
      <audio ref={audioRef} src="/draw-sound.mp3" preload="auto" />

      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 pt-safe">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-muted-foreground active:opacity-70 transition-opacity touch-manipulation"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">返回</span>
        </button>

        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bgClass}`}>
          <Icon className={`w-4 h-4 ${config.textClass}`} />
          <span className={`text-sm font-medium ${config.textClass}`}>
            {config.name}
          </span>
        </div>

        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-2 text-muted-foreground active:opacity-70 transition-opacity touch-manipulation"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-8">
        <AnimatePresence mode="wait">
          {!currentWish ? (
            // Card Stack (Ready to Draw)
            <motion.div
              key="stack"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-xs aspect-[3/4]"
            >
              {/* Stacked cards behind */}
              {[2, 1].map((i) => (
                <div
                  key={i}
                  className={`
                    absolute inset-0 rounded-3xl bg-gradient-to-br ${config.cardBg}
                    shadow-lg
                  `}
                  style={{
                    transform: `translateY(${i * 8}px) scale(${1 - i * 0.03})`,
                    opacity: 1 - i * 0.2,
                  }}
                />
              ))}

              {/* Front card */}
              <motion.button
                onClick={handleDraw}
                disabled={availableWishes.length === 0 || isDrawing}
                animate={isDrawing ? { 
                  rotateY: [0, 10, -10, 10, 0],
                  scale: [1, 1.02, 1]
                } : {}}
                transition={{ duration: 0.4 }}
                className={`
                  relative w-full h-full rounded-3xl bg-gradient-to-br ${config.cardBg}
                  shadow-xl flex flex-col items-center justify-center
                  active:scale-98 transition-transform touch-manipulation
                  ${availableWishes.length === 0 ? "opacity-50" : ""}
                `}
              >
                <div className={`mb-4 ${config.textClass}`}>
                  <Icon className="w-16 h-16" strokeWidth={1.5} />
                </div>
                <p className={`text-lg font-medium ${config.textClass}`}>
                  {availableWishes.length === 0 ? "已抽完" : "点击抽取"}
                </p>
                <p className={`text-sm mt-1 opacity-70 ${config.textClass}`}>
                  剩余 {availableWishes.length} 个心愿
                </p>
              </motion.button>
            </motion.div>
          ) : (
            // Revealed Card
            <motion.div
              key="revealed"
              initial={{ rotateY: 90 }}
              animate={{ rotateY: isFlipped ? 0 : 90 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full max-w-xs"
              style={{ perspective: 1000 }}
            >
              <div className={`
                rounded-3xl bg-gradient-to-br ${config.cardBg}
                shadow-xl p-6 flex flex-col items-center
              `}>
                <div className={`mb-4 ${config.textClass}`}>
                  <Icon className="w-12 h-12" strokeWidth={1.5} />
                </div>
                
                <div className="w-full bg-card/60 backdrop-blur-sm rounded-2xl p-5 mb-6">
                  <p className="text-center text-foreground leading-relaxed">
                    {currentWish.content}
                  </p>
                </div>

                <p className="text-xs text-muted-foreground mb-6">
                  记得让自己开心起来哦
                </p>

                <div className="flex gap-3 w-full">
                  <button
                    onClick={onBack}
                    className="flex-1 h-11 rounded-xl bg-secondary text-secondary-foreground font-medium
                      active:scale-98 transition-transform touch-manipulation"
                  >
                    返回首页
                  </button>
                  {availableWishes.length > 0 && (
                    <button
                      onClick={handleContinue}
                      className="flex-1 h-11 rounded-xl bg-primary text-primary-foreground font-medium
                        active:scale-98 transition-transform touch-manipulation"
                    >
                      继续抽取
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Progress */}
      <footer className="px-5 pb-8 pb-safe">
        <div className="max-w-xs mx-auto">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>已抽取</span>
            <span>{wishes.filter(w => w.category === category).length - availableWishes.length} / {wishes.filter(w => w.category === category).length}</span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ 
                width: `${((wishes.filter(w => w.category === category).length - availableWishes.length) / wishes.filter(w => w.category === category).length) * 100}%` 
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </footer>
    </motion.div>
  )
}
