import type { Metadata } from "next";
import Link from "next/link";
import { StepHeader } from "@/components/layout/StepHeader";
import { Icon } from "@/components/ui/Icon";
import { T } from "@/i18n";
import { routes } from "@/lib/routes";
import { myPollingUnit as pu } from "@/components/profile/my-polling-unit";
import { sampleElection } from "@/lib/sample-data";

export const metadata: Metadata = { title: "Review and submit" };

const DETAILS = [
  { label: <T k="votedReview.election" />, value: sampleElection.name },
  { label: <T k="location.state" />, value: pu.state },
  { label: <T k="location.lga" />, value: pu.lga },
  { label: <T k="location.ward" />, value: pu.ward },
  { label: <T k="location.pollingUnit" />, value: pu.name },
  { label: <T k="votedReview.time" />, value: "[time]" },
];

// Screen 11 · Review & submit
// TODO: "Submit report" should send the report to the API (and queue it offline).
export default function VoteReviewPage() {
  return (
    <>
      <StepHeader step={3} totalSteps={3} backHref={routes.report.votedLocation} />

      <main className="content" style={{ gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingTop: 4 }}>
          <h1 className="h1"><T k="votedReview.title" /></h1>
          <p className="body"><T k="votedReview.body" /></p>
        </div>

        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ background: "var(--green-t)", padding: 16, display: "flex", alignItems: "center", gap: 12 }}>
            <span className="tile" style={{ background: "var(--green)", color: "#fff" }}>
              <Icon name="check" />
            </span>
            <span>
              <span className="lbl" style={{ color: "var(--green-d)" }}><T k="votedReview.participation" /></span>
              <span style={{ display: "block", fontSize: 18, fontWeight: 800, color: "var(--green-d)" }}>
                <T k="voted.yes" />
              </span>
            </span>
          </div>
          <div style={{ padding: "4px 16px" }}>
            {DETAILS.map((row, index) => (
              <div key={index} className="li">
                <span className="sm grow">{row.label}</span>
                <span className="h3" style={{ fontSize: 14, textAlign: "right" }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="priv">
          <Icon name="lock" size="s" />
          <span>
            <T k="votedReview.privacy" />
          </span>
        </div>
      </main>

      <div className="foot">
        <Link className="btn" href={routes.report.votedDone}>
          <T k="votedReview.submit" />
        </Link>
        <Link className="btn ghost" href={routes.report.votedLocation}>
          <T k="votedReview.edit" />
        </Link>
      </div>
    </>
  );
}
