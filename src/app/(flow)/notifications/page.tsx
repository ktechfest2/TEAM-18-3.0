import type { Metadata } from "next";
import Link from "next/link";
import { TitleHeader } from "@/components/layout/TitleHeader";
import { Icon } from "@/components/ui/Icon";
import { routes } from "@/lib/routes";
import { sampleNotifications } from "@/lib/sample-notifications";
import { NotificationList } from "./NotificationList";

export const metadata: Metadata = { title: "Notifications" };

// Screen 22 · Notifications
export default function NotificationsPage() {
  return (
    <>
      <TitleHeader
        title="Notifications"
        backHref={routes.home}
        right={
          <Link className="ibtn" href={routes.settings} aria-label="Notification settings">
            <Icon name="sliders" />
          </Link>
        }
      />
      <NotificationList notifications={sampleNotifications} />
    </>
  );
}
