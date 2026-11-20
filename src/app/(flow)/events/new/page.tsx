import type { Metadata } from "next";
import Link from "next/link";
import { TitleHeader } from "@/components/layout/TitleHeader";
import { routes } from "@/lib/routes";
import { CreateEventForm } from "./CreateEventForm";

export const metadata: Metadata = { title: "Create event" };

const STEPS = ["Details", "Tickets", "Review"];
const CURRENT_STEP = 2; // TODO: split into real steps

// Screen 27 · Create event (Premium plan only)
// TODO: check the user's plan, upload the banner, and submit for moderation.
export default function CreateEventPage() {
  return (
    <>
      <TitleHeader
        title="Create event"
        backHref={routes.events.list}
        right={<span className="badge" style={{ background: "var(--amber)", color: "var(--ink)" }}>Premium</span>}
      />

      <div style={{ padding: "0 20px 12px" }}>
        <div className="prog" aria-hidden="true">
          {STEPS.map((step, i) => (
            <i key={step} className={i < CURRENT_STEP ? "on" : undefined} />
          ))}
        </div>
        <div className="between" style={{ marginTop: 8, fontSize: 12, fontWeight: 600, color: "var(--muted)" }}>
          {STEPS.map((step, i) => (
            <span key={step} style={{ color: i < CURRENT_STEP ? "var(--green)" : undefined }}>{step}</span>
          ))}
        </div>
      </div>

      <main className="content" style={{ gap: 12 }}>
        <CreateEventForm />
      </main>

      <div className="foot">
        <Link className="btn" href={routes.events.analytics("sample-1")}>
          Submit for review
        </Link>
        <p className="sm" style={{ textAlign: "center" }}>
          Events are moderated before they go live, usually within 24 hours.
        </p>
      </div>
    </>
  );
}
