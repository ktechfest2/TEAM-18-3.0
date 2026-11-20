"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { routes } from "@/lib/routes";
import type { ReportKind, sampleEarlierReports } from "@/lib/sample-reports";

type Filter = "all" | ReportKind;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "result", label: "Results" },
  { value: "incident", label: "Incidents" },
  { value: "participation", label: "Participation" },
];

// How each kind of report looks in the list, and where it opens.
const KIND_STYLE: Record<ReportKind, { icon: IconName; tone: string; href: string }> = {
  result: { icon: "document", tone: "t-b", href: routes.myReports },
  incident: { icon: "alert", tone: "t-r", href: routes.report.incidentDone },
  participation: { icon: "check", tone: "t-g", href: routes.report.votedDone },
};

// Filter chips + the list of earlier reports.
export function ReportList({ reports }: { reports: typeof sampleEarlierReports }) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? reports : reports.filter((r) => r.kind === filter);

  return (
    <>
      <div className="chips" role="group" aria-label="Filter reports" style={{ marginTop: 4 }}>
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            className={f.value === filter ? "chip on" : "chip"}
            aria-pressed={f.value === filter}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <p className="lbl">Earlier</p>
      <div className="card" style={{ padding: "2px 14px" }}>
        {visible.length === 0 && <p className="sm" style={{ padding: "14px 0" }}>No reports of this type yet.</p>}
        {visible.map((report) => {
          const style = KIND_STYLE[report.kind];
          return (
            <Link key={report.id} className="li" href={style.href}>
              <span className={`tile ${style.tone}`} style={{ width: 38, height: 38 }}>
                <Icon name={style.icon} size="s" />
              </span>
              <span className="grow">
                <span className="h3" style={{ display: "block", fontSize: 14 }}>{report.title}</span>
                <span className="sm">{report.date}</span>
              </span>
              <StatusBadge status={report.status} label={report.statusLabel} />
            </Link>
          );
        })}
      </div>
    </>
  );
}
