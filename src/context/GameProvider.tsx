"use client";

import { createContext, useContext, useState, useCallback } from "react";
import {
  createInitialState,
  applyTagSelection,
  goBackOneStep,
  GameState,
} from "@/lib/gameState";
import { fetchPostByTagViaProxy} from "@/hooks/useRule34Api";
import type { Post } from "@/types";
import { toast } from "sonner";

interface GameContextType {
  state: GameState | null;
  loading: boolean;
  error: string | null;
  startTime: number;
  endTime: number;
  selectTag: (tag: string) => void;
  goBack: () => void;
  pickFallbackPost: (post: Post) => void; // Add this line
  closeDeadEnd: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function useGameContext() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("GameContext not found");
  return ctx;
}

export function GameProvider({
  children,
  initialPost,
  goalTag,
}: {
  children: React.ReactNode;
  initialPost: Post;
  goalTag: string;
}) {
  const [state, setState] = useState<GameState>(() =>
    createInitialState(initialPost, goalTag)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startTime] = useState(() => Date.now());
  const [endTime, setEndTime] = useState(() => Date.now());


  const selectTag = useCallback(
    async (tag: string) => {
      setLoading(true);
      try {
        const newPost = await fetchPostByTagViaProxy(tag);
        if (!newPost) {
          toast.error("Dead end – choose another tag");
          return;
        }
        if (state.visitedPostIds.has(newPost.id)) {
          toast.warning("Already visited – pick another tag");
          // return;
        }
        if (newPost.tags.includes(goalTag)) {
          setEndTime(Date.now());
        }
        setState((prev) =>
          prev ? applyTagSelection(prev, newPost, tag) : prev
        );
      } catch (err) {
        setError("Could not load post, error:" + (err as Error).message);
      } finally {
        setLoading(false);
      }
    },
    [state, toast]
  );

  const goBack = useCallback(() => {
    setState((prev) => (prev ? goBackOneStep(prev) : prev));
  }, []);

  const pickFallbackPost = useCallback((post: Post) => {
    const fallback = "female"; // TODO: make this dynamic
    setState((prev) =>
      prev ? applyTagSelection(prev, post, fallback) : prev
    );
  }, []);

  const closeDeadEnd = useCallback(() => {
    setState((prev) => (prev ? { ...prev, deadEndOptions: null } : prev));
  }, []);// TODO: check if this is needed

  return (
    <GameContext.Provider
      value={{
        state,
        loading,
        error,
        selectTag,
        goBack,
        pickFallbackPost,
        closeDeadEnd,
        startTime,
        endTime,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
