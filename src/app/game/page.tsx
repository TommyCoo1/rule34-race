"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { fetchPostByTagViaProxy } from "@/hooks/useRule34Api"
import { GameProvider } from "@/context/GameProvider"
import { Post } from "@/types"
import ImageGame from "@/components/Game/ImageGame"

export default function GamePage() {
  const params = useSearchParams()
  const start = params.get("start") || "cat_ears"
  const end = params.get("end") || "tentacles" // Fallback Zieltag
  const mode = params.get("mode") || "classic"

  const [post, setPost] = useState<Post | null>(null)

  useEffect(() => {
    fetchPostByTagViaProxy(start).then(setPost)
  }, [start])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Game Mode: {mode}</h1>
      <p>Start Tag: <strong>{start}</strong></p>
      <p>End Tag: <strong>{end}</strong></p>

      {post ? (
        <GameProvider initialPost={post} goalTag={end}>
          <ImageGame />
        </GameProvider>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  )
}
