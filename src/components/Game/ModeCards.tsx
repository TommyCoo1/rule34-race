'use client';
import { GameMode } from '@/types';
import { Button } from '../UI/button';

export function ModeCard({ mode, onPlay }: { mode: GameMode; onPlay: () => void }) {
  return (
    <div className="rounded-2xl shadow-md p-6 bg-background border border-border flex flex-col gap-4 items-center text-center hover:shadow-lg transition-all">
      <div className="text-4xl">{mode.icon}</div>
      <h3 className="text-xl font-bold text-foreground">{mode.title}</h3>
      <p className="text-sm text-muted-foreground">{mode.description}</p>
      <Button onClick={onPlay}>Play</Button>
    </div>
  );
}