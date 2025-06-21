# Rule34‑Race

A browser-based image navigation game inspired by WikiRace — but instead of articles, players jump through **tags on Rule34 posts**.

The project includes two main game modes:

* **WikiRace-like Mode (Classic)**: Start with one tag and navigate to the goal tag by jumping through images using their associated tags.
* **Tag Guessr**: A quiz-style game where players must **guess the correct tags** of shown images to progress through rounds.

## 🧠 Project Summary

Players start with a **random post** containing a given **start tag** and must navigate to a **goal tag**. Each move consists of selecting a tag from the current image, which fetches a new post containing that tag. The goal is reached once an image includes the target tag.

Game modes:

* **Classic Mode**: Navigate strategically from start to goal tag.
* **Tag Guessr**: Guess valid tags of a displayed image, with limited attempts.

## 📦 Installation & Running

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the dev server:**

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000)

> You can also use `yarn dev`, `pnpm dev`, or `bun dev` depending on your setup.

## 🗂 Directory Structure (excerpt)

```
/src
├─ app/            → Pages, routing
├─ components/     → Game & UI components
├─ context/        → Game state provider
├─ hooks/          → API and logic hooks
├─ types/          → TypeScript type declarations
```

## ⚠️ Notes

* Uses **Rule34 API** via proxy (`/api/rule34`) to fetch posts and tags.
* Includes **blur toggle** for sensitive content.
* Fallback logic for **dead ends** and repeated posts.
* Currently **singleplayer only**, but architecture allows future multiplayer extension.
