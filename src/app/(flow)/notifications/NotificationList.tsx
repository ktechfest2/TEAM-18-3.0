"use client";

import Link from "next/link";
import { useState } from "react";
import { FilterChips } from "@/components/ui/FilterChips";
import { Icon } from "@/components/ui/Icon";
import type { AppNotification, NotificationType } from "@/lib/sample-notifications";

const FILTERS: Record<string, NotificationType | "all"> = {
  All: "all",
  Alerts: "alert",
  "My reports": "report",
  Events: "event",
};

const GROUPS = ["Today", "Earlier"] as const;

// Filter chips + notifications grouped into "Today" and "Earlier".
export function NotificationList({ notifications }: { notifications: AppNotification[] }) {
  const [filter, setFilter] = useState("All");
  const type = FILTERS[filter];
  const visible = type === "all" ? notifications : notifications.filter((n) => n.type === type);

  return (
    <>
      <div style={{ padding: "0 20px 12px" }}>
        <FilterChips label="Filter notifications" options={Object.keys(FILTERS)} value={filter} onChange={setFilter} />
      </div>

      <main className="content" style={{ gap: 10 }}>
        {visible.length === 0 && <p className="body">Nothing here yet.</p>}

        {GROUPS.map((group) => {
          const items = visible.filter((n) => n.group === group);
          if (items.length === 0) return null;
          return (
            <section key={group} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p className="lbl" style={{ marginTop: group === "Earlier" ? 4 : 0 }}>{group}</p>
              <div className="card" style={{ padding: "2px 14px" }}>
                {items.map((n) => (
                  <Link key={n.id} className="li" href={n.href} style={{ alignItems: "flex-start" }}>
                    <span className={`tile ${n.tone}`} style={{ width: 38, height: 38 }}>
                      <Icon name={n.icon} size="s" />
                    </span>
                    <span className="grow">
                      <span className="h3" style={{ display: "block", fontSize: 14 }}>{n.title}</span>
                      <span className="sm">{n.detail}</span>
                      <span className="sm" style={{ display: "block", marginTop: 4, fontSize: 11.5 }}>{n.time}</span>
                    </span>
                    {n.unread && (
                      <span
                        aria-label="Unread"
                        style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)", marginTop: 6, flexShrink: 0 }}
                      />
                    )}
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </>
  );
}
