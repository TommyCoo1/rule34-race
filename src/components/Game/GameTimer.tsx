"use client";
import { useEffect, useState } from "react";
import { useGameContext } from "@/context/GameProvider";

function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function GameTimer() {
  const { startTime, endTime } = useGameContext();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (endTime) return; // Stoppt das Intervall, wenn Spiel vorbei
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  const currentTime = endTime ?? now;
  return (
    <span className="text-xs text-muted-foreground">
      Time: {formatDuration(currentTime - startTime)}
    </span>
  );
}
