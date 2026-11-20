import type { Metadata } from "next";
import Link from "next/link";
import { StepHeader } from "@/components/layout/StepHeader";
import { Icon } from "@/components/ui/Icon";
import { T } from "@/i18n";
import { routes } from "@/lib/routes";
import { myPollingUnit as pu } from "@/components/profile/my-polling-unit";
import { PollingUnitChoice } from "./PollingUnitChoice";

export const metadata: Metadata = { title: "Where did you vote?" };

const LOCATION_STEPS = [
  { label: <T k="location.state" />, value: pu.state },
  { label: <T k="location.lga" />, value: pu.lga },
  { label: <T k="location.ward" />, value: pu.ward },
  { label: <T k="location.pollingUnit" />, value: pu.name },
];

// Screen 10 · Voting location
// TODO: tapping a row should open a picker for that level (State → LGA → Ward → PU).
export default function VoteLocationPage() {
  return (
    <>
      <StepHeader step={2} totalSteps={3} backHref={routes.report.voted} />

      <main className="content" style={{ gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingTop: 4 }}>
          <h1 className="h1"><T k="votedLocation.title" /></h1>
          <p className="body"><T k="votedLocation.body" /></p>
        </div>

        <PollingUnitChoice />

        <p className="lbl" style={{ marginTop: 4 }}><T k="votedLocation.selected" /></p>
        <div className="card" style={{ padding: "2px 16px" }}>
          {LOCATION_STEPS.map((step, index) => {
            const isLast = index === LOCATION_STEPS.length - 1;
            return (
              <button key={index} type="button" className="li">
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
          <T k="votedLocation.review" />
        </Link>
      </div>
    </>
  );
}
