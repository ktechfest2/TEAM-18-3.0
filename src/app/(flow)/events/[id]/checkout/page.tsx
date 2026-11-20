import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Icon } from "@/components/ui/Icon";
import { routes } from "@/lib/routes";
import { findEvent, sampleEvents } from "@/lib/sample-events";
import { TicketSelector } from "./TicketSelector";

export const metadata: Metadata = { title: "Get tickets" };

export function generateStaticParams() {
  return sampleEvents.map((event) => ({ id: event.id }));
}

// Screen 25 · Get tickets
export default function CheckoutPage({ params }: PageProps<"/events/[id]/checkout">) {
  return (
    <Suspense fallback={null}>
      {params.then(({ id }) => {
        const event = findEvent(id);
        return (
          <>
            <header className="top">
              <Link className="ibtn" href={routes.events.detail(event.id)} aria-label="Back">
                <Icon name="back" />
              </Link>
              <div className="grow">
                <h1 className="t-title" style={{ display: "block" }}>Get tickets</h1>
                <p className="sm">{event.title} · {event.day} {event.month}</p>
              </div>
            </header>
            <TicketSelector eventId={event.id} tiers={event.tiers} />
          </>
        );
      })}
    </Suspense>
  );
}
