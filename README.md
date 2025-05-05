## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

# Architecture, NOT UP TO DATE

```
/rule34
├─ next.config.js           # Next.js configuration
├─ tailwind.config.ts         # Tailwind config in TypeScript (theme, colors, etc.)
├─ tsconfig.json            # TypeScript settings
├─ .env.local               # Environment variables (e.g. API keys)
├─ public/
│   ├─ favicon.ico          # Favicon
│   └─ images/              # Static images and illustrations
└─ src/
   ├─ app/                  # **App Router** (Next 13+)
   │   ├─ layout.tsx        # Root layout (HTML <head>, global UI)
   │   ├─ globals.css       # Global styles (e.g. Tailwind base styles)
   │   ├─ page.tsx          # Landing page / start screen
   │   └─ api/              # Serverless API routes (App Router style)
   │       └─ rule34/
   │           └─ route.ts  # /api/rule34 → proxy to Rule34 API
   ├─ components/           # Reusable UI components
   │   ├─ Game/             # Game-specific components
   │   │   ├─ ImageDisplay.tsx  # Shows the current image to guess
   │   │   ├─ TagList.tsx       # Displays guessed tags
   │   │   └─ Timer.tsx         # Countdown timer component
   │   └─ UI/               # Generic, non-game-specific UI
   │       ├─ Button.tsx    # Primary button component
   │       └─ Card.tsx      # Card container component
   ├─ hooks/                # Custom React hooks
   │   ├─ useGame.ts        # Manages game state and navigation
   │   └─ useRule34Api.ts   # Fetches data from Rule34 API, handles errors
   ├─ lib/                  # Utility modules and low-level logic
   │   ├─ apiClient.ts      # Fetch wrapper with caching and error logic
   │   └─ gameEngine.ts     # Pure game logic (state machine, scoring)
   ├─ context/              # React Context providers
   │   └─ GameProvider.tsx  # Wraps app to provide game state via Context
   ├─ services/             # Business-logic modules and feature code
   │   └─ modes/            # Implements different game modes
   │       ├─ Classic.ts    # Classic “one image” mode
   │       └─ TimeTrial.ts  # Timed challenge mode
   ├─ store/                # Optional global store (e.g. Zustand)
   │   └─ gameStore.ts      # Shares state across non-React contexts
   ├─ types/                # TypeScript interfaces & type definitions
   │   └─ index.d.ts        # Centralized type declarations
   └─ styles/               # Component-scoped or extra styles
       └─ globals.css       # Tailwind or other global config
```