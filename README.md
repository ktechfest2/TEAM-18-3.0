# EYENEC — every vote, every voice

Progressive Web App (PWA) for citizen election participation, polling-unit reporting, news and events in Nigeria.
Built with **Next.js 16** (App Router), TypeScript and plain CSS.

- Feature spec: [`docs/Be_A_Part_App_Features_Document.docx`](docs/Be_A_Part_App_Features_Document.docx)
- Screen designs: the "EYENEC" design canvas in Claude Artifacts. A copy of each screen is in [`docs/designs/`](docs/designs/) and the original stylesheet is in `docs/designs/design-system.css`.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000 (service worker disabled in dev)
npm run dev:https    # HTTPS locally, needed to test push notifications
npm run build && npm start   # production build; service worker + install prompt active
npm run icons        # regenerate PWA icons from public/icons/icon.svg
```

## Project structure

```
src/
  app/
    page.tsx              01 Splash
    (main)/               screens with the bottom tab bar
      layout.tsx          screen shell + TabBar
      home/               07 Home dashboard
      report/             08 Report hub
    offline/              fallback page served by the service worker
    not-found.tsx         "coming soon" page for screens not built yet
    manifest.ts           Web App Manifest (install to home screen)
    globals.css           design system (tokens + classes from the designs)
  components/
    layout/TabBar.tsx
    pwa/                  service worker registration, offline banner
    ui/                   Icon, StatusBadge
  lib/
    routes.ts             every screen's URL, numbered like the design canvas
    sample-data.ts        PLACEHOLDER data, replace with the real API
public/
  sw.js                   service worker (caching, offline fallback, push)
  icons/                  PWA icons
```

**Building a new screen:** look up its number and URL in `src/lib/routes.ts` and copy the markup from `docs/designs/<Name>.dc.html`. The CSS class names (`scr`, `top`, `content`, `foot`, `btn`, `card`, …) are the same as in the designs. Step-by-step flows (voting, results, incidents, onboarding) have no tab bar, so put them in a route group without the TabBar layout, e.g. `src/app/(flow)/report/voted/page.tsx`.

## PWA status

| Piece | Status |
|---|---|
| Manifest, icons, installable | ✅ |
| Service worker: offline fallback, static caching | ✅ |
| Offline banner (`useOffline`) | ✅ |
| Push notifications | Service worker handlers ready. Subscription UI and VAPID keys still to do |
| Offline report queue (IndexedDB) | To do |

## Placeholders to replace

- `src/lib/sample-data.ts`: all numbers, names and headlines are placeholders.
- `public/icons/icon.svg`: placeholder app icon based on the splash-screen eye mark.
