import type { Metadata } from "next";
import Link from "next/link";
import { StepHeader } from "@/components/layout/StepHeader";
import { Icon } from "@/components/ui/Icon";
import { routes } from "@/lib/routes";
import { myPollingUnit as pu } from "@/components/profile/my-polling-unit";
import { sampleElection } from "@/lib/sample-data";

export const metadata: Metadata = { title: "Review and submit" };

const DETAILS = [
  { label: "Election", value: sampleElection.name },
  { label: "State", value: pu.state },
  { label: "LGA", value: pu.lga },
  { label: "Ward", value: pu.ward },
  { label: "Polling unit", value: pu.name },
  { label: "Time", value: "[time], today" },
];

// Screen 11 · Review & submit
// TODO: "Submit report" should send the report to the API (and queue it offline).
export default function VoteReviewPage() {
  return (
    <>
      <StepHeader step={3} totalSteps={3} backHref={routes.report.votedLocation} />

      <main className="content" style={{ gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingTop: 4 }}>
          <h1 className="h1">Review your report</h1>
          <p className="body">Check the details below. You can submit one participation report per election.</p>
        </div>

        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ background: "var(--green-t)", padding: 16, display: "flex", alignItems: "center", gap: 12 }}>
            <span className="tile" style={{ background: "var(--green)", color: "#fff" }}>
              <Icon name="check" />
            </span>
            <span>
              <span className="lbl" style={{ color: "var(--green-d)" }}>Participation</span>
              <span style={{ display: "block", fontSize: 18, fontWeight: 800, color: "var(--green-d)" }}>
                Yes, I voted
              </span>
            </span>
          </div>
          <div style={{ padding: "4px 16px" }}>
            {DETAILS.map((row) => (
              <div key={row.label} className="li">
                <span className="sm grow">{row.label}</span>
                <span className="h3" style={{ fontSize: 14, textAlign: "right" }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="priv">
          <Icon name="lock" size="s" />
          <span>
            Your name and VIN are stripped before this report is counted. Nobody — including EYENEC staff — can see
            it came from you.
          </span>
        </div>
      </main>

      <div className="foot">
        <Link className="btn" href={routes.report.votedDone}>
          Submit report
        </Link>
        <Link className="btn ghost" href={routes.report.votedLocation}>
          Edit details
        </Link>
      </div>
    </>
  );
}
