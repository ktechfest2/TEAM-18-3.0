import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";
import { routes } from "@/lib/routes";

export const metadata: Metadata = { title: "Offline" };

// Shown by the service worker when a page isn't cached and there's no connection.
export default function OfflinePage() {
  return (
    <main className="scr">
      <div className="content" style={{ justifyContent: "center", alignItems: "flex-start", gap: 18 }}>
        <span className="tile t-n" style={{ width: 64, height: 64, borderRadius: 18 }}>
          <Icon name="wifiOff" size="l" />
        </span>
        <h1 className="h1">You&apos;re offline</h1>
        <p className="body">
          This page hasn&apos;t been saved on your phone yet. Check your connection and try again.
        </p>
        <a className="btn" href={routes.home}>
          Try again
        </a>
      </div>
    </main>
  );
}
