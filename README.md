# Kuldeep Soni — Portfolio (React + Vite)

```bash
npm install
npm run dev       # http://localhost:5173
npm run build
```

## Structure
- `src/data/portfolio.js` — single source of truth. `NAV` defines the order of the navbar **and** the page:
  Landing (avatar) → Projects → My Story → Education → Skills → Ask AI.
- `src/components/` — Navbar, Hero, Avatar (eye tracking), FlameCursor, ProjectCard, Story, Education, Skills, ChatDrawer.
- `public/assets/` — avatar layers, flame cursor SVGs, logo, project videos.

## Project videos
Drop `saisa.mp4`, `ghumo-india.mp4`, `csv-visualiser.mp4`, `desktop-automation.mp4` into `public/assets/videos/`.
Cards without a video show the mockup until the file exists.

## Ask AI backend
Set `VITE_RAG_API_URL` (default `http://localhost:8000`). Offline, the drawer answers from the built-in knowledge base.
