import type { Metadata } from "next";
import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import { T, type MessageKey } from "@/i18n";
import { routes } from "@/lib/routes";

export const metadata: Metadata = { title: "Report" };

const REPORT_TYPES: { href: string; title: MessageKey; description: MessageKey; icon: IconName; tone: string }[] = [
  { href: routes.report.voted, title: "report.votedTitle", description: "report.votedBody", icon: "ballot", tone: "t-g" },
  { href: routes.report.result, title: "report.resultTitle", description: "report.resultBody", icon: "document", tone: "t-b" },
  { href: routes.report.incident, title: "report.incidentTitle", description: "report.incidentBody", icon: "alert", tone: "t-r" },
];

// Screen 08 · Report hub
export default function ReportHubPage() {
  return (
    <>
      <header className="top">
        <h1 className="t-title" style={{ fontSize: 20 }}><T k="report.title" /></h1>
        <Link className="ibtn" href={routes.myReports} aria-label="My reports">
          <Icon name="clock" />
        </Link>
      </header>

      <main className="content" style={{ gap: 14 }}>
        <p className="body"><T k="report.intro" /></p>

        {REPORT_TYPES.map((type) => (
          <Link key={type.href} className="opt" href={type.href} style={{ alignItems: "flex-start", padding: 18 }}>
            <span className={`tile ${type.tone}`} style={{ width: 52, height: 52, borderRadius: 14 }}>
              <Icon name={type.icon} size="l" />
            </span>
            <span className="grow" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 17, fontWeight: 700 }}><T k={type.title} /></span>
              <span className="sm"><T k={type.description} /></span>
            </span>
            <Icon name="chevronRight" style={{ color: "var(--muted)", marginTop: 14 }} />
          </Link>
        ))}

        <div className="warn" style={{ marginTop: 4 }}>
          <Icon name="shield" size="s" />
          <span>
            <strong><T k="report.staySafe" /></strong> <T k="report.staySafeBody" />
          </span>
        </div>
      </main>
    </>
  );
}
