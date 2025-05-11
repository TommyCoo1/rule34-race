
'use client';
import { useState } from 'react';
import { Flame, Clock, Footprints, Radar, Dices } from 'lucide-react';
import { GameMode } from '@/types';
import { ModeCard } from '@/components/Game/ModeCards';
import { ModeSelectModal } from '@/components/Game/ModeSelectModals';
import { Mode } from '@/lib/gameState';

const modes: GameMode[] = [
  {
    id: Mode.Classic,
    title: 'Classic',
    description: 'Navigate from a start to an end tag strategically.',
    icon: <Flame />
  },
  {
    id: Mode.TagGuessr,
    title: 'Tag Guessr',
    description: 'Guess tags of different shown posts.',
    icon: <Dices />
  },
  {
    id: Mode.TagHangmen,
    title: 'Tag Hangmen',
    description: 'Guess a random tag of a post without visualization.',
    icon: <Footprints />
  }
];

export default function Home() {
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 p-6 bg-muted">
      <h1 className="text-3xl font-bold text-foreground">Choose your game mode</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {modes.map(mode => (
          <ModeCard key={mode.id} mode={mode} onPlay={() => setSelectedMode(mode)} />
        ))}
      </div>
      <ModeSelectModal isOpen={!!selectedMode} mode={selectedMode} onClose={() => setSelectedMode(null)} />
    </main>
  );
}
