"use client";
import { useState, useMemo, useEffect } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/UI/command";
import { useTagGuessGame } from "@/hooks/useTagGuessGame";
import GameHeader from "./UI/GameHeaderProps";
import { GameLayout } from "./GameLayout";
import { Button } from "./UI/button";
import { Flag } from "lucide-react";
import { ImageGameSkeleton } from "./UI/ImageGameSkeleton";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "./UI/checkbox";
import { TagGuessEndModal } from "./Game/TagGuessEndModal";
import { BlurImage } from "./UI/BlurImage";

function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function TagGuessGame() {
  const {
    lives,
    post,
    correctGuesses,
    wrongGuesses,
    targetTags,
    options,
    onSelectTag,
    round,
    loading,
    countCorrectGuesses,
  } = useTagGuessGame();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const params = useSearchParams();
  const router = useRouter();
  const blurEnabled = params.get("blur") === "true";

  // Filter out already guessed tags
  const availableOptions = useMemo(
    () =>
      options.filter(
        (tag) => !correctGuesses.includes(tag) || !wrongGuesses.includes(tag)
      ),
    [options, correctGuesses, wrongGuesses]
  );

  // Filter based on debounced query
  const filtered = useMemo(() => {
    if (!debouncedQuery) return availableOptions;
    return availableOptions.filter((tag) =>
      tag.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  }, [availableOptions, debouncedQuery]);

  const handleSurrender = () => {
    // TODO refactor from ClassicHeaderContent
    if (confirm("Are you sure you want to surrender and end this game?")) {
      router.push("/");
    }
  };

  const handleBlurToggle = () => {
    const next = new URLSearchParams(params.toString());
    if (blurEnabled) next.delete("blur");
    else next.set("blur", "true");

    router.replace(`?${next.toString()}`, { scroll: false });
  };

  const header = (
    <GameHeader
      left={
        <>
          <Checkbox
            checked={blurEnabled}
            onCheckedChange={handleBlurToggle}
            id="blur"
          />
          <label htmlFor="blur" className="text-sm">
            Blur
          </label>
          <span className="text-sm font-medium">Round: {round}</span>
        </>
      }
      center={
        <div className=" text-muted-foreground" aria-label="Lives">
          Life: {"❤️".repeat(lives)}
        </div>
      }
      right={
        <Button
          variant="destructive"
          className="flex items-center gap-1"
          onClick={handleSurrender}
        >
          <Flag size={16} /> Surrender
        </Button>
      }
    />
  );

  if (!post)
    return (
      <div className="min-h-screen flex flex-col items-center p-6 bg-background text-foreground">
        <div className="max-w-xl w-full">
          <ImageGameSkeleton />
        </div>
      </div>
    );

  if (lives <= 0)
    return (
      // rounds: number;
      // correctCounter: number;       // total correct across all rounds
      // correctThisRound: number;
      // totalThisRound: number;
      <TagGuessEndModal
        rounds={round}
        correctCounter={countCorrectGuesses}
        correctThisRound={correctGuesses.length}
        totalThisRound={targetTags.length}
      />
    );

  return (
    <GameLayout header={header}>
      {loading && <ImageGameSkeleton />}
      {!loading && (
        <div className="p-6 bg-card rounded-xl shadow-lg">
          <BlurImage post={post} blur={blurEnabled} />
          <Command className="w-full">
            <CommandInput
              placeholder="Guess a tag…"
              className="w-full"
              value={query}
              onValueChange={(val: string) => setQuery(val)}
            />
            {query.length > 0 && (
              <CommandList className="w-full max-h-60 overflow-auto shadow-md bg-card rounded-lg">
                <CommandEmpty>No tags found.</CommandEmpty>
                <CommandGroup>
                  {filtered.map((tag) => (
                    <CommandItem
                      key={tag}
                      value={tag}
                      onSelect={() => {
                        onSelectTag(tag);
                        // setQuery("");
                      }}
                      disabled={
                        correctGuesses.includes(tag) ||
                        wrongGuesses.includes(tag)
                      }
                    >
                      {tag}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            )}
          </Command>

          <div className="mt-4 text-sm text-muted-foreground">
            Guessed ({correctGuesses.length}/{targetTags.length}):{" "}
            {correctGuesses.join(", ")}
          </div>
        </div>
      )}
    </GameLayout>
  );
}
