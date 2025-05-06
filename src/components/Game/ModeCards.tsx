'use client';
import { GameMode } from '@/types';

interface ModeCardProps {
  mode: GameMode;
  onPlay: () => void;
}

export function ModeCard({ mode, onPlay }: ModeCardProps) {
  return (
    <button
      type="button"
      onClick={onPlay}
      className="
        group rounded-2xl p-6 bg-background border border-border shadow-md
        flex flex-col gap-4 items-center text-center
        transition-transform transition-shadow duration-200 ease-out
        hover:-translate-y-1 hover:scale-105 hover:shadow-xl
        active:scale-95 focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-ring cursor-pointer
      "
    >
      <span
        className="text-4xl transition-colors duration-200 group-hover:text-primary"
        aria-hidden="true"
      >
        {mode.icon}
      </span>
      <h3 className="text-xl font-bold text-foreground transition-colors duration-200 group-hover:text-primary">
        {mode.title}
      </h3>
      <p className="text-sm text-muted-foreground">{mode.description}</p>
    </button>
  );
}