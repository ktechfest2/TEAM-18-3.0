"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/ui/Icon";
import { routes } from "@/lib/routes";

type Tab = { href: string; label: string; icon: IconName; isAction?: boolean };

const TABS: Tab[] = [
  { href: routes.home, label: "Home", icon: "home" },
  { href: routes.stats.national, label: "Stats", icon: "stats" },
  { href: routes.report.hub, label: "Report", icon: "plus", isAction: true },
  { href: routes.news.list, label: "News", icon: "news" },
  { href: routes.profile, label: "Profile", icon: "user" },
];

// Bottom navigation shown on the main app screens.
export function TabBar() {
  const pathname = usePathname();

  return (
    <nav className="tabbar" aria-label="Main">
      {TABS.map((tab) => {
        const isActive = pathname === tab.href || pathname.startsWith(`${tab.href}/`);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={isActive ? "tab on" : "tab"}
            aria-current={isActive ? "page" : undefined}
          >
            {tab.isAction ? (
              <span className="fab">
                <Icon name={tab.icon} />
              </span>
            ) : (
              <Icon name={tab.icon} />
            )}
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
