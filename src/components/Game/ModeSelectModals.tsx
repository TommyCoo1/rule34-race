
'use client';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
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
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="bg-background p-6 rounded-2xl max-w-md w-full shadow-xl border border-border">
              <Dialog.Title className="text-xl font-semibold mb-4 text-foreground">
                {mode?.title} Mode
              </Dialog.Title>

              <div className="flex flex-col gap-3">
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
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}