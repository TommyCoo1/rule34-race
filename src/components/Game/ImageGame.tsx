"use client";

import { useGameContext } from "@/context/GameProvider";
import { DeadEndModal } from "./DeadEndModal";
import { useSearchParams } from "next/navigation";
import { VictoryModal } from "./VictoryModal";
import { TagList } from "./TagList";
import { ImageGameSkeleton } from "../UI/ImageGameSkeleton";
import { BlurImage } from "../UI/BlurImage";

export default function ImageGame() {
  const { state, loading, error, selectTag, pickFallbackPost, closeDeadEnd } =
    useGameContext();

  if (!state) return <p>No game state found.</p>;

  const { currentPost, path, goalTag, history, deadEndOptions } = state;
  const tags = currentPost.tags.split(" ");
  const params = useSearchParams();
  const blur = params.get("blur") === "true";// TODO maybe safe in state, if age restriction is set
  if (currentPost.tags.includes(goalTag)) {
    state.isGameOver = true;// TODO actually set this in the state
    // setState((prev) => (prev ? { ...prev, deadEndOptions: null } : prev));
  }

  return (
    <div className="max-w-xl mx-auto">
      {loading && <ImageGameSkeleton />}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <>
          <BlurImage post={currentPost} blur={blur} />

          {state.isGameOver ? (
            <div className="relative">
              <VictoryModal />
            </div>
          ) : (
            <section className="mt-5">
              <h2 className="font-bold">Choose a Tag:</h2>
              <TagList tags={tags} onTagSelect={selectTag} maxVisible={12} />
            </section>
          )}
        </>
      )}
      {deadEndOptions !== null && (
        <DeadEndModal
          options={deadEndOptions}
          onPick={pickFallbackPost}
          onClose={closeDeadEnd}
        />
      )}
    </div>
  );
}
