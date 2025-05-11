
'use client';
// import { useTagGuessGame } from '../hooks/useTagGuessGame';
import { useTagGuessGame } from '@/hooks/useTagGuessGame';
import { useEffect, useState } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/UI/command';

export default function TagGuessGame() {
  const { lives, post, guessList, targetTags, options, onSelectTag, round } = useTagGuessGame();
  const [query, setQuery] = useState('');

  const filtered: string[] = query
    ? options.filter((tag: string) => tag.toLowerCase().includes(query.toLowerCase()))
    : options;

  if (!post) return <div>Loading...</div>;
  if (lives <= 0) return <div>Game Over! You reached round {round}.</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div>Round: {round}</div>
        <div>Lives: {'❤️'.repeat(lives)}</div>
      </div>
      <img src={post.file_url} alt="Rule34 post" className="mx-auto my-4 max-h-80 object-contain" />
      <Command onValueChange={setQuery} value={query}>
        <CommandInput placeholder="Guess a tag..." />
        <CommandList>
          <CommandEmpty>No tags found.</CommandEmpty>
          <CommandGroup>
            {filtered.map(tag => (
              <CommandItem
                key={tag}
                value={tag}
                onSelect={() => {
                  onSelectTag(tag);
                  setQuery('');
                }}
                disabled={guessList.includes(tag)}
              >
                {tag}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
      <div className="mt-4">
        Guessed ({guessList.length}/{targetTags.length}): {guessList.join(', ')}
      </div>
    </div>
  );
}