import type { Metadata } from "next";
import Link from "next/link";
import { TitleHeader } from "@/components/layout/TitleHeader";
import { Icon } from "@/components/ui/Icon";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { StatusTimeline } from "@/components/ui/StatusTimeline";
import { routes } from "@/lib/routes";
import { sampleIncident as incident, sampleNearbyAlert as alert } from "@/lib/sample-reports";

export const metadata: Metadata = { title: "Incident tracking" };

// Screen 19 · Incident tracking
export default function IncidentDonePage() {
  return (
    <>
      <TitleHeader title={`Incident ${incident.id}`} backHref={routes.myReports} />

      <main className="content" style={{ gap: 14 }}>
        <section className="card" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div className="between">
            <span className="badge b-dis">{incident.category}</span>
            <StatusBadge status="review" />
          </div>
          <p className="h3" style={{ fontSize: 16 }}>{incident.title}</p>
          <p className="sm">{incident.meta}</p>
        </section>

        <section className="card">
          <p className="lbl" style={{ marginBottom: 12 }}>Progress</p>
          <StatusTimeline steps={incident.timeline} currentTone="amber" />
        </section>

        <p className="lbl">Alerts near you</p>
        <Link
          className="card"
          href={routes.news.article(alert.id)}
          style={{ display: "flex", gap: 12, textDecoration: "none", color: "var(--ink)", padding: 14 }}
        >
          <span className="tile t-r" style={{ width: 38, height: 38 }}>
            <Icon name="alert" size="s" />
          </span>
          <span className="grow" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span className="badge b-ver" style={{ alignSelf: "flex-start" }}>Verified incident</span>
            <span className="h3" style={{ fontSize: 14 }}>{alert.title}</span>
            <span className="sm">{alert.meta}</span>
          </span>
        </Link>
      </main>

      <div className="foot">
        <Link className="btn ghost" href={routes.report.incident}>
          Add more evidence
        </Link>
        <Link className="btn" href={routes.home}>
          Back to home
        </Link>
      </div>
    </>
  );
}
