"use client"

import { motion } from "framer-motion"
import { Cloud, Flame, Sun, Gift, RotateCcw } from "lucide-react"
import type { CategoryType } from "@/app/page"

interface HomePageProps {
  onSelectCategory: (category: CategoryType) => void
  getCategoryStats: (category: CategoryType) => { total: number; drawn: number }
  allComplete: boolean
  onReset: () => void
  onGoToSecret: () => void
}

const categories = [
  { 
    id: "sad" as CategoryType, 
    name: "难过", 
    icon: Cloud,
    bgClass: "bg-sad-bg",
    textClass: "text-sad-text",
    description: "让我安慰你"
  },
  { 
    id: "angry" as CategoryType, 
    name: "生气", 
    icon: Flame,
    bgClass: "bg-angry-bg",
    textClass: "text-angry-text",
    description: "我来哄哄你"
  },
  { 
    id: "happy" as CategoryType, 
    name: "开心", 
    icon: Sun,
    bgClass: "bg-happy-bg",
    textClass: "text-happy-text",
    description: "一起分享吧"
  },
  { 
    id: "hidden" as CategoryType, 
    name: "隐藏", 
    icon: Gift,
    bgClass: "bg-hidden-bg",
    textClass: "text-hidden-text",
    description: "神秘惊喜"
  },
]

export function HomePage({ 
  onSelectCategory, 
  getCategoryStats, 
  allComplete, 
  onReset,
  onGoToSecret 
}: HomePageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-svh px-5 py-10 pb-safe flex flex-col"
    >
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-primary/10 mb-4 overflow-hidden">
          <img src="/logo.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-2xl font-semibold text-foreground mb-1">
          情绪充电屋
        </h1>
        <p className="text-sm text-muted-foreground">
          想牵你的手 从心动 到古稀 到尽头
        </p>
      </motion.header>

      {/* Category Grid */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto w-full">
          {categories.map((cat, index) => {
            const stats = getCategoryStats(cat.id)
            const Icon = cat.icon

            const isComplete = stats.drawn === stats.total

            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + index * 0.08 }}
                onClick={() => !isComplete && onSelectCategory(cat.id)}
                disabled={isComplete}
                className={`
                  relative aspect-square rounded-3xl p-5 flex flex-col items-center justify-center
                  transition-all duration-200 touch-manipulation select-none
                  ${cat.bgClass}
                  ${isComplete 
                    ? "opacity-40 grayscale" 
                    : "active:scale-95 shadow-sm hover:shadow-md"
                  }
                `}
              >
                <div className={`mb-2 ${cat.textClass}`}>
                  <Icon className="w-10 h-10" strokeWidth={1.5} />
                </div>
                <span className={`text-lg font-medium ${cat.textClass}`}>
                  {cat.name}
                </span>
                <span className={`text-xs mt-1 opacity-70 ${cat.textClass}`}>
                  {cat.description}
                </span>
                
                {/* Badge */}
                <div className={`
                  absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-medium
                  bg-card/80 backdrop-blur-sm ${cat.textClass}
                `}>
                  {stats.drawn}/{stats.total}
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Footer Actions */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex flex-col items-center gap-3"
      >
        {allComplete && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onGoToSecret}
            className="w-full max-w-[200px] h-12 rounded-2xl bg-hidden-bg text-hidden-text font-medium text-base
              active:scale-95 transition-transform touch-manipulation shadow-sm"
          >
            好像还有些话没有说完...
          </motion.button>
        )}
        
        <button
          onClick={() => {
            if (confirm("确定要重置所有心愿吗？")) {
              onReset()
            }
          }}
          className="hidden flex items-center gap-2 text-sm text-muted-foreground active:opacity-70 transition-opacity touch-manipulation"
        >
          <RotateCcw className="w-4 h-4" />
          重置心愿盒
        </button>
      </motion.footer>
    </motion.div>
  )
}
