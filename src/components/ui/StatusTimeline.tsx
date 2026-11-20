import { Icon } from "@/components/ui/Icon";

export type TimelineStep = {
  title: string;
  detail: string;
  state: "done" | "current" | "pending";
};

type StatusTimelineProps = {
  steps: TimelineStep[];
  /** Colour of the current step's dot: green (default) or amber (still under review). */
  currentTone?: "green" | "amber";
};

// Vertical progress of a report: Received → Under review → Verified → …
export function StatusTimeline({ steps, currentTone = "green" }: StatusTimelineProps) {
  return (
    <ol style={{ display: "flex", flexDirection: "column", margin: 0, padding: 0, listStyle: "none" }}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const lineColor = step.state === "done" ? "var(--green)" : "#DCE1DB";
        return (
          <li key={step.title} style={{ display: "grid", gridTemplateColumns: "24px 1fr", gap: 10 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <StepDot state={step.state} tone={currentTone} />
              {!isLast && <span style={{ width: 2, flex: 1, background: lineColor, minHeight: 18 }} />}
            </div>
            <div style={{ paddingBottom: isLast ? 0 : 12 }}>
              <p className="h3" style={{ fontSize: 14, color: step.state === "pending" ? "var(--muted)" : undefined }}>
                {step.title}
              </p>
              <p className="sm">{step.detail}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

const TONES = {
  green: { dot: "var(--green)", halo: "var(--green-t)" },
  amber: { dot: "var(--amber)", halo: "var(--amber-t)" },
};

function StepDot({ state, tone }: { state: TimelineStep["state"]; tone: keyof typeof TONES }) {
  const base = { width: 20, height: 20, borderRadius: "50%", flexShrink: 0 } as const;

  if (state === "done") {
    return (
      <span style={{ ...base, background: "var(--green)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name="check" style={{ width: 12, height: 12, strokeWidth: 3.5 }} />
      </span>
    );
  }
  if (state === "current") {
    return <span style={{ ...base, background: TONES[tone].dot, boxShadow: `0 0 0 4px ${TONES[tone].halo}` }} />;
  }
  return <span style={{ ...base, border: "2px solid #AEB7B0", background: "#fff" }} />;
}
