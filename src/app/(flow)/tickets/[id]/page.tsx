import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Icon } from "@/components/ui/Icon";
import { TicketQrCode } from "@/components/ui/TicketQrCode";
import { MaskedPhone } from "@/components/profile/ProfileText";
import { routes } from "@/lib/routes";
import { sampleEvents } from "@/lib/sample-events";

export const metadata: Metadata = { title: "Your ticket" };

export function generateStaticParams() {
  return sampleEvents.map((event) => ({ id: `${event.id}-ticket` }));
}

// PLACEHOLDER ticket — replace with the ticket returned after payment.
const sampleTicket = {
  tier: "[Ticket type] · 1 of [n]",
  number: "#TKT-[00000]",
  eventTitle: "[Event name]",
  eventMeta: "[Day], [date] · [time] · [Venue]",
  holder: "[Ticket holder name]",
  paid: "₦[amount] ([n])",
};

// Screen 26 · Ticket & QR
export default function TicketPage({ params }: PageProps<"/tickets/[id]">) {
  const ticket = sampleTicket;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "var(--green-d)" }}>
      <header className="top">
        <Link
          className="ibtn"
          href={routes.events.list}
          aria-label="Close"
          style={{ background: "rgba(255,255,255,0.12)", borderColor: "rgba(255,255,255,0.2)", color: "#fff" }}
        >
          <Icon name="close" />
        </Link>
        <h1 className="t-title" style={{ color: "#fff" }}>Payment successful</h1>
      </header>

      <main className="content" style={{ gap: 16, paddingTop: 8 }}>
        <div style={{ background: "#fff", borderRadius: 22, overflow: "hidden" }}>
          <div style={{ padding: "20px 20px 16px", display: "flex", flexDirection: "column", gap: 4 }}>
            <div className="between">
              <span className="badge b-ver">{ticket.tier}</span>
              <span className="sm" style={{ fontWeight: 700 }}>{ticket.number}</span>
            </div>
            <p className="h2" style={{ marginTop: 8, fontSize: 20 }}>{ticket.eventTitle}</p>
            <p className="sm">{ticket.eventMeta}</p>
          </div>

          <div style={{ borderTop: "2px dashed #DCE1DB", margin: "0 16px" }} />

          <div style={{ padding: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <Suspense fallback={<div className="img" style={{ width: 196, height: 196 }} />}>
              {params.then(({ id }) => (
                <TicketQrCode value={`EYENEC-TICKET:${id}`} />
              ))}
            </Suspense>
            <p className="sm" style={{ textAlign: "center" }}>Show this code at the entrance. It works offline.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", borderTop: "1px solid var(--line)" }}>
            <div style={{ padding: "14px 20px", borderRight: "1px solid var(--line)" }}>
              <p className="sm">Ticket holder</p>
              <p className="h3" style={{ fontSize: 14 }}>{ticket.holder}</p>
            </div>
            <div style={{ padding: "14px 20px" }}>
              <p className="sm">Paid</p>
              <p className="h3" style={{ fontSize: 14 }}>{ticket.paid}</p>
            </div>
          </div>
        </div>

        <p style={{ margin: 0, textAlign: "center", fontSize: 12.5, color: "#CFE3D8" }}>
          Confirmation sent to <MaskedPhone />
        </p>
      </main>

      <div className="foot" style={{ background: "transparent" }}>
        {/* TODO: Apple / Google Wallet passes */}
        <button className="btn" type="button" style={{ background: "var(--amber)", color: "var(--ink)" }}>
          Add to wallet
        </button>
        <Link className="btn" href={routes.notifications} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.35)" }}>
          View all my tickets
        </Link>
      </div>
    </div>
  );
}
