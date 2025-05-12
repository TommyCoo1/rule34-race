"use client";

import { Mode } from "@/lib/gameState";
import ClassicGame from "@/components/ClassicGame";
import TagGuessGame from "@/components/TagGuessGame";
import TagHangmenGame from "@/components/TagHangMenGame";
import { useSearchParams } from "next/navigation";

export default function GamePage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') as Mode | null
  switch (mode) {
    case Mode.Classic:
      return <ClassicGame />;
    case Mode.TagGuessr:
      return <TagGuessGame />;
    case Mode.TagHangmen:
      return <TagHangmenGame />;
    default:
      return <div>Unknown mode</div>;
  }
}
