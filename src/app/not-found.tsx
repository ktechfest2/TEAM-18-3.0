import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { T } from "@/i18n";
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
        <h1 className="h1"><T k="notFound.title" /></h1>
        <p className="body"><T k="notFound.body" /></p>
        <Link className="btn" href={routes.home}>
          <T k="common.backToHome" />
        </Link>
      </div>
    </main>
  );
}
