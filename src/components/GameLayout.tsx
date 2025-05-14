import React from "react";

interface GameLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
}

export function GameLayout({ children, header }: GameLayoutProps) {
  return (
    <main className="min-h-screen flex flex-col items-center p-6 bg-background text-foreground">
      {header}
      <div className="max-w-xl w-full">
        {children}
      </div>
    </main>
  );
}
