import type { Metadata } from "next";
import Link from "next/link";
import { TitleHeader } from "@/components/layout/TitleHeader";
import { Icon } from "@/components/ui/Icon";
import { routes } from "@/lib/routes";
import { sampleMyPollingUnit as pu } from "@/lib/sample-data";
import { IncidentForm } from "./IncidentForm";

export const metadata: Metadata = { title: "Report an incident" };

// Screen 18 · Incident report
// TODO: submit to the moderation workflow API (with evidence files).
export default function IncidentPage() {
  return (
    <>
      <TitleHeader title="Report an incident" backHref={routes.report.hub} />

      <main className="content" style={{ gap: 14 }}>
        <IncidentForm
          location={
            <Link className="card row" href={routes.report.votedLocation} style={{ padding: "12px 14px", textDecoration: "none", color: "var(--ink)" }}>
              <span className="tile t-n" style={{ width: 38, height: 38 }}>
                <Icon name="pin" size="s" />
              </span>
              <span className="grow">
                <span className="h3" style={{ display: "block", fontSize: 14 }}>{pu.name}</span>
                <span className="sm">{pu.ward} · {pu.lga} · {pu.state}</span>
              </span>
              <span className="link" style={{ fontSize: 13 }}>Change</span>
            </Link>
          }
        />
      </main>

      <div className="foot">
        <Link className="btn" href={routes.report.incidentDone} style={{ background: "var(--red)" }}>
          Submit incident report
        </Link>
      </div>
    </>
  );
}
