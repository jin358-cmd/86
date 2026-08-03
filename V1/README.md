# V1 — GVG OS Neural Link Experience

Cinematic interactive website: put on a Neural Link headset and enter **GVG CITY**, an original futuristic operating-system universe.

This is not a corporate site and does not copy Cyberpunk 2077 assets.

## Experience flow

Opening → Boot → Neural Glass → Wear Neural Link → System Login → GVG City → World Introduction → Mission Selection → Interactive Dashboard

Watch-through ≈ 60–90s. Skip is available.

## Stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS · Three.js / R3F · Framer Motion · GSAP · Lenis · Howler · Lucide

## Local development

```bash
cd V1
npm install
npm run dev
```

Open `http://localhost:3000`.

## Live preview

https://jin358-cmd.github.io/86/v1/

Version hub: https://jin358-cmd.github.io/86/

## Production build

```bash
npm run build
npm start
```

GitHub Pages static export:

```bash
GITHUB_PAGES=true npm run build
```

Output is written to `out/`. Site URL after Pages deploy: `https://jin358-cmd.github.io/86/`

## Design tokens

| Token | Value |
| --- | --- |
| Cyber Yellow | `#FCEE0A` |
| Background | `#080808` |
| Secondary | `#111111` |
| Accent | `#00E5FF` |
| Danger | `#FF1744` |
| Text | `#ECECEC` |

Fonts: Orbitron · Rajdhani · JetBrains Mono · Space Grotesk
