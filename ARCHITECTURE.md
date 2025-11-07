# Speed Trust Frontend Architecture

This document explains how the Southern Pothigai Trust site is organised, how the major pieces of code fit together, and where to extend functionality.

## Top-Level Layout

```
.
├── Dockerfile             # Multi-stage Next.js build (dev + prod)
├── docker-compose.yml     # Local dev stack with live reload
├── README.md              # Quickstart + API usage examples
└── frontend/              # Next.js 14 application
```

- **Dockerfile** builds dependencies once, conditionally runs `next build`, and exposes `npm run dev` vs `npm run start` based on `NODE_ENV`.
- **docker-compose.yml** mounts the `frontend/` folder, keeps `node_modules` inside the container, and starts `next dev` on port 3000 with polling enabled for reliable file watching.

## `frontend/` Directory

```
frontend
├── components/        # Reusable UI (Header, Footer)
├── context/           # React context providers (Auth)
├── data/              # JSON seeds for courses/events/users
├── hooks/             # Custom React hooks (e.g., carousels)
├── pages/             # Next.js pages & API routes
│   ├── api/           # Mock REST endpoints
│   ├── events/        # Dynamic event detail route
│   └── user/          # Auth-protected dashboard shells
├── public/            # Static assets (favicons, images)
├── styles/            # Tailwind + custom CSS
├── package.json       # Scripts + dependencies
└── tailwind.config.js # Design tokens, custom theme colours
```

### App Shell & Layout

- `pages/_app.js` wraps every page with the `AuthProvider`, renders the persistent `Header`/`Footer`, and imports global CSS. This is the central place for layout-wide wrappers.
- `components/Header.js` implements the responsive navigation bar with a mobile disclosure menu and consistent `Link` components.
- `components/Footer.js` houses quick links, newsletter form UI, and social icons.

Together, these files define the consistent chrome around all routes.

### Global State & Hooks

- `context/AuthContext.js` stores the logged-in user in React state, hydrates from `localStorage`, and exposes `login/logout` helpers. Pages that need auth can call `useAuth()`.
- `hooks/useCyclingIndex.js` provides reusable carousel logic (auto-advance intervals plus manual navigation). The home page leverages it for the hero, news, and testimonial sliders to avoid duplicating timers.

### Pages

Each file inside `pages/` becomes a route:

- `pages/index.js` – marketing homepage with hero slideshow, news carousel, alternating featured sections, metric grid, partner marquee, team listing, and testimonial slider.
- `pages/about.js`, `pages/events.js`, `pages/courses.js`, `pages/guidance.js`, `pages/gallery.js`, `pages/contact.js`, `pages/login.js` – themed landing pages for the respective nav links. They mostly render static data plus interactive widgets (filters, sliders, forms).
- `pages/events/[slug].js` – dynamic route that generates static pages for every event described in `data/events.json`, including ICS calendar download links and gallery carousels.
- `pages/user/*.js` – authenticated dashboard placeholders that can later consume `AuthContext`.

### API Routes & Data

- `pages/api/*.js` files implement mock API endpoints consumed by forms/pages during demos (login, contact, consultation, courses, events).
- `data/courses.json`, `data/events.json`, `data/users.json` act as in-memory stores backing the API handlers. Updating these JSON files immediately affects both pages and endpoints.

### Styling System

- `styles/globals.css` imports Tailwind base/components/utilities and defines brand-level utility classes, gradients, and custom keyframes (e.g., partner marquee animation).
- `tailwind.config.js` centralises theme colours (`brand-primaryGreen`, `brand-teal`, etc.) so React components can use semantic class names.

### Assets

Anything placed in `public/` is served from the site root (`/`). Currently it holds favicons and placeholder images; larger media is fetched via external Unsplash URLs directly in components.

## Build & Development Flow

1. **Node scripts** (`package.json`)
   - `npm run dev` – starts `next dev` with hot reload.
   - `npm run build` – compiles production assets.
   - `npm run start` – serves the production build.
   - `npm run lint` – runs Next.js ESLint configuration.

2. **Docker workflow**
   - `docker compose up --build` – builds the image, installs dependencies inside a named volume, and serves the app on `localhost:3000` with live edits from your host machine.
   - Environment variables (`NODE_ENV`, `CHOKIDAR_USEPOLLING`) are injected via `docker-compose.yml`.

## Extending the Codebase

- Add new top-level pages under `pages/`. Next.js automatically creates the route.
- Share layout/state across pages by editing `_app.js`, `components/Header.js`, `components/Footer.js`, or introducing additional providers.
- Use `context/` for cross-cutting application state (auth, theme, feature flags).
- Add reusable UI primitives to `components/`, and export custom hooks from `hooks/` when logic spans multiple components.
- When fetching real APIs, replace the mock handlers in `pages/api/` or consume external services directly from your React components or server routes.

This structure keeps marketing content, interactive tools, and mock data cleanly separated so the team can iterate quickly on design and copy while keeping an easy path to production integrations.
