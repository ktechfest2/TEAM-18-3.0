import type { Metadata } from "next";
import Link from "next/link";
import { StepHeader } from "@/components/layout/StepHeader";
import { Icon } from "@/components/ui/Icon";
import { routes } from "@/lib/routes";
import { myPollingUnit as pu } from "@/components/profile/my-polling-unit";
import { PollingUnitChoice } from "./PollingUnitChoice";

export const metadata: Metadata = { title: "Where did you vote?" };

const LOCATION_STEPS = [
  { label: "State", value: pu.state },
  { label: "LGA", value: pu.lga },
  { label: "Ward", value: pu.ward },
  { label: "Polling unit", value: pu.name },
];

// Screen 10 · Voting location
// TODO: tapping a row should open a picker for that level (State → LGA → Ward → PU).
export default function VoteLocationPage() {
  return (
    <>
      <StepHeader step={2} totalSteps={3} backHref={routes.report.voted} />

      <main className="content" style={{ gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingTop: 4 }}>
          <h1 className="h1">Where did you vote?</h1>
          <p className="body">Your report is added to this polling unit&apos;s anonymous count.</p>
        </div>

        <PollingUnitChoice />

        <p className="lbl" style={{ marginTop: 4 }}>Selected location</p>
        <div className="card" style={{ padding: "2px 16px" }}>
          {LOCATION_STEPS.map((step, index) => {
            const isLast = index === LOCATION_STEPS.length - 1;
            return (
              <button key={step.label} type="button" className="li">
                <span
                  className={`tile ${isLast ? "t-g" : "t-n"}`}
                  style={{ width: 32, height: 32, borderRadius: 9, fontSize: 12, fontWeight: 800 }}
                >
                  {index + 1}
                </span>
                <span className="grow">
                  <span className="sm">{step.label}</span>
                  <span className="h3" style={{ display: "block" }}>{step.value}</span>
                </span>
                <Icon name="chevronRight" size="s" style={{ color: "var(--muted)" }} />
              </button>
            );
          })}
        </div>
      </main>

      <div className="foot">
        <Link className="btn" href={routes.report.votedReview}>
          Review report
        </Link>
      </div>
    </>
  );
}
