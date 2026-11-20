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
    onboarding/           02–06 Language, Create account, Verify, Location, Account status
    (main)/               screens WITH the bottom tab bar
      home/               07 Home dashboard
      report/             08 Report hub
      stats/              13 National leaderboard, 14 Location leaderboard
      news/               20 News centre
      profile/            29 Profile
    (flow)/               screens WITHOUT the tab bar
      report/voted/       09–12 Have you voted → location → review → done
      report/result/      15 Result figures, 16 Result sheet photo
      report/incident/    18 Incident report, 19 Incident tracking
      reports/            17 My reports
      news/[id]/          21 Article
      notifications/      22 Notifications
      events/             23 Events, 24 Detail, 25 Get tickets, 27 Create, 28 Analytics
      tickets/[id]/       26 Ticket & QR code
      settings/           30 Settings
      plans/              31 Subscription plans
      ussd/               32 USSD menu preview
    admin/                33 Admin dashboard (desktop) + 34 (phone layout)
    offline/              fallback page served by the service worker
    not-found.tsx         "coming soon" page for anything not built yet
    manifest.ts           Web App Manifest (install to home screen)
    globals.css           design system (tokens + classes from the designs)
  components/
    layout/               TabBar, StepHeader, TitleHeader
    pwa/                  service worker registration, offline banner
    ui/                   Icon, StatusBadge, RadioCards, FilterChips, PhotoPicker, Switch, …
  lib/
    routes.ts             every screen's URL, numbered like the design canvas
    plans.ts              subscription plans (from the feature document)
    sample-*.ts           PLACEHOLDER data, replace with the real API
public/
  sw.js                   service worker (caching, offline fallback, push)
  icons/                  PWA icons
```

Screens with a dynamic URL (`/news/[id]`, `/events/[id]`, `/tickets/[id]`) read the id inside `<Suspense>`, as Next.js 16 Cache Components requires.

## PWA status

| Piece | Status |
|---|---|
| Manifest, icons, installable | ✅ |
| Service worker: offline fallback, static caching | ✅ |
| Offline banner (`useOffline`) | ✅ |
| Push notifications | Service worker handlers ready. Subscription UI and VAPID keys still to do |
| Offline report queue (IndexedDB) | To do |

## Placeholders to replace

- `src/lib/sample-*.ts`: all numbers, names, places, prices and headlines are placeholders (e.g. `[State]`, `₦[price]`).
- There is no backend yet: every form and button only moves to the next screen. Search each page for `TODO` to see what it needs.
- Onboarding forms only navigate to the next screen for now. Registration, the SMS code, the VIN eligibility check (INEC or another approved service) and the location lookups still need a backend; each page has a `TODO` comment.
- Terms and Privacy Policy links on the Create account screen point to `#`.
- `public/icons/icon.svg`: placeholder app icon based on the splash-screen eye mark.
