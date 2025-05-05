import type { Post } from "@/types"

export interface ClassicModeConfig {
  id: "classic"
  title: string
  description: string
  setup: (initialPost: Post, goalTag: string) => {
    modeId: string
    goalTag: string
  }
}

export const Classic: ClassicModeConfig = {
  id: "classic",
  title: "Classic Mode",
  description: "Navigate from a start tag to the goal tag by selecting connecting tags.",
  setup: (initialPost, goalTag) => ({
    modeId: "classic",
    goalTag
  })
}
