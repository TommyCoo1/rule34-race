import { useEffect, useState, useMemo } from "react";
import { GameProvider } from "@/context/GameProvider";
import { fetchPostByTagViaProxy } from "@/hooks/useRule34Api";
import { Skeleton } from "@/components/UI/skeleton";
import { Post } from "@/types";
import { useDefaultHeaderContent } from "./Game/ClassicHeaderContent";
import { GameLayout } from "./GameLayout";
import ImageGame from "./Game/ImageGame";
import GameHeader from "./UI/GameHeaderProps";
import { useSearchParams } from "next/navigation";

export default function ClassicGame() {
  const params = useSearchParams();
  const start = params.get("start") || "cat_ears";
  const end = params.get("end") || "tentacles"; // Fallback Zieltag
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    fetchPostByTagViaProxy(start).then(setPost);
  }, [start]);

  if (!post) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <Skeleton className="my-28 w-4/12 h-96 rounded-md animate-pulse bg-gray-400" />
      </div>
    );
  }

  return (
    <GameProvider initialPost={post} goalTag={end}>
      <InnerGame />
    </GameProvider>
  );
}

function InnerGame() {
  const { left, center, right } = useDefaultHeaderContent();

  return (
    <GameLayout header={<GameHeader left={left} center={center} right={right} />}>
      <ImageGame />
    </GameLayout>
  );
}
