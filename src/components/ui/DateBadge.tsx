type DateBadgeProps = { month: string; day: string; highlight?: boolean };

// Small "DEC / 06" calendar block used in event lists.
export function DateBadge({ month, day, highlight = false }: DateBadgeProps) {
  return (
    <div
      style={{
        width: highlight ? 52 : 48,
        flexShrink: 0,
        textAlign: "center",
        borderRadius: highlight ? 12 : 10,
        background: highlight ? "var(--green-t)" : "#EBEEEA",
        padding: highlight ? "8px 0" : "6px 0",
      }}
    >
      <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: highlight ? "var(--green-d)" : "var(--muted)" }}>{month}</p>
      <p style={{ margin: 0, fontSize: highlight ? 20 : 17, fontWeight: 800, color: highlight ? "var(--green-d)" : "var(--ink)" }}>
        {day}
      </p>
    </div>
  );
}
