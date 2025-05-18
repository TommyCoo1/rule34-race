// src/components/Game/TagGuessEndModal.tsx
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/UI/dialog";
import { Button } from "@/components/UI/button";
import { FullScreenConfetti } from "../UI/FullScreenConfetti";
import { useRouter } from "next/navigation";

interface Props {
  rounds: number;
  correctCounter: number;       // total correct across all rounds
  correctThisRound: number;
  totalThisRound: number;
}

export function TagGuessEndModal({ rounds, correctCounter, correctThisRound, totalThisRound }: Props) {
  const router = useRouter();

  // Share text includes both overall and this-round stats
  const shareText = `I got ${correctCounter} correct tags over ${rounds} rounds! In the last round I guessed ${correctThisRound}/${totalThisRound} tags. Can you beat that?`;
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleShare = async () => {
    const data = { title: "Tag Guessr Results", text: shareText, url: shareUrl };
    // if (navigator.share) {
    //   await navigator.share(data);
    // } else {
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      alert("Result copied to clipboard!");
    // }
  };

  return (
    <Dialog open onOpenChange={() => router.push("/") }>
      <DialogContent className="max-w-md text-center space-y-4 bg-card text-foreground rounded-xl shadow-lg p-6">
        <DialogHeader>
          <DialogTitle className="">Game Over</DialogTitle>
        </DialogHeader>

        <FullScreenConfetti />

        <p>Total correct tags: <strong>{correctCounter}</strong> over <strong>{rounds}</strong> rounds</p>
        <p>This round: <strong>{correctThisRound} / {totalThisRound}</strong> tags</p>

        <div className="flex justify-center gap-3 mt-4">
          <Button onClick={handleShare}>Share</Button>
          <Button onClick={() => router.refresh()}>Retry</Button>
          <Button variant="secondary" onClick={() => router.push("/")}>Home</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
