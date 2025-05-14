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
  const handleSurrender = () => {// TODO refactor from ClassicHeaderContent
    if (confirm("Are you sure you want to surrender and end this game?")) {
      // router.push("/");
    }
  };

function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function TagGuessGame() {
  const { lives, post, guessList, targetTags, options, onSelectTag, round } =
    useTagGuessGame();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  // Filter out already guessed tags
  const availableOptions = useMemo(
    () => options.filter((tag) => !guessList.includes(tag)),
    [options, guessList]
  );

  // Filter based on debounced query
  const filtered = useMemo(() => {
    if (!debouncedQuery) return availableOptions;
    return availableOptions.filter((tag) =>
      tag.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  }, [availableOptions, debouncedQuery]);

  if (!post) return <div>Loading…</div>;
  if (lives <= 0)
    return (
      <div className="text-center mt-10 text-xl font-semibold">
        Game Over! You reached round {round}.
      </div>
    );

  // Prepare header slots
  const header = (
    <GameHeader
      left={
        <>
          <span className="text-sm font-medium">Round: {round}</span>
        </>
      }
      center={
        <div className="text-sm" aria-label="Lives">
          {"❤️".repeat(lives)}
        </div>
      }
      right={
        <Button variant="destructive" className="flex items-center gap-1" onClick={handleSurrender}>
          <Flag size={16} /> Surrender
        </Button>}
    />
  );

  return (
    <GameLayout header={header}>
      <div className="p-6 bg-card rounded-xl shadow-lg">
        <img
          src={post.file_url}
          alt="Tag Guessing Challenge"
          className="mx-auto my-4 max-h-80 object-contain rounded"
        />

        <Command className="w-full" onValueChange={setQuery} value={query}>
          <CommandInput placeholder="Guess a tag…" className="w-full" />
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
                      setQuery("");
                    }}
                    disabled={guessList.includes(tag)}
                  >
                    {tag}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          )}
        </Command>

        <div className="mt-4 text-sm text-muted-foreground">
          Guessed ({guessList.length}/{targetTags.length}): {guessList.join(", ")}
        </div>
      </div>
    </GameLayout>
  );
}
