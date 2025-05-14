// src/components/Game/useDefaultHeaderContent.tsx
import { ArrowLeft, Flag } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGameContext } from "@/context/GameProvider";
import { Button } from "@/components/UI/button";
import GameTimer from "./GameTimer";
import { Checkbox } from "../UI/checkbox";

export interface HeaderSlots {
  left: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
}

export function useDefaultHeaderContent(): HeaderSlots {
  const router = useRouter();
  const params = useSearchParams();
  const start = params.get("start") || "?";
  const end = params.get("end") || "?";
  const blurEnabled = params.get("blur") === "true";

  const { state, goBack } = useGameContext();
  const steps = state?.path.length ?? 0;

  const handleBlurToggle = () => {
    const newParams = new URLSearchParams(params);
    if (blurEnabled) newParams.delete("blur");
    else newParams.set("blur", "true");
    router.replace(`?${newParams.toString()}`, { scroll: false });
  };

  const handleSurrender = () => {
    if (confirm("Are you sure you want to surrender and end this game?")) {
      router.push("/");
    }
  };

  const left = (
    <>
      <Button
        variant="ghost"
        onClick={goBack}
        disabled={!state || state.history.length <= 1}
        className="flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowLeft size={18} /> Back
      </Button>
      <Checkbox
        checked={blurEnabled}
        onCheckedChange={handleBlurToggle}
        id="blur"
      />
      <label htmlFor="blur" className="text-sm">
        Blur
      </label>
    </>
  );

  const center = (
    <>
      <div className="font-semibold text-sm text-muted-foreground">
        {start} → {end}
      </div>
      <div className="text-xs text-muted-foreground">
        Steps: {steps} · <GameTimer />
      </div>
    </>
  );

  const right = (
    <Button variant="destructive" className="flex items-center gap-1" onClick={handleSurrender}>
      <Flag size={16} /> Surrender
    </Button>
  );

  return { left, center, right };
}
