import type { Metadata } from "next";
import { TitleHeader } from "@/components/layout/TitleHeader";
import { T } from "@/i18n";
import { routes } from "@/lib/routes";
import { LogoutButton } from "./LogoutButton";
import { SettingsForm } from "./SettingsForm";

export const metadata: Metadata = { title: "Settings" };

// Screen 30 · Settings
export default function SettingsPage() {
  return (
    <>
      <TitleHeader title={<T k="settings.title" />} backHref={routes.profile} />
      <main className="content" style={{ gap: 12 }}>
        <SettingsForm />
        <LogoutButton />
      </main>
    </>
  );
}
