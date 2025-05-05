import { ArrowLeft, Flag } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGameContext } from "@/context/GameProvider";
import { Button } from "@/components/UI/button";

export default function GameHeader() {
  const router = useRouter();
  const params = useSearchParams();
  const start = params.get("start") || "?";
  const end = params.get("end") || "?";

  const { state, goBack } = useGameContext();
  const steps = state?.path.length ?? 0;

  return (
    <header className="w-full max-w-4xl flex justify-between items-center border border-border bg-card p-4 rounded-xl shadow mb-6">
      <Button variant="ghost" onClick={goBack} className="flex items-center gap-1">
        <ArrowLeft size={18} /> Back
      </Button>

      <div className="text-center">
        <div className="font-semibold text-sm text-muted-foreground">
          {start} → {end}
        </div>
        <div className="text-xs text-muted-foreground">Steps: {steps}</div>
      </div>

      <Button variant="outline" className="flex items-center gap-1" disabled>
        <Flag size={16} /> Surrender
      </Button>
    </header>
  );
}
