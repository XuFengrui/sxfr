// 心愿数据 - 从 JSON 列表读取（你只需要改 `lib/wishes.json`）
import wishesJson from "./wishes.json"

export type WishCategory = "sad" | "angry" | "happy" | "hidden"

export interface WishItem {
  id: number
  category: WishCategory
  content: string
}

export const wishes = wishesJson as WishItem[]
