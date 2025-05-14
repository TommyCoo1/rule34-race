"use client";
import { useState, useMemo, useEffect } from "react";
// import { useTagGuessGame } from '@/hooks/useTagGuessGame";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/UI/command";
import { useTagGuessGame } from "@/hooks/useTagGuessGame";

function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handle = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handle);
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

  // Filtered based on debounced query
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

  return (
    <div className="container mx-auto p-6 bg-white rounded-xl shadow-lg max-w-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-medium">Round: {round}</div>
        <div className="text-lg">{"❤️".repeat(lives)}</div>
      </div>

      <img
        src={post.file_url}
        alt="Bild zum Erraten von Tags"
        className="mx-auto my-4 max-h-80 object-contain rounded shadow"
      />

      <Command
        className="w-full"
        onValueChange={setQuery}
        value={query}
      >
        <CommandInput placeholder="Guess a tag…" className="w-full" />
        {query.length > 0 && (
          <CommandList className="w-full max-h-60 overflow-auto shadow-md bg-white rounded-lg">
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

      <div className="mt-4 text-sm text-gray-700">
        Guessed ({guessList.length}/{targetTags.length}): {guessList.join(", ")}
      </div>
    </div>
  );
}
