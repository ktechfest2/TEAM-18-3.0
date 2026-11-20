import type { Metadata } from "next";
import Link from "next/link";
import { StepHeader } from "@/components/layout/StepHeader";
import { Icon } from "@/components/ui/Icon";
import { MaskedPhone } from "@/components/profile/ProfileText";
import { routes } from "@/lib/routes";
import { CodeInput } from "./CodeInput";

export const metadata: Metadata = { title: "Verify account" };

// Screen 04 · Voter verification
// TODO: check the SMS code, then send VIN + last name to the approved
// eligibility-verification service (INEC integration — still to be arranged).
export default function VerifyPage() {
  return (
    <>
      <StepHeader step={3} totalSteps={4} backHref={routes.onboarding.register} />

      <main className="content" style={{ gap: 18 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingTop: 4 }}>
          <h1 className="h1">Verify it&apos;s you</h1>
          <p className="body">
            Enter the 6-digit code sent to <strong style={{ color: "var(--ink)" }}><MaskedPhone /></strong>.
          </p>
        </div>

        <CodeInput />

        <p className="sm">
          Didn&apos;t get it?{" "}
          <button type="button" className="link" style={{ fontSize: 12.5, background: "none", border: 0, padding: 0, cursor: "pointer" }}>
            Resend code
          </button>
        </p>

        <div className="div" />

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <h2 className="h2">Voter eligibility</h2>
          <p className="body">
            We confirm eligibility through an authorised INEC integration or another legally approved verification
            service.
          </p>
        </div>

        <div className="field">
          <label htmlFor="vin">Voter Identification Number (VIN)</label>
          <input
            className="inp"
            id="vin"
            name="vin"
            autoCapitalize="characters"
            maxLength={19}
            placeholder="19-character VIN on your PVC"
            style={{ letterSpacing: "0.04em" }}
          />
        </div>

        <div className="field">
          <label htmlFor="lastName">Last name on voter&apos;s card</label>
          <input className="inp" id="lastName" name="lastName" autoComplete="family-name" placeholder="e.g. Okafor" />
        </div>

        <div className="priv">
          <Icon name="shieldCheck" size="s" />
          <span>Your VIN is used only to confirm eligibility. It is encrypted and never shown publicly.</span>
        </div>
      </main>

      <div className="foot">
        <Link className="btn" href={routes.onboarding.location}>
          Verify and continue
        </Link>
        <Link className="link" href={routes.onboarding.location} style={{ textAlign: "center", padding: 6 }}>
          Skip voter check for now
        </Link>
      </div>
    </>
  );
}
