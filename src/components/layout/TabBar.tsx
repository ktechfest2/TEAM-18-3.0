"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/ui/Icon";
import { useT, type MessageKey } from "@/i18n";
import { routes } from "@/lib/routes";

type Tab = { href: string; label: MessageKey; icon: IconName; isAction?: boolean };

const TABS: Tab[] = [
  { href: routes.home, label: "tab.home", icon: "home" },
  { href: routes.stats.national, label: "tab.stats", icon: "stats" },
  { href: routes.report.hub, label: "tab.report", icon: "plus", isAction: true },
  { href: routes.news.list, label: "tab.news", icon: "news" },
  { href: routes.profile, label: "tab.profile", icon: "user" },
];

// Bottom navigation shown on the main app screens.
export function TabBar() {
  const pathname = usePathname();
  const t = useT();

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
            {t(tab.label)}
          </Link>
        );
      })}
    </nav>
  );
}
