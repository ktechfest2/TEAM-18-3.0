import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Icon } from "@/components/ui/Icon";
import { routes } from "@/lib/routes";
import { findEvent, lowestPrice, sampleEvents } from "@/lib/sample-events";

export const metadata: Metadata = { title: "Event" };

export function generateStaticParams() {
  return sampleEvents.map((event) => ({ id: event.id }));
}

// Screen 24 · Event detail
export default function EventDetailPage({ params }: PageProps<"/events/[id]">) {
  return (
    <Suspense fallback={<div className="img" style={{ height: 240, borderRadius: 0 }} />}>
      {params.then(({ id }) => (
        <EventDetail id={id} />
      ))}
    </Suspense>
  );
}

function EventDetail({ id }: { id: string }) {
  const event = findEvent(id);

  return (
    <>
      <div className="img" style={{ height: 240, borderRadius: 0, flexShrink: 0, position: "relative" }}>
        Event banner
        <Link className="ibtn" href={routes.events.list} aria-label="Back" style={{ position: "absolute", top: 18, left: 20 }}>
          <Icon name="back" />
        </Link>
        {/* TODO: save / bookmark events */}
        <button className="ibtn" type="button" aria-label="Save event" style={{ position: "absolute", top: 18, right: 20 }}>
          <Icon name="bookmark" />
        </button>
      </div>

      <main className="content" style={{ paddingTop: 18, gap: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div className="row" style={{ gap: 6 }}>
            <span className="badge b-ver">Approved</span>
            <span className="badge b-sub">{event.category}</span>
          </div>
          <h1 className="h1" style={{ fontSize: 24 }}>{event.title}</h1>
        </div>

        <div className="card" style={{ padding: "4px 14px" }}>
          <div className="li">
            <span className="tile t-g" style={{ width: 38, height: 38 }}>
              <Icon name="calendar" size="s" />
            </span>
            <span className="grow">
              <span className="h3" style={{ display: "block", fontSize: 14 }}>{event.dateLong}</span>
              <span className="sm">{event.timeRange}</span>
            </span>
          </div>
          <div className="li">
            <span className="tile t-g" style={{ width: 38, height: 38 }}>
              <Icon name="pin" size="s" />
            </span>
            <span className="grow">
              <span className="h3" style={{ display: "block", fontSize: 14 }}>{event.venue}</span>
              <span className="sm">{event.area}</span>
            </span>
            <a
              className="link"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${event.venue}, ${event.area}`)}`}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: 13 }}
            >
              Map
            </a>
          </div>
          <div className="li">
            <span className="tile t-n" style={{ width: 38, height: 38, fontSize: 12, fontWeight: 800 }}>
              {event.organiser.initials}
            </span>
            <span className="grow">
              <span className="h3" style={{ display: "block", fontSize: 14 }}>{event.organiser.name}</span>
              <span className="sm">Organiser · {event.organiser.eventCount}</span>
            </span>
            {/* TODO: follow organiser */}
            <button className="chip" type="button" style={{ height: 32 }}>Follow</button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <h2 className="h3">About</h2>
          <p className="body">{event.about}</p>
        </div>

        <div className="row" style={{ gap: 8 }}>
          <span className="sm" style={{ fontWeight: 700, color: "var(--ink)" }}>{event.going}</span>
          <span className="sm">· {event.interested}</span>
        </div>
      </main>

      <div className="foot" style={{ flexDirection: "row", alignItems: "center", gap: 14, borderTop: "1px solid var(--line)", background: "#fff", paddingTop: 14 }}>
        <div>
          <p className="sm">From</p>
          <p style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>{lowestPrice(event)}</p>
        </div>
        <Link className="btn" href={routes.events.checkout(event.id)} style={{ flex: 1 }}>
          Get tickets
        </Link>
      </div>
    </>
  );
}
