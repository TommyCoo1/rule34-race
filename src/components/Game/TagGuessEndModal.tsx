// src/components/Game/TagGuessEndModal.tsx
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/UI/dialog";
import { Button } from "@/components/UI/button";
import { FullScreenConfetti } from "../UI/FullScreenConfetti";
import { useRouter } from "next/navigation";

interface Props {
  rounds: number;
  correct: number;
  total: number;
}

export function TagGuessEndModal({ rounds, correct, total }: Props) {
  const router = useRouter();

  // Share payload
  const shareText = `I guessed ${correct}/${total} tags in ${rounds} rounds before running out of lives! Think you can do better?`;
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleShare = async () => {
    const data = { title: "Tag Guessr Results", text: shareText, url: shareUrl };
    if (navigator.share) {
      await navigator.share(data);
    } else {
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      alert("Result copied to clipboard!");
    }
  };

  const handleRetry = () => {
    router.refresh();
  };

  const handleHome = () => {
    router.push("/");
  };

  return (
    <Dialog open onOpenChange={handleHome}>
      <DialogContent className="max-w-md text-center space-y-4 bg-card text-foreground rounded-xl shadow-lg p-6">
        <DialogHeader>
          <DialogTitle className="">Game Over</DialogTitle>
        </DialogHeader>

        <FullScreenConfetti />

        <p>You made it to round <strong>{rounds}</strong></p>
        <p>Correct guesses: <strong>{correct} / {total}</strong></p>

        <div className="flex justify-center gap-3 mt-4">
          <Button onClick={handleShare}>Share</Button>
          <Button onClick={handleRetry}>Retry</Button>
          <Button variant="secondary" onClick={handleHome}>Home</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}