import type { Metadata } from "next";
import Link from "next/link";
import { TitleHeader } from "@/components/layout/TitleHeader";
import { Icon } from "@/components/ui/Icon";
import { routes } from "@/lib/routes";
import { myPollingUnit as pu } from "@/components/profile/my-polling-unit";
import { ResultForm } from "./ResultForm";

export const metadata: Metadata = { title: "Polling unit result" };

// Screen 15 · Polling unit result
export default function ResultSubmitPage() {
  return (
    <>
      <TitleHeader
        title="Polling unit result"
        backHref={routes.report.hub}
        right={<span className="sm" style={{ fontWeight: 600 }}>1 of 2</span>}
      />

      <main className="content" style={{ gap: 14 }}>
        <Link className="card row" href={routes.report.votedLocation} style={{ padding: "12px 14px", textDecoration: "none", color: "var(--ink)" }}>
          <span className="tile t-g" style={{ width: 38, height: 38 }}>
            <Icon name="pin" size="s" />
          </span>
          <span className="grow">
            <span className="h3" style={{ display: "block", fontSize: 14 }}>{pu.name}</span>
            <span className="sm">{pu.ward} · {pu.lga} · {pu.state}</span>
          </span>
          <span className="link" style={{ fontSize: 13 }}>Change</span>
        </Link>

        <ResultForm />
      </main>

      <div className="foot">
        <Link className="btn" href={routes.report.resultPhoto}>
          Next: add result sheet photo
        </Link>
      </div>
    </>
  );
}
