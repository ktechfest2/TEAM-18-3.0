"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { routes } from "@/lib/routes";
import { formatNaira, type TicketTier } from "@/lib/sample-events";

const MAX_PER_TIER = 10;
const PAYMENT_METHODS = ["Card", "Transfer", "USSD"];

type TicketSelectorProps = { eventId: string; tiers: TicketTier[] };

// Pick how many of each ticket type, choose a payment method, see the total.
// TODO: "Pay" should start payment with the payment provider (Paystack / Flutterwave).
export function TicketSelector({ eventId, tiers }: TicketSelectorProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0]);

  function change(tierId: string, delta: number) {
    const next = Math.max(0, Math.min(MAX_PER_TIER, (quantities[tierId] ?? 0) + delta));
    setQuantities({ ...quantities, [tierId]: next });
  }

  const selected = tiers.filter((tier) => (quantities[tier.id] ?? 0) > 0);
  const count = selected.reduce((sum, tier) => sum + quantities[tier.id], 0);
  const hasUnknownPrice = selected.some((tier) => tier.price === null);
  const total = selected.reduce((sum, tier) => sum + quantities[tier.id] * (tier.price ?? 0), 0);
  const totalLabel = hasUnknownPrice ? "₦[total]" : `₦${total.toLocaleString("en-NG")}`;

  return (
    <>
      <main className="content" style={{ gap: 10 }}>
        {tiers.map((tier) => {
          const quantity = quantities[tier.id] ?? 0;
          return (
            <div
              key={tier.id}
              className="card"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 16px",
                opacity: tier.soldOut ? 0.55 : 1,
                border: quantity > 0 ? "1.5px solid var(--green)" : undefined,
              }}
            >
              <div className="grow">
                <div className="row" style={{ gap: 8 }}>
                  <span className="h3">{tier.name}</span>
                  {tier.soldOut && <span className="badge b-sub">Sold out</span>}
                </div>
                <p className="sm">{tier.note}</p>
                <p style={{ margin: "4px 0 0", fontSize: 15, fontWeight: 800 }}>{formatNaira(tier.price)}</p>
              </div>

              {!tier.soldOut && (
                <div className="row" style={{ gap: 10 }}>
                  <button
                    className="ibtn"
                    type="button"
                    aria-label={`Remove one ${tier.name} ticket`}
                    onClick={() => change(tier.id, -1)}
                    style={{ width: 36, height: 36, borderRadius: 10 }}
                  >
                    <Icon name="minus" size="s" />
                  </button>
                  <span style={{ width: 18, textAlign: "center", fontWeight: 800, fontSize: 16 }} aria-live="polite">
                    {quantity}
                  </span>
                  <button
                    className="ibtn"
                    type="button"
                    aria-label={`Add one ${tier.name} ticket`}
                    onClick={() => change(tier.id, 1)}
                    style={{ width: 36, height: 36, borderRadius: 10, background: "var(--green)", color: "#fff", borderColor: "var(--green)" }}
                  >
                    <Icon name="plus" size="s" />
                  </button>
                </div>
              )}
            </div>
          );
        })}

        <p className="flabel" style={{ marginTop: 6 }} id="pay-label">Pay with</p>
        <div className="grid3" role="radiogroup" aria-labelledby="pay-label" style={{ gap: 8 }}>
          {PAYMENT_METHODS.map((method) => (
            <button
              key={method}
              type="button"
              role="radio"
              aria-checked={method === paymentMethod}
              className={method === paymentMethod ? "chip on" : "chip"}
              onClick={() => setPaymentMethod(method)}
              style={{ height: 44, justifyContent: "center", borderRadius: 12, cursor: "pointer" }}
            >
              {method}
            </button>
          ))}
        </div>
      </main>

      <div className="foot" style={{ borderTop: "1px solid var(--line)", background: "#fff", paddingTop: 14 }}>
        <div className="between">
          <span className="sm">{count} ticket(s)</span>
          <span style={{ fontSize: 20, fontWeight: 800 }}>{totalLabel}</span>
        </div>
        {count > 0 ? (
          <Link className="btn" href={routes.events.ticket(`${eventId}-ticket`)}>
            {total > 0 || hasUnknownPrice ? `Pay ${totalLabel}` : "Get free tickets"}
          </Link>
        ) : (
          <button className="btn" type="button" disabled style={{ opacity: 0.5, cursor: "not-allowed" }}>
            Choose your tickets
          </button>
        )}
      </div>
    </>
  );
}
