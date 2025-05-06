"use client";

import { useGameContext } from "@/context/GameProvider";
import { DeadEndModal } from "./DeadEndModal";
import { useSearchParams } from "next/navigation";
import { VictoryModal } from "./VictoryModal";
import { TagList } from "./TagList";

export default function ImageGame() {
  const { state, loading, error, selectTag, pickFallbackPost, closeDeadEnd } =
    useGameContext();

  if (!state) return <p>No game state found.</p>;

  const { currentPost, path, goalTag, history, deadEndOptions } = state;
  const tags = currentPost.tags.split(" ");
  const params = useSearchParams();
  const blur = params.get("blur") === "true";
  const hasWon = currentPost.tags.includes(goalTag);

  return (
    <div className="max-w-xl mx-auto">
      {loading && <p>Loading…</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <>
          <img
            src={currentPost.file_url}
            alt="Rule34 Post"
            className={`w-full rounded shadow-md filter ${
              blur ? "blur-3xl" : ""
            }`}
          />

          {hasWon ? (
            <div className="relative">
              <VictoryModal/>
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
