import type { Metadata } from "next";
import Link from "next/link";
import { FirstName, FullArea, LanguageName, MaskedPhone, PollingUnitName } from "@/components/profile/ProfileText";
import { Icon, type IconName } from "@/components/ui/Icon";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { T, type MessageKey } from "@/i18n";
import { routes } from "@/lib/routes";
import type { ReportStatus } from "@/lib/sample-data";

export const metadata: Metadata = { title: "Account status" };

// Account summary. Details come from what the user saved during onboarding;
// the statuses are PLACEHOLDERS until the backend confirms them.
const ACCOUNT_ITEMS: {
  icon: IconName;
  tone: string;
  title: MessageKey;
  detail: React.ReactNode;
  status: ReportStatus;
  statusLabel?: MessageKey;
}[] = [
  { icon: "phone", tone: "t-g", title: "ready.phone", detail: <MaskedPhone />, status: "verified" },
  { icon: "shield", tone: "t-a", title: "ready.eligibility", detail: <T k="ready.eligibilityTime" />, status: "review" },
  { icon: "pin", tone: "t-n", title: "ready.pollingUnit", detail: <><PollingUnitName /> · <FullArea /></>, status: "submitted", statusLabel: "status.saved" },
  { icon: "globe", tone: "t-n", title: "ready.language", detail: <LanguageName />, status: "submitted", statusLabel: "status.saved" },
];

// Screen 06 · Account status
export default function ReadyPage() {
  return (
    <>
      <main className="content" style={{ paddingTop: 72, gap: 22 }}>
        <div
          style={{
            width: 84,
            height: 84,
            borderRadius: "50%",
            background: "var(--green-t)",
            color: "var(--green)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="check" style={{ width: 42, height: 42, strokeWidth: 2.4 }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <h1 className="h1">
            <T k="ready.youreIn" /> <FirstName />
          </h1>
          <p className="body"><T k="ready.body" /></p>
        </div>

        <div className="card" style={{ padding: "4px 16px" }}>
          {ACCOUNT_ITEMS.map((item) => (
            <div key={item.title} className="li">
              <span className={`tile ${item.tone}`}>
                <Icon name={item.icon} size="s" />
              </span>
              <span className="grow">
                <span className="h3" style={{ display: "block" }}><T k={item.title} /></span>
                <span className="sm">{item.detail}</span>
              </span>
              <StatusBadge status={item.status} label={item.statusLabel && <T k={item.statusLabel} />} />
            </div>
          ))}
        </div>

        <div className="warn">
          <Icon name="info" size="s" />
          <span><T k="ready.unverifiedNote" /></span>
        </div>
      </main>

      <div className="foot">
        <Link className="btn" href={routes.home}>
          <T k="ready.goToDashboard" />
        </Link>
      </div>
    </>
  );
}
