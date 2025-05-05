
'use client';
import { useState } from 'react';
import { Flame, Clock, Footprints, Radar } from 'lucide-react';
import { GameMode } from '@/types';
import { ModeCard } from '@/components/Game/ModeCards';
import { ModeSelectModal } from '@/components/Game/ModeSelectModals';

const modes: GameMode[] = [
  {
    id: 'classic',
    title: 'Classic',
    description: 'Navigate from a start to an end tag strategically.',
    icon: <Flame />
  },
  {
    id: 'time',
    title: 'Time Trial',
    description: 'Reach the goal as fast as you can.',
    icon: <Clock />
  },
  {
    id: 'step',
    title: 'Step Challenge',
    description: 'Use the fewest jumps to reach your destination.',
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
