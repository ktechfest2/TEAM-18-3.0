import type { Metadata } from "next";
import Link from "next/link";
import { TitleHeader } from "@/components/layout/TitleHeader";
import { DateBadge } from "@/components/ui/DateBadge";
import { Icon } from "@/components/ui/Icon";
import { routes } from "@/lib/routes";
import { lowestPrice, sampleEvents } from "@/lib/sample-events";
import { EventFilters } from "./EventFilters";

export const metadata: Metadata = { title: "Events" };

// Screen 23 · Events
export default function EventsPage() {
  const [featured, ...rest] = sampleEvents;

  return (
    <>
      <TitleHeader
        title="Events"
        backHref={routes.home}
        right={
          <Link className="btn sm" href={routes.events.create} style={{ height: 44 }}>
            <Icon name="plus" size="s" />
            Create
          </Link>
        }
      />

      <div style={{ padding: "0 20px 12px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ position: "relative" }}>
          <Icon name="search" size="s" style={{ position: "absolute", left: 14, top: 13, color: "var(--muted)" }} />
          <input className="inp" type="search" aria-label="Search events" placeholder="Search events near you" style={{ paddingLeft: 42, height: 44 }} />
        </div>
        <EventFilters />
      </div>

      <main className="content" style={{ gap: 12 }}>
        {/* Featured / promoted event */}
        <Link
          className="card"
          href={routes.events.detail(featured.id)}
          style={{ padding: 0, overflow: "hidden", textDecoration: "none", color: "var(--ink)" }}
        >
          <div className="img" style={{ height: 150, borderRadius: 0, position: "relative" }}>
            Event banner
            {featured.promoted && (
              <span className="badge" style={{ position: "absolute", top: 12, left: 12, background: "var(--amber)", color: "var(--ink)" }}>
                Promoted
              </span>
            )}
          </div>
          <div style={{ padding: 14, display: "flex", gap: 14, alignItems: "center" }}>
            <DateBadge month={featured.month} day={featured.day} highlight />
            <div className="grow">
              <p className="h3" style={{ fontSize: 16 }}>{featured.title}</p>
              <p className="sm">{featured.category} · {featured.venue}, {featured.area}</p>
              <p className="sm" style={{ fontWeight: 700, color: "var(--green)", marginTop: 4 }}>
                From {lowestPrice(featured)} · {featured.going}
              </p>
            </div>
          </div>
        </Link>

        <p className="lbl">This week near you</p>
        <div className="card" style={{ padding: "2px 14px" }}>
          {rest.map((event) => (
            <Link key={event.id} className="li" href={routes.events.detail(event.id)}>
              <DateBadge month={event.month} day={event.day} />
              <span className="grow">
                <span className="h3" style={{ display: "block", fontSize: 14 }}>{event.title}</span>
                <span className="sm">{event.category} · {event.area} · {lowestPrice(event)}</span>
              </span>
              <Icon name="chevronRight" size="s" style={{ color: "var(--muted)" }} />
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
