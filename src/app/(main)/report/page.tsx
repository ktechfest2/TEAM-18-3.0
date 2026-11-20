import type { Metadata } from "next";
import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import { routes } from "@/lib/routes";

export const metadata: Metadata = { title: "Report" };

const REPORT_TYPES: { href: string; title: string; description: string; icon: IconName; tone: string }[] = [
  {
    href: routes.report.voted,
    title: "I have voted",
    description: "Tell us you took part. Anonymous — no vote choice is ever collected.",
    icon: "ballot",
    tone: "t-g",
  },
  {
    href: routes.report.result,
    title: "Polling unit result",
    description: "Share figures announced or posted at your polling unit, with a photo of the result sheet.",
    icon: "document",
    tone: "t-b",
  },
  {
    href: routes.report.incident,
    title: "Incident or misconduct",
    description: "Vote buying, intimidation, violence, disruption or suspected malpractice.",
    icon: "alert",
    tone: "t-r",
  },
];

// Screen 08 · Report hub
export default function ReportHubPage() {
  return (
    <>
      <header className="top">
        <h1 className="t-title" style={{ fontSize: 20 }}>Report</h1>
        <Link className="ibtn" href={routes.myReports} aria-label="My reports">
          <Icon name="clock" />
        </Link>
      </header>

      <main className="content" style={{ gap: 14 }}>
        <p className="body">
          What would you like to report? Reporting is free for everyone — no subscription needed.
        </p>

        {REPORT_TYPES.map((type) => (
          <Link key={type.href} className="opt" href={type.href} style={{ alignItems: "flex-start", padding: 18 }}>
            <span className={`tile ${type.tone}`} style={{ width: 52, height: 52, borderRadius: 14 }}>
              <Icon name={type.icon} size="l" />
            </span>
            <span className="grow" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 17, fontWeight: 700 }}>{type.title}</span>
              <span className="sm">{type.description}</span>
            </span>
            <Icon name="chevronRight" style={{ color: "var(--muted)", marginTop: 14 }} />
          </Link>
        ))}

        <div className="warn" style={{ marginTop: 4 }}>
          <Icon name="shield" size="s" />
          <span>
            <strong>Stay safe.</strong> Only take photos where it is lawful and safe. If you are in danger, call 112.
          </span>
        </div>
      </main>
    </>
  );
}
