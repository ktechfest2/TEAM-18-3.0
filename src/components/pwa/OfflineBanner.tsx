"use client";

import { useOffline } from "next/offline";
import { useT } from "@/i18n";

// Thin banner shown on every screen while the device has no connection.
export function OfflineBanner() {
  const isOffline = useOffline();
  const t = useT();
  if (!isOffline) return null;

  return (
    <div className="offline-banner" role="status">
      {t("offline.banner")}
    </div>
  );
}
