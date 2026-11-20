import type { Metadata } from "next";
import { TitleHeader } from "@/components/layout/TitleHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { StatusTimeline } from "@/components/ui/StatusTimeline";
import { routes } from "@/lib/routes";
import { sampleEarlierReports, sampleLatestReport as latest } from "@/lib/sample-reports";
import { ReportList } from "./ReportList";

export const metadata: Metadata = { title: "My reports" };

// Screen 17 · My reports & status
export default function MyReportsPage() {
  return (
    <>
      <TitleHeader title="My reports" backHref={routes.report.hub} />

      <main className="content" style={{ gap: 12 }}>
        {/* Most recent report, with its full progress */}
        <section className="card" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="between">
            <div>
              <p className="lbl">{latest.kind}</p>
              <p className="h3">{latest.title}</p>
            </div>
            <StatusBadge status={latest.status} />
          </div>
          <StatusTimeline steps={latest.timeline} />
        </section>

        <ReportList reports={sampleEarlierReports} />
      </main>
    </>
  );
}
