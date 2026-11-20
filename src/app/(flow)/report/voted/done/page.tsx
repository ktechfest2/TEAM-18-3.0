import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { T } from "@/i18n";
import { routes } from "@/lib/routes";
import { myPollingUnit as pu } from "@/components/profile/my-polling-unit";

export const metadata: Metadata = { title: "Submission received" };

// PLACEHOLDER receipt — replace with the API response after submitting.
const receipt = {
  time: "[time]",
  id: "[Receipt ID]",
  reportsAtUnit: "[0]",
  reportsInWard: "[0]",
  percentReported: 0,
};

// Screen 12 · Submission received
export default function VoteDonePage() {
  return (
    <>
      <main className="content" style={{ paddingTop: 64, gap: 20, alignItems: "center", textAlign: "center" }}>
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            background: "var(--green)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 0 12px var(--green-t)",
          }}
        >
          <Icon name="check" style={{ width: 46, height: 46, strokeWidth: 2.6 }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
          <h1 className="h1"><T k="votedDone.title" /></h1>
          <p className="body">
            <T k="votedDone.body" />
          </p>
        </div>

        <p className="sm" style={{ fontWeight: 600 }}><T k="votedDone.receipt" /> · {receipt.id}</p>

        <div className="card" style={{ width: "100%", textAlign: "left", display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="between">
            <span className="h3">{pu.name}</span>
            <span className="badge b-sub"><T k="common.live" /></span>
          </div>
          <div className="grid2" style={{ gap: 10 }}>
            <div>
              <p className="sm"><T k="votedDone.reportsHere" /></p>
              <p className="n" style={{ fontSize: 22 }}>{receipt.reportsAtUnit}</p>
            </div>
            <div>
              <p className="sm">{pu.ward}</p>
              <p className="n" style={{ fontSize: 22 }}>{receipt.reportsInWard}</p>
            </div>
          </div>
          <div className="track">
            <div className="fill" style={{ width: `${receipt.percentReported}%` }} />
          </div>
          <p className="sm">
            <T k="votedDone.percent" values={{ percent: receipt.percentReported }} />
          </p>
        </div>
      </main>

      <div className="foot">
        <Link className="btn" href={routes.stats.location}>
          <T k="votedDone.areaStats" />
        </Link>
        <Link className="btn ghost" href={routes.home}>
          <T k="common.backToHome" />
        </Link>
        {/* TODO: generate a shareable "I voted" image and open the Web Share API */}
        <button type="button" className="link" style={{ background: "none", border: 0, padding: 4, cursor: "pointer" }}>
          <T k="votedDone.share" />
        </button>
      </div>
    </>
  );
}
