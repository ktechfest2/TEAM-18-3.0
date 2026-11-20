import type { Metadata } from "next";
import { TitleHeader } from "@/components/layout/TitleHeader";
import { Icon } from "@/components/ui/Icon";
import { routes } from "@/lib/routes";

export const metadata: Metadata = { title: "USSD access" };

// PLACEHOLDER short code — set once the telecom provider assigns one.
const USSD_CODE = "*[SHORTCODE]#";

// What a basic phone shows, one screen after another (feature document, section 13.3).
const USSD_SCREENS = [
  {
    text: "EYENEC – every vote, every voice\n1. Election information\n2. Have you voted?\n3. Location statistics\n4. Report election info\n5. News & alerts\n6. Language",
    reply: "2",
    showButtons: true,
  },
  { text: "Have you voted today?\n1. Yes\n2. No\n0. Back", reply: "1" },
  { text: "Thank you. Your report for\nPU [000] [Polling unit] was received.\nRef: [Receipt ID]" },
];

const mono: React.CSSProperties = {
  fontFamily: "ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace",
  fontSize: 14,
  color: "var(--ink)",
};

const phoneCard: React.CSSProperties = {
  background: "#fff",
  borderRadius: 14,
  boxShadow: "0 1px 0 #D5DAD3, 0 8px 24px rgba(14,27,20,0.08)",
  overflow: "hidden",
};

// Screen 32 · USSD menu
// This is an information page showing how the basic-phone service works.
// The USSD service itself runs on the telecom provider's gateway, not in this app.
export default function UssdPage() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#E9ECE7" }}>
      <TitleHeader title="Basic phone access" backHref={routes.profile} />

      <main className="content" style={{ gap: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <h2 className="h1" style={{ fontSize: 22 }}>Dial {USSD_CODE}</h2>
          <p className="sm">Short guided prompts in all 5 languages. No data or smartphone needed.</p>
        </div>

        {USSD_SCREENS.map((screen, index) => (
          <div key={index} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {index > 0 && (
              <div style={{ display: "flex", justifyContent: "center", color: "var(--muted)" }}>
                <Icon name="arrowDown" />
              </div>
            )}
            <div style={phoneCard}>
              <div style={{ ...mono, padding: "16px 18px", lineHeight: 1.7, whiteSpace: "pre-line" }}>{screen.text}</div>
              {screen.reply && (
                <div style={{ ...mono, borderTop: "1px solid var(--line)", padding: "10px 18px", color: "var(--muted)" }}>
                  Reply: <span style={{ color: "var(--ink)", fontWeight: 700 }}>{screen.reply}</span>
                </div>
              )}
              {screen.showButtons && (
                <div aria-hidden="true" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "1px solid var(--line)", fontWeight: 700, textAlign: "center", lineHeight: "44px" }}>
                  <span style={{ color: "var(--muted)", borderRight: "1px solid var(--line)" }}>Cancel</span>
                  <span style={{ color: "var(--green)" }}>Send</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
