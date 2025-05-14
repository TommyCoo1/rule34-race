import { HeaderSlots } from "@/types";

export default function GameHeader({ left, center, right }: HeaderSlots) {
  return (
    <header className="w-full max-w-4xl flex justify-between items-center border border-border bg-card p-4 rounded-xl shadow mb-6 sticky top-4 z-20">
      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
        {left}
      </div>

      <div className="text-center">{center}</div>

      <div className="flex items-center gap-2">{right}</div>
    </header>
  );
}
