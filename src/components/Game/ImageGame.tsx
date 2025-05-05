"use client";

import { useGameContext } from "@/context/GameProvider";
import { DeadEndModal } from "./DeadEndModal";
import { useSearchParams } from "next/navigation";

export default function ImageGame() {
  const { state, loading, error, selectTag, pickFallbackPost, closeDeadEnd } =
    useGameContext();

  if (!state) return <p>No game state found.</p>;

  const { currentPost, path, goalTag, history, deadEndOptions } = state;
  const tags = currentPost.tags.split(" "); // TODO Encountered two children with the same key error, need to fix this
  const params = useSearchParams();
  const blur = params.get("blur") === "true";

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

          {currentPost.tags.includes(goalTag) ? (
            <div className="mt-5 text-green-600 font-bold">
              🎉 Goal tag <strong>{goalTag}</strong> reached in {path.length}{" "}
              steps!
            </div>
          ) : (
            <section className="mt-5">
              <h2 className="font-bold">Choose a Tag:</h2>
              <ul className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <li key={tag}>
                    <button
                      onClick={() => selectTag(tag)}
                      className="bg-blue-900 text-white px-3 py-1 rounded"
                    >
                      {tag}
                    </button>
                  </li>
                ))}
              </ul>
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
