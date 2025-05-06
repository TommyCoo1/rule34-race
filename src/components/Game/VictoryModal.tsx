// src/components/Game/VictoryModal.tsx
"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/UI/dialog";
import { Button } from "@/components/UI/button";
import { useGameContext } from "@/context/GameProvider";
import { formatDuration } from "@/lib/utils";
import { useWindowSize } from "react-use";
import { useRouter } from "next/navigation";
import { FullScreenConfetti } from "../UI/FullScreenConfetti";

export function VictoryModal() {
  const { state, startTime, endTime } = useGameContext()!;
  const { path } = state!;
  const router = useRouter();

  const duration = formatDuration(startTime ?? 0, endTime ?? 0);

  const shareData = {
    title: "I just won Rule34‑Race!",
    text: `I reached the goal in ${
      path.length
    } steps and ${duration}.\nPath: ${path.join(" → ")}`,
    url: window.location.href,
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(
        `${shareData.text}, Try it: ${shareData.url}`
      );
      alert("Result copied to clipboard!");
    }
  };

  const handleClose = () => {
    router.push("/");
  };

  const { width, height } = useWindowSize();
  return (
    <Dialog open onOpenChange={(_) => handleClose()}>
      <DialogContent className="max-w-md text-center space-y-4">
        <DialogHeader>
          <DialogTitle>Congratulations! 🎉</DialogTitle>
        </DialogHeader>

        <FullScreenConfetti />

        <p>
          You finished in <strong>{duration}</strong>
        </p>
        <p>
          Steps: <strong>{path.length}</strong>
        </p>

        <div className="max-w-full overflow-x-auto py-2">
          <div className="inline-flex space-x-2">
            {path.map((tag, idx) => (
              <span
                key={idx}
                className="flex-shrink-0 bg-muted px-3 py-1 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2">
          <Button onClick={handleShare}>Share</Button>
          <Button variant="secondary" asChild>
            <a href="/">Home</a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
