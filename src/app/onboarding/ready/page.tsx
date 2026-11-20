import type { Metadata } from "next";
import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { ReportStatus } from "@/lib/sample-data";
import { FirstName, FullArea, LanguageName, MaskedPhone, PollingUnitName } from "@/components/profile/ProfileText";
import { routes } from "@/lib/routes";

export const metadata: Metadata = { title: "Account status" };

// Account summary. Details come from what the user saved during onboarding;
// the statuses are PLACEHOLDERS until the backend confirms them.
const ACCOUNT_ITEMS: { icon: IconName; tone: string; title: string; detail: React.ReactNode; status: ReportStatus; statusLabel?: string }[] = [
  { icon: "phone", tone: "t-g", title: "Phone number", detail: <MaskedPhone />, status: "verified" },
  { icon: "shield", tone: "t-a", title: "Voter eligibility", detail: "Usually under 24 hours", status: "review" },
  { icon: "pin", tone: "t-n", title: "Polling unit", detail: <><PollingUnitName /> · <FullArea /></>, status: "submitted", statusLabel: "Saved" },
  { icon: "globe", tone: "t-n", title: "Language", detail: <LanguageName />, status: "submitted", statusLabel: "Saved" },
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
          <h1 className="h1">You&apos;re in, <FirstName /></h1>
          <p className="body">
            Your account is active. Voter eligibility is being confirmed — you can use EYENEC while we check.
          </p>
        </div>

        <div className="card" style={{ padding: "4px 16px" }}>
          {ACCOUNT_ITEMS.map((item) => (
            <div key={item.title} className="li">
              <span className={`tile ${item.tone}`}>
                <Icon name={item.icon} size="s" />
              </span>
              <span className="grow">
                <span className="h3" style={{ display: "block" }}>{item.title}</span>
                <span className="sm">{item.detail}</span>
              </span>
              <StatusBadge status={item.status} label={item.statusLabel} />
            </div>
          ))}
        </div>

        <div className="warn">
          <Icon name="info" size="s" />
          <span>
            Until eligibility is confirmed, your participation reports are counted as <strong>unverified</strong>.
          </span>
        </div>
      </main>

      <div className="foot">
        <Link className="btn" href={routes.home}>
          Go to dashboard
        </Link>
      </div>
    </>
  );
}
