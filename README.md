This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Architecture

```
├── README.md
├── next.config.js
├── package.json
├── tsconfig.json
├── public/
│   └── images/           # static Assets
├── src/
│   ├── app/              # (Next 13+) App-Router: Layouts, Seiten
│   │   ├── layout.tsx
│   │   ├── page.tsx      # Landing-Page
│   │   └── game/         # optional: Unter-Route /game
│   │       └── page.tsx
│   ├── components/       # UI-elements
│   │   ├── Game/
│   │   │   ├── ImageDisplay.tsx
│   │   │   ├── TagList.tsx
│   │   │   └── Timer.tsx
│   │   └── UI/
│   │       ├── Button.tsx
│   │       └── Card.tsx
│   ├── context/          # React-Context / Provider
│   │   └── GameProvider.tsx
│   ├── hooks/            # Custom Hooks
│   │   ├── useGame.ts
│   │   └── useRule34Api.ts
│   ├── lib/              # Infrastructure & Utilities
│   │   ├── apiClient.ts  # fetch-Wrapper (e.g.SWR/React-Query?)
│   │   └── gameEngine.ts # central game-Logic-class
│   ├── services/         # Business-Logic / Feature-Module
│   │   ├── modes/
│   │   │   ├── ClassicMode.ts
│   │   │   ├── TimeTrialMode.ts
│   │   │   └── StepChallengeMode.ts
│   │   └── navigation/
│   │       └── TagNavigator.ts
│   ├── store/            # Optional: Zustand, Redux Toolkit o.ä.
│   │   └── gameStore.ts
│   ├── types/            # TypeScript-Types & Interfaces
│   │   └── index.d.ts
│   └── styles/           # global CSS / Tailwind config
│       └── globals.css
```