"use client"

import { useEffect } from "react"

export function PwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return
    // iOS Safari 也支持 service worker；注册失败不影响主流程
    navigator.serviceWorker.register("/sw.js").catch(() => {})
  }, [])

  return null
}

