import type { Metadata } from "next";
import Link from "next/link";
import { TitleHeader } from "@/components/layout/TitleHeader";
import { Icon } from "@/components/ui/Icon";
import { routes } from "@/lib/routes";
import { SettingsForm } from "./SettingsForm";

export const metadata: Metadata = { title: "Settings" };

// Screen 30 · Settings
export default function SettingsPage() {
  return (
    <>
      <TitleHeader title="Settings" backHref={routes.profile} />

      <main className="content" style={{ gap: 12 }}>
        <SettingsForm />

        <p className="lbl" style={{ marginTop: 6 }}>Privacy &amp; security</p>
        <div className="card" style={{ padding: "2px 14px" }}>
          {/* TODO: change-password screen and data export / account deletion */}
          <a className="li" href="#" style={{ padding: "11px 0" }}>
            <span className="grow h3" style={{ fontSize: 14 }}>Change password</span>
            <Icon name="chevronRight" size="s" style={{ color: "var(--muted)" }} />
          </a>
          <a className="li" href="#" style={{ padding: "11px 0" }}>
            <span className="grow h3" style={{ fontSize: 14 }}>Download or delete my data</span>
            <Icon name="chevronRight" size="s" style={{ color: "var(--muted)" }} />
          </a>
        </div>

        {/* TODO: sign the user out before returning to the splash screen */}
        <Link className="btn ghost" href={routes.splash} style={{ color: "var(--red)", marginTop: 4 }}>
          <Icon name="logout" size="s" />
          Log out
        </Link>
      </main>
    </>
  );
}
