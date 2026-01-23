"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Heart } from "lucide-react"

interface VideoPageProps {
  onBack: () => void
}

export function VideoPage({ onBack }: VideoPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-svh flex flex-col bg-foreground"
    >
      {/* Header */}
      <header className="flex items-center px-4 py-3 pt-safe">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-background/70 active:opacity-70 transition-opacity touch-manipulation"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">返回</span>
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Title */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/20 mb-3">
              <Heart className="w-6 h-6 text-primary" fill="currentColor" />
            </div>
            <h2 className="text-xl font-semibold text-background mb-1">
              专属于你的惊喜
            </h2>
            <p className="text-sm text-background/60">
              感谢你陪我走过每一天
            </p>
          </div>

          {/* Video */}
          <div className="rounded-2xl overflow-hidden shadow-2xl bg-background/10">
            <video
              controls
              autoPlay
              playsInline
              className="w-full aspect-video"
              src="/surprise-video.mp4"
              poster="/video-poster.jpg"
            >
              您的浏览器不支持视频播放
            </video>
          </div>

          {/* Note */}
          <p className="text-center mt-4 text-xs text-background/40">
            请将视频文件命名为 surprise-video.mp4 放在 public 文件夹
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="px-5 pb-8 pb-safe text-center">
        <p className="text-sm text-background/60">
          永远爱你
        </p>
      </footer>
    </motion.div>
  )
}
