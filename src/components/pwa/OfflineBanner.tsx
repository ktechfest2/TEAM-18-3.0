"use client";

import { useOffline } from "next/offline";

// Thin banner shown on every screen while the device has no connection.
export function OfflineBanner() {
  const isOffline = useOffline();
  if (!isOffline) return null;

  return (
    <div className="offline-banner" role="status">
      You&apos;re offline. Some features won&apos;t work until you reconnect.
    </div>
  );
}
