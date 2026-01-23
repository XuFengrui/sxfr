"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { HomePage } from "@/components/home-page"
import { DrawPage } from "@/components/draw-page"
import { PasswordPage } from "@/components/password-page"
import { VideoPage } from "@/components/video-page"
import { wishes } from "@/lib/wishes-data"

export type CategoryType = "sad" | "angry" | "happy" | "hidden"
export type ViewState = "home" | "draw" | "password" | "video"

export default function Page() {
  const [viewState, setViewState] = useState<ViewState>("home")
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null)
  const [drawnWishes, setDrawnWishes] = useState<number[]>([])
  const [allComplete, setAllComplete] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("drawnWishes")
    if (saved) {
      const parsed = JSON.parse(saved)
      setDrawnWishes(parsed)
      setAllComplete(parsed.length >= wishes.length)
    }
  }, [])

  useEffect(() => {
    // 刷新/回到首页时，如果已全部抽完，自动跳转到密码页
    if (allComplete && viewState === "home") {
      setViewState("password")
    }
  }, [allComplete, viewState])

  const handleSelectCategory = (category: CategoryType) => {
    setSelectedCategory(category)
    setViewState("draw")
  }

  const handleDrawComplete = (wishId: number) => {
    const newDrawn = [...drawnWishes, wishId]
    setDrawnWishes(newDrawn)
    localStorage.setItem("drawnWishes", JSON.stringify(newDrawn))
    if (newDrawn.length >= wishes.length) {
      setAllComplete(true)
      // 最后一个心愿抽出后，稍等动画结束自动进入密码页
      setTimeout(() => setViewState("password"), 900)
    }
  }

  const handleReset = () => {
    localStorage.removeItem("drawnWishes")
    setDrawnWishes([])
    setAllComplete(false)
    setViewState("home")
  }

  const handleUnlock = () => {
    setViewState("video")
  }

  const getCategoryStats = (category: CategoryType) => {
    const categoryWishes = wishes.filter(w => w.category === category)
    const drawn = categoryWishes.filter(w => drawnWishes.includes(w.id)).length
    return { total: categoryWishes.length, drawn }
  }

  return (
    <main className="min-h-svh bg-background overflow-hidden">
      <AnimatePresence mode="wait">
        {viewState === "home" && (
          <HomePage
            key="home"
            onSelectCategory={handleSelectCategory}
            getCategoryStats={getCategoryStats}
            allComplete={allComplete}
            onReset={handleReset}
            onGoToSecret={() => setViewState("password")}
          />
        )}
        {viewState === "draw" && selectedCategory && (
          <DrawPage
            key="draw"
            category={selectedCategory}
            drawnWishes={drawnWishes}
            onDrawComplete={handleDrawComplete}
            onBack={() => setViewState("home")}
          />
        )}
        {viewState === "password" && (
          <PasswordPage
            key="password"
            onUnlock={handleUnlock}
            onBack={() => setViewState("home")}
          />
        )}
        {viewState === "video" && (
          <VideoPage
            key="video"
            onBack={() => setViewState("home")}
          />
        )}
      </AnimatePresence>
    </main>
  )
}
