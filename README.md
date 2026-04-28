# hacking-archive

A clean, fast, statically-generated web archive of cybersecurity learning
resources organized as a roadmap by **level** and **area** (Linux, Redes,
Seguridad, Reconocimiento, Pentesting, Malware, Binarios). All resources
are hosted on `archive.org` and opened in a new tab.

- **Stack:** Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS
- **Output:** Static HTML/CSS/JS (`output: "export"`). No backend.
- **First load JS:** ~93 kB (gzipped chunks).
- **Dark mode:** default. `<html class="dark">`, custom palette.

---

## Project structure

```
.
├── app/
│   ├── globals.css         # Tailwind + base styles
│   ├── icon.svg            # Favicon
│   ├── layout.tsx          # Root layout, metadata, viewport
│   ├── not-found.tsx       # 404 page
│   └── page.tsx            # Home + JSON-LD structured data
├── components/
│   ├── Archive.tsx         # Top-level client component (state hub)
│   ├── AreaFilter.tsx      # Toggleable area filter chips
│   ├── BookCard.tsx        # Book row: title, area, copy + open
│   ├── Footer.tsx
│   ├── Header.tsx          # Brand + counters
│   ├── Icon.tsx            # Inline SVG icons (no icon library)
│   ├── LevelSection.tsx    # Collapsible level group
│   ├── SearchBar.tsx       # Client-side search (⌘K / Ctrl+K)
│   └── Sidebar.tsx         # Sticky level navigation
├── data/
│   └── books.ts            # Structured dataset + level metadata
├── lib/
│   └── utils.ts            # cn() and normalize()
├── types/
│   └── index.ts            # Book, Level, Area types
├── public/
│   └── robots.txt
├── next.config.mjs         # `output: "export"` static build
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

### Separation of concerns

- **Data** (`data/books.ts`) — pure, typed, declarative dataset. Single source
  of truth. No DOM, no React.
- **Types** (`types/index.ts`) — shared `Book`, `Area`, `Level`, `LevelGroup`.
- **Logic** (`components/Archive.tsx`) — search, filter, collapse, and active
  level tracking. All client-side.
- **UI** (`components/*.tsx`) — presentation only, fed via props. The only
  components that are `"use client"` are those that need interaction.

### Why no backend?

The dataset is bounded, immutable, and public. Static generation gives:
better TTFB, trivial CDN deployment, zero-cost hosting, and complete
crawlability. Adding a database would only add operational surface for no
functional gain.

---

## Data model

```ts
type Level = 1 | 2 | 3 | 4 | 5;
type Area =
  | "Linux"
  | "Redes"
  | "Seguridad"
  | "Reconocimiento"
  | "Pentesting"
  | "Malware"
  | "Binarios";

interface Book {
  id: string;       // stable, derived from level + slug(title)
  level: Level;
  area: Area;
  title: string;
  url: string;      // absolute archive.org URL
}
```

The dataset contains **18 books** across **5 levels** and **7 areas**.

To add a resource, append a `book(level, area, title, path)` entry in
`data/books.ts`. The `path` is appended to the shared `ARCHIVE_BASE`.

---

## Features

- **Collapsible level sections** with per-level counters.
- **Area filter** — multi-select chips, with live counts.
- **Client-side search** — title, area, and level label, accent-insensitive.
  Shortcut: `⌘K` / `Ctrl+K` to focus, `Esc` to clear.
- **Copy link** per resource with visual confirmation.
- **External links** open in a new tab with `rel="noopener noreferrer"`.
- **Sticky sidebar** with `IntersectionObserver`-driven active section.
- **Responsive** — sidebar collapses below `lg`, header stats hide below `sm`.
- **SEO** — full Open Graph + Twitter metadata, JSON-LD `ItemList` of books.
- **A11y** — semantic landmarks (`header`, `main`, `nav`, `footer`, `section`),
  `aria-expanded`/`aria-controls` on collapsibles, `aria-pressed` on toggles,
  visible focus rings, `lang="es"`.

---

## Setup

Requires **Node.js ≥ 18.17**.

```bash
npm install
```

## Develop

```bash
npm run dev
# http://localhost:3000
```

## Type-check

```bash
npm run typecheck
```

## Lint

```bash
npm run lint
```

## Build (static export)

```bash
npm run build
```

The static site is written to `out/`. It is a fully self-contained set of
HTML/CSS/JS files.

### Local preview of the static build

```bash
npx serve out
# or
python3 -m http.server --directory out 8080
```

## Deploy

Any static host works:

- **Vercel** — `vercel deploy` (zero config; `output: "export"` is honored).
- **Netlify** — set publish dir to `out`.
- **GitHub Pages** — push the contents of `out/` to the `gh-pages` branch.
- **Cloudflare Pages / S3 / Nginx** — serve `out/` as the document root.

There is no server runtime; only static assets.

---

## Performance notes

- No UI / icon libraries. Icons are inline SVG (`components/Icon.tsx`).
- No fonts loaded over the network — system stack only.
- Filtering and search are pure-functional with `useMemo`; no re-renders
  cascade through the tree.
- Tailwind's JIT plus `output: "export"` produce a minimal CSS bundle.
- All interactivity is co-located in components that opt into `"use client"`;
  the page shell is a Server Component.

---

## License & disclaimer

Resource links point to third-party copies hosted on `archive.org`. This
project is for educational purposes only. The maintainers do not host or
distribute the content.
