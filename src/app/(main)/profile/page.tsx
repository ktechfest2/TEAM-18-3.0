import type { Metadata } from "next";
import Link from "next/link";
import { FullArea, FullName, Initials, LanguageName, MaskedPhone, PollingUnitName } from "@/components/profile/ProfileText";
import { Icon, type IconName } from "@/components/ui/Icon";
import { routes } from "@/lib/routes";

export const metadata: Metadata = { title: "Profile" };

// Name, phone, location and language come from the details saved on this phone.
// PLACEHOLDER plan details — replace with the user's subscription from the API.
const sampleProfile = {
  plan: "[Plan] · ₦[price]/mo",
  renews: "Renews [date]",
};

const MENU: { href: string; icon: IconName; title: string; detail?: React.ReactNode; tone?: string }[] = [
  { href: routes.onboarding.location, icon: "pin", title: "Registered location", detail: <><PollingUnitName /> · <FullArea /></> },
  { href: routes.settings, icon: "globe", title: "Language", detail: <LanguageName /> },
  { href: routes.myReports, icon: "document", title: "My reports", detail: "[0] this election" },
  { href: routes.events.ticket("sample-1-ticket"), icon: "ticket", title: "My tickets", detail: "[0] upcoming" },
  { href: routes.plans, icon: "card", title: "Payment history", detail: "Last paid [date]" },
  { href: routes.ussd, icon: "phone", title: "Basic phone (USSD)", detail: "Use EYENEC without data", tone: "t-n" },
  { href: "#", icon: "help", title: "Help & support", tone: "t-n" }, // TODO: help centre
];

// TODO: once accounts exist, show this only to staff with an admin/moderator role.
const SHOW_ADMIN_LINK = true;

// Screen 29 · Profile
export default function ProfilePage() {
  const profile = sampleProfile;

  return (
    <>
      <header className="top">
        <h1 className="t-title" style={{ fontSize: 20 }}>Profile</h1>
        <Link className="ibtn" href={routes.settings} aria-label="Settings">
          <Icon name="settings" />
        </Link>
      </header>

      <main className="content" style={{ gap: 14 }}>
        <section className="card row" style={{ gap: 14 }}>
          <span
            aria-hidden="true"
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "var(--green)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            <Initials />
          </span>
          <span className="grow" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span className="h2"><FullName /></span>
            <span className="sm"><MaskedPhone /></span>
            <span className="row" style={{ gap: 6, flexWrap: "wrap" }}>
              <span className="badge b-ver">Phone verified</span>
              <span className="badge b-rev">Voter check pending</span>
            </span>
          </span>
        </section>

        <section className="card row" style={{ background: "var(--ink)", borderColor: "var(--ink)", color: "#fff" }}>
          <span className="grow">
            <span className="lbl" style={{ color: "#A9B8AF" }}>Your plan</span>
            <span style={{ display: "block", fontSize: 18, fontWeight: 800 }}>{profile.plan}</span>
            <span style={{ fontSize: 12.5, color: "#C8D3CC" }}>{profile.renews}</span>
          </span>
          <Link className="btn sm" href={routes.plans} style={{ background: "var(--amber)", color: "var(--ink)" }}>
            Manage
          </Link>
        </section>

        <nav className="card" aria-label="Account" style={{ padding: "2px 14px" }}>
          {MENU.map((item) => (
            <Link key={item.title} className="li" href={item.href}>
              <span className={`tile ${item.tone ?? "t-g"}`} style={{ width: 38, height: 38 }}>
                <Icon name={item.icon} size="s" />
              </span>
              <span className="grow">
                <span className="h3" style={{ display: "block", fontSize: 14 }}>{item.title}</span>
                {item.detail && <span className="sm">{item.detail}</span>}
              </span>
              <Icon name="chevronRight" size="s" style={{ color: "var(--muted)" }} />
            </Link>
          ))}
        </nav>

        {SHOW_ADMIN_LINK && (
          <Link className="card row" href={routes.admin} style={{ padding: "12px 14px", textDecoration: "none", color: "var(--ink)" }}>
            <span className="tile" style={{ width: 38, height: 38, background: "var(--ink)", color: "var(--amber)" }}>
              <Icon name="shield" size="s" />
            </span>
            <span className="grow">
              <span className="h3" style={{ display: "block", fontSize: 14 }}>Admin console</span>
              <span className="sm">Moderation and platform management (staff only)</span>
            </span>
            <Icon name="chevronRight" size="s" style={{ color: "var(--muted)" }} />
          </Link>
        )}
      </main>
    </>
  );
}
