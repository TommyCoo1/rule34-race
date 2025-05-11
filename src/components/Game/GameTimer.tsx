"use client";
import { useEffect, useState } from "react";
import { useGameContext } from "@/context/GameProvider";
import { formatDuration } from "@/lib/utils";

export default function GameTimer() {
  const { startTime, endTime, state } = useGameContext();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (state?.isGameOver) return; // stops interval when game is over
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [state?.isGameOver]);

  const currentTime = (state?.isGameOver) ? endTime : now;
  return (
    <span className="text-xs text-muted-foreground">
      Time: {formatDuration(startTime, currentTime)}
    </span>
  );
}
