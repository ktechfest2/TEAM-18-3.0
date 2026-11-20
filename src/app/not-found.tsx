import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { routes } from "@/lib/routes";

// Shown for any URL that has no page yet. While screens are being built,
// links to unbuilt screens land here instead of a blank error.
export default function NotFound() {
  return (
    <main className="scr">
      <div className="content" style={{ justifyContent: "center", alignItems: "flex-start", gap: 18 }}>
        <span className="tile t-a" style={{ width: 64, height: 64, borderRadius: 18 }}>
          <Icon name="clock" size="l" />
        </span>
        <h1 className="h1">This screen is coming soon</h1>
        <p className="body">It&apos;s in the designs but hasn&apos;t been built yet.</p>
        <Link className="btn" href={routes.home}>
          Back to home
        </Link>
      </div>
    </main>
  );
}
