"use client";

import ImageGame from "@/components/Game/ImageGame";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchPostByTagViaProxy } from "@/hooks/useRule34Api";
import { Post } from "@/types";

export default function GamePage() {
  const params = useSearchParams();
  const start = params.get("start") || "cat_ears";
  const end = params.get("end");
  const mode = params.get("mode");


  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    fetchPostByTagViaProxy(start).then(setPost);
  }, [start]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Game Mode: {mode}</h1>
      <p>Start Tag: <strong>{start}</strong></p>
      <p>End Tag: <strong>{end}</strong></p>

      {post ? <ImageGame initialPost={post} /> : <p>Loading...</p>}
    </main>
  );
}
