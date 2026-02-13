"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Lock, Eye, EyeOff } from "lucide-react"

interface PasswordPageProps {
  onUnlock: () => void
  onBack: () => void
}

const CORRECT_PASSWORD = "SxfR1314" // 可以修改这个密码

export function PasswordPage({ onUnlock, onBack }: PasswordPageProps) {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const handleBack = () => {
    // 1) Try to go back via in-app state (smooth)
    // 2) Also force a "#home" hash change as a robust fallback
    try {
      onBack()
    } finally {
      if (typeof window !== "undefined") {
        window.location.hash = "home"
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === CORRECT_PASSWORD) {
      onUnlock()
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => {
        setShake(false)
        setError(false)
      }, 500)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="min-h-svh flex flex-col"
    >
      {/* Header */}
      <header className="flex items-center px-4 py-3 pt-safe">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-1 text-muted-foreground active:opacity-70 transition-opacity touch-manipulation"
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
          transition={{ delay: 0.1 }}
          className="w-full max-w-sm"
        >
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-3xl bg-hidden-bg flex items-center justify-center">
              <Lock className="w-10 h-10 text-hidden-text" strokeWidth={1.5} />
            </div>
          </div>

          {/* Text */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              好像还有些话没有说完......
            </h2>
            <p className="text-sm text-muted-foreground">
              输入专属密码解锁最后的惊喜
            </p>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            animate={shake ? { x: [-8, 8, -8, 8, 0] } : {}}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
                className={`
                  w-full h-14 px-5 pr-12 rounded-2xl bg-secondary text-foreground
                  placeholder:text-muted-foreground text-base
                  outline-none transition-all
                  ${error ? "ring-2 ring-destructive" : "focus:ring-2 focus:ring-primary"}
                `}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground touch-manipulation"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {error && (
              <p className="text-destructive text-sm text-center">
                密码错误，请重试
              </p>
            )}

            <button
              type="submit"
              className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-medium text-base
                active:scale-98 transition-transform touch-manipulation"
            >
              解锁惊喜
            </button>
          </motion.form>

          {/* Hint */}
          <p className="text-xs text-center text-muted-foreground mt-6">
            密码提示：我送你第一件礼物的时候说过
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
