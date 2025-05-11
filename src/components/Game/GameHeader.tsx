import { ArrowLeft, Flag } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGameContext } from "@/context/GameProvider";
import { Button } from "@/components/UI/button";
import GameTimer from "./GameTimer";
import { Checkbox } from "../UI/checkbox";

export default function GameHeader() {
  const router = useRouter();
  const params = useSearchParams();
  const start = params.get("start") || "?";
  const end = params.get("end") || "?";
  const blurEnabled = params.get("blur") === "true";

  const { state, goBack } = useGameContext();
  const steps = state?.path.length ?? 0;

  const handleBlurToggle = () => {
    const newParams = new URLSearchParams(params); // clone
    if (blurEnabled) newParams.delete("blur");
    else newParams.set("blur", "true");
    router.replace(`?${newParams.toString()}`, { scroll: false });
  };

  const handleSurrender = () => {
    if (confirm("Are you sure you want to surrender and end this game?")) {
      router.push("/"); // back to home page
    }
  };

  return (
    <header className="w-full max-w-4xl flex justify-between items-center border border-border bg-card p-4 rounded-xl shadow mb-6 top-4 sticky top-0 z-20">
      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
        <Button
          variant="ghost"
          onClick={goBack}
          className="
          flex items-center gap-1 
          disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!state || state.history.length <= 1}
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
      </div>

      <div className="text-center">
        <div className="font-semibold text-sm text-muted-foreground">
          {start} → {end}
        </div>
        <div className="text-xs text-muted-foreground">
          Steps: {steps} · <GameTimer />
        </div>
      </div>

      <Button
        variant="destructive"
        className="flex items-center gap-1"
        onClick={handleSurrender}
      >
        <Flag size={16} /> Surrender
      </Button>
    </header>
  );
}
