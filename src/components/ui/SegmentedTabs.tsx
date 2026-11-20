import Link from "next/link";

type Segment = { href: string; label: string };

// Two-or-more pill tabs that switch between pages (e.g. National / By location).
export function SegmentedTabs({ segments, activeHref }: { segments: Segment[]; activeHref: string }) {
  return (
    <nav
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${segments.length}, minmax(0, 1fr))`,
        background: "#E6EAE5",
        borderRadius: 12,
        padding: 4,
      }}
    >
      {segments.map((segment) => {
        const isActive = segment.href === activeHref;
        return (
          <Link
            key={segment.href}
            href={segment.href}
            aria-current={isActive ? "page" : undefined}
            style={{
              height: 38,
              borderRadius: 9,
              background: isActive ? "#fff" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: isActive ? 700 : 600,
              color: isActive ? "var(--ink)" : "var(--muted)",
              textDecoration: "none",
            }}
          >
            {segment.label}
          </Link>
        );
      })}
    </nav>
  );
}
