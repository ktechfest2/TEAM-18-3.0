import type { Metadata } from "next";
import Link from "next/link";
import { StepHeader } from "@/components/layout/StepHeader";
import { routes } from "@/lib/routes";
import { LanguagePicker } from "./LanguagePicker";

export const metadata: Metadata = { title: "Choose language" };

// Screen 02 · Language
export default function LanguagePage() {
  return (
    <>
      <StepHeader step={1} totalSteps={4} backHref={routes.splash} />

      <main className="content" style={{ gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 8 }}>
          <h1 className="h1">Choose your language</h1>
          <p className="body">
            Menus, instructions and alerts will appear in this language. You can change it any time in Settings.
          </p>
        </div>
        <LanguagePicker />
      </main>

      <div className="foot">
        <Link className="btn" href={routes.onboarding.register}>
          Continue
        </Link>
      </div>
    </>
  );
}
