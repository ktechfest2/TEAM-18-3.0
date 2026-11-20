"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { useT } from "@/i18n";
import { routes } from "@/lib/routes";
import { clearUserProfile } from "@/lib/user-profile";

// Clears the details saved on this phone and returns to the splash screen.
// TODO: also end the session on the server once accounts exist.
export function LogoutButton() {
  const router = useRouter();
  const t = useT();

  function logOut() {
    clearUserProfile();
    router.push(routes.splash);
  }

  return (
    <button className="btn ghost" type="button" onClick={logOut} style={{ color: "var(--red)", marginTop: 4 }}>
      <Icon name="logout" size="s" />
      {t("settings.logOut")}
    </button>
  );
}
