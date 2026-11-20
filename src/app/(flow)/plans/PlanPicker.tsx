"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { PLAN_FEATURES, PLANS, type Access, type PlanId } from "@/lib/plans";

const ACCESS_STYLE: Record<Access, React.CSSProperties> = {
  Yes: { background: "var(--green-t)", color: "var(--green-d)" },
  Limited: { background: "var(--amber-t)", color: "#6E4700" },
  No: { background: "#EBEEEA", color: "var(--muted)" },
};

// Compare plans and pick one. `currentPlan` is the user's plan today.
// TODO: load the current plan from the account and start payment on upgrade.
export function PlanPicker({ currentPlan }: { currentPlan: PlanId }) {
  const [selected, setSelected] = useState<PlanId>(currentPlan);
  const selectedPlan = PLANS.find((p) => p.id === selected)!;

  const buttonLabel =
    selected === currentPlan
      ? "Your current plan"
      : selected === "free"
        ? "Switch to Free"
        : `Upgrade to ${selectedPlan.name}`;

  return (
    <>
      <main className="content" style={{ gap: 12 }}>
        <div className="priv">
          <Icon name="shieldCheck" size="s" />
          <span>
            Reporting that you voted, incident reports and safety alerts are <strong>always free</strong>.
          </span>
        </div>

        <div className="grid3" role="radiogroup" aria-label="Plan" style={{ gap: 8 }}>
          {PLANS.map((plan) => {
            const isSelected = plan.id === selected;
            return (
              <button
                key={plan.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setSelected(plan.id)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 2,
                  padding: 12,
                  borderRadius: 14,
                  fontFamily: "inherit",
                  textAlign: "left",
                  cursor: "pointer",
                  background: isSelected ? "var(--ink)" : "#fff",
                  color: isSelected ? "#fff" : "var(--ink)",
                  border: isSelected ? "1.5px solid var(--ink)" : "1px solid var(--line)",
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 700 }}>{plan.name}</span>
                <span style={{ fontSize: 17, fontWeight: 800 }}>{plan.price}</span>
                <span style={{ fontSize: 11, opacity: 0.75 }}>{plan.per}</span>
              </button>
            );
          })}
        </div>

        <div className="card" style={{ padding: "4px 14px" }}>
          {PLAN_FEATURES.map((feature) => {
            const access = feature.access[selected];
            return (
              <div key={feature.label} className="li" style={{ padding: "10px 0" }}>
                <span className="grow" style={{ fontSize: 13.5, fontWeight: 600 }}>{feature.label}</span>
                <span style={{ fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 99, ...ACCESS_STYLE[access] }}>
                  {access}
                </span>
              </div>
            );
          })}
        </div>
      </main>

      <div className="foot">
        <button
          className="btn"
          type="button"
          disabled={selected === currentPlan}
          style={selected === currentPlan ? { opacity: 0.6, cursor: "default" } : undefined}
        >
          {buttonLabel}
        </button>
        <p className="sm" style={{ textAlign: "center" }}>Pay by card, transfer or USSD. Cancel anytime.</p>
      </div>
    </>
  );
}
