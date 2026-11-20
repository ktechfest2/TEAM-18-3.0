import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { T, type MessageKey } from "@/i18n";
import { routes } from "@/lib/routes";

const BADGES: MessageKey[] = ["splash.badgeLanguages", "splash.badgeChannels", "splash.badgePrivate"];

// Screen 01 · Splash / Welcome
export default function SplashPage() {
  return (
    <main className="scr" style={{ background: "var(--green-d)", color: "#fff" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 28px", gap: 28 }}>
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: 26,
            background: "var(--amber)",
            color: "#064D31",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="eye" style={{ width: 52, height: 52, strokeWidth: 2.2 }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <h1 style={{ margin: 0, fontSize: 52, fontWeight: 800, letterSpacing: "0.06em", lineHeight: 1 }}>EYENEC</h1>
          <p style={{ margin: 0, fontSize: 22, fontWeight: 600, color: "var(--amber)" }}>
            <T k="splash.tagline" />
          </p>
        </div>

        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "#CFE3D8", maxWidth: 300 }}>
          <T k="splash.intro" />
        </p>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {BADGES.map((key) => (
            <span key={key} className="badge" style={{ background: "rgba(255,255,255,0.12)", color: "#fff", height: 28, padding: "0 11px" }}>
              <T k={key} />
            </span>
          ))}
        </div>
      </div>

      <div className="foot" style={{ background: "transparent" }}>
        <Link className="btn" href={routes.onboarding.language} style={{ background: "var(--amber)", color: "#0E1B14" }}>
          <T k="splash.getStarted" />
        </Link>
        <Link
          className="btn"
          href={routes.home}
          style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.35)", color: "#fff" }}
        >
          <T k="splash.haveAccount" />
        </Link>
        <p style={{ margin: "6px 0 0", fontSize: 12, color: "#A9C9B8", textAlign: "center" }}>
          <T k="splash.note" />
        </p>
      </div>
    </main>
  );
}
