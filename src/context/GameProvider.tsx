'use client'

import { createContext, useContext, useState, useCallback } from "react"
import { createInitialState, applyTagSelection, GameState } from "@/lib/gameState"
import { fetchPostByTagViaProxy } from "@/hooks/useRule34Api"
import type { Post } from "@/types"

interface GameContextType {
  state: GameState | null
  loading: boolean
  error: string | null
  selectTag: (tag: string) => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function useGameContext() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error("GameContext not found")
  return ctx
}

export function GameProvider({ children, initialPost, goalTag }: {
  children: React.ReactNode
  initialPost: Post
  goalTag: string
}) {
  const [state, setState] = useState<GameState>(() => createInitialState(initialPost, goalTag))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const selectTag = useCallback(async (tag: string) => {
    setLoading(true)
    try {
      const newPost = await fetchPostByTagViaProxy(tag)
      setState(prev => prev ? applyTagSelection(prev, newPost, tag) : prev)
    } catch (err) {
      setError("Could not load post, error:" + (err as Error).message)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <GameContext.Provider value={{ state, loading, error, selectTag }}>
      {children}
    </GameContext.Provider>
  )
}
