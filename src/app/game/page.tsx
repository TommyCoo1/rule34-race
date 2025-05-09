"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchPostByTagViaProxy } from "@/hooks/useRule34Api";
import { GameProvider } from "@/context/GameProvider";
import { Post } from "@/types";
import ImageGame from "@/components/Game/ImageGame";
import GameHeader from "@/components/Game/GameHeader";

export default function GamePage() {
  const params = useSearchParams();
  const start = params.get("start") || "cat_ears";
  const end = params.get("end") || "tentacles"; // Fallback Zieltag
  const mode = params.get("mode") || "classic";

  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    fetchPostByTagViaProxy(start).then(setPost);
  }, [start]);

  return (
    <main className="min-h-screen flex flex-col items-center p-6 text-center">
      {post ? (
        <GameProvider initialPost={post} goalTag={end}>
          <GameHeader />
          <ImageGame />
        </GameProvider>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
