import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Icon } from "@/components/ui/Icon";
import { routes } from "@/lib/routes";
import { findEvent, sampleEvents } from "@/lib/sample-events";

export const metadata: Metadata = { title: "Event analytics" };

export function generateStaticParams() {
  return sampleEvents.map((event) => ({ id: event.id }));
}

// PLACEHOLDER analytics — replace with the organiser's real sales data.
const sampleAnalytics = {
  revenue: "₦[0]",
  revenueChange: "+₦[0] this week",
  issued: "[0]",
  capacity: "of [0]",
  interested: "[0]",
  freeClaimed: "[0]/[0]",
  // Paid tickets per day, as % of the busiest day (last bar = today)
  last7Days: [
    { day: "Fri", percent: 30 },
    { day: "Sat", percent: 44 },
    { day: "Sun", percent: 38 },
    { day: "Mon", percent: 62 },
    { day: "Tue", percent: 55 },
    { day: "Wed", percent: 80 },
    { day: "Thu", percent: 100 },
  ],
  tiers: [
    { name: "Early bird", sold: "[0]/[0]", revenue: "₦[0]" },
    { name: "Regular", sold: "[0]/[0]", revenue: "₦[0]" },
    { name: "VIP", sold: "[0]/[0]", revenue: "₦[0]" },
    { name: "Premium", sold: "[0]/[0]", revenue: "₦[0]" },
  ],
};

// Screen 28 · Event analytics (organiser dashboard)
export default function EventAnalyticsPage({ params }: PageProps<"/events/[id]/analytics">) {
  const stats = sampleAnalytics;

  return (
    <>
      <header className="top">
        <Link className="ibtn" href={routes.events.list} aria-label="Back">
          <Icon name="back" />
        </Link>
        <div className="grow">
          <h1 className="t-title" style={{ display: "block" }}>
            <Suspense fallback="Event">{params.then(({ id }) => findEvent(id).title)}</Suspense>
          </h1>
          <p className="sm">Organiser dashboard</p>
        </div>
        <span className="badge b-ver">Live</span>
      </header>

      <main className="content" style={{ gap: 12 }}>
        <div className="grid2" style={{ gap: 10 }}>
          <div className="card" style={{ padding: 14 }}>
            <p className="sm">Ticket revenue</p>
            <p className="n">{stats.revenue}</p>
            <p className="sm" style={{ color: "var(--green)", fontWeight: 700 }}>{stats.revenueChange}</p>
          </div>
          <div className="card" style={{ padding: 14 }}>
            <p className="sm">Tickets issued</p>
            <p className="n">{stats.issued}</p>
            <p className="sm">{stats.capacity}</p>
          </div>
          <div className="card" style={{ padding: 14 }}>
            <p className="sm">Interested</p>
            <p className="n">{stats.interested}</p>
          </div>
          <div className="card" style={{ padding: 14 }}>
            <p className="sm">Free claimed</p>
            <p className="n">{stats.freeClaimed}</p>
          </div>
        </div>

        {/* Sales bar chart */}
        <section className="card" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="between">
            <h2 className="h3">Sales, last 7 days</h2>
            <span className="sm">Paid tickets</span>
          </div>
          <div
            role="img"
            aria-label="Paid ticket sales for each of the last 7 days"
            style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: 8, alignItems: "end", height: 110 }}
          >
            {stats.last7Days.map((d, i) => (
              <div
                key={d.day}
                style={{
                  height: `${d.percent}%`,
                  background: i === stats.last7Days.length - 1 ? "var(--green)" : "#A8D3BC",
                  borderRadius: "6px 6px 2px 2px",
                }}
              />
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: 8, fontSize: 11, color: "var(--muted)", textAlign: "center", fontWeight: 600 }}>
            {stats.last7Days.map((d, i) => (
              <span key={d.day} style={{ color: i === stats.last7Days.length - 1 ? "var(--ink)" : undefined }}>{d.day}</span>
            ))}
          </div>
        </section>

        {/* Sales per ticket type */}
        <div className="card" style={{ padding: "4px 14px" }}>
          {stats.tiers.map((tier) => (
            <div key={tier.name} className="li" style={{ padding: "10px 0" }}>
              <span className="grow h3" style={{ fontSize: 14 }}>{tier.name}</span>
              <span className="sm" style={{ width: 70 }}>{tier.sold}</span>
              <span className="h3" style={{ fontSize: 14, width: 74, textAlign: "right" }}>{tier.revenue}</span>
            </div>
          ))}
        </div>
      </main>

      <div className="foot" style={{ flexDirection: "row" }}>
        {/* TODO: paid promotion options, and a camera scanner for ticket QR codes */}
        <button className="btn ghost" type="button" style={{ flex: 1 }}>Promote</button>
        <button className="btn" type="button" style={{ flex: 1.4 }}>
          <Icon name="scan" size="s" />
          Scan tickets
        </button>
      </div>
    </>
  );
}
