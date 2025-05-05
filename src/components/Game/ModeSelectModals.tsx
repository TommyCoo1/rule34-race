'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/UI/dialog"
import { useEffect, useState } from 'react';
import { useRandomTags } from '@/hooks/useRandomTags';
import { useRouter } from 'next/navigation';
import { GameMode, TagPair } from '@/types';
import { Input } from '../UI/input';
import { Button } from '../UI/button';

export function ModeSelectModal({
  isOpen,
  onClose,
  mode
}: {
  isOpen: boolean;
  onClose: () => void;
  mode: GameMode | null;
}) {
  const { generateTags } = useRandomTags();
  const [tags, setTags] = useState<TagPair>({ startTag: '', endTag: '' });
  const router = useRouter();

  useEffect(() => {
    if (isOpen) setTags(generateTags());
  }, [isOpen, generateTags]);

  const handleSurprise = () => setTags(generateTags());

  const handleStart = () => {
    router.push(`/game?start=${tags.startTag}&end=${tags.endTag}&mode=${mode?.id}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open: any) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{mode?.title} Mode</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-2">
          <Input
            value={tags.startTag}
            onChange={e => setTags(t => ({ ...t, startTag: e.target.value }))}
            placeholder="Start Tag"
          />
          <Input
            value={tags.endTag}
            onChange={e => setTags(t => ({ ...t, endTag: e.target.value }))}
            placeholder="End Tag"
          />
          <div className="flex gap-2 justify-between mt-2">
            <Button variant="secondary" onClick={handleSurprise}>
              Surprise Me
            </Button>
            <Button onClick={handleStart}>Start Game</Button>
          </div>
          <Button variant="ghost" className="mt-4" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
