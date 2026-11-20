import { routes } from "@/lib/routes";

// The "National / By location" switch shared by screens 13 and 14.
export const STATS_TABS = [
  { href: routes.stats.national, label: "National" },
  { href: routes.stats.location, label: "By location" },
];
