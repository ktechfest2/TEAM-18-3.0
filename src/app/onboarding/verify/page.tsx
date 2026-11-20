import type { Metadata } from "next";
import Link from "next/link";
import { StepHeader } from "@/components/layout/StepHeader";
import { MaskedPhone } from "@/components/profile/ProfileText";
import { Icon } from "@/components/ui/Icon";
import { T } from "@/i18n";
import { routes } from "@/lib/routes";
import { CodeInput } from "./CodeInput";
import { VoterFields } from "./VoterFields";

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
          <h1 className="h1"><T k="verify.title" /></h1>
          <p className="body">
            <T k="verify.codeSentTo" />{" "}
            <strong style={{ color: "var(--ink)" }}><MaskedPhone /></strong>.
          </p>
        </div>

        <CodeInput />

        <p className="sm">
          <T k="verify.noCode" />{" "}
          <button type="button" className="link" style={{ fontSize: 12.5, background: "none", border: 0, padding: 0, cursor: "pointer" }}>
            <T k="verify.resend" />
          </button>
        </p>

        <div className="div" />

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <h2 className="h2"><T k="verify.eligibility" /></h2>
          <p className="body"><T k="verify.eligibilityBody" /></p>
        </div>

        <VoterFields />

        <div className="priv">
          <Icon name="shieldCheck" size="s" />
          <span><T k="verify.vinPrivacy" /></span>
        </div>
      </main>

      <div className="foot">
        <Link className="btn" href={routes.onboarding.location}>
          <T k="verify.submit" />
        </Link>
        <Link className="link" href={routes.onboarding.location} style={{ textAlign: "center", padding: 6 }}>
          <T k="verify.skip" />
        </Link>
      </div>
    </>
  );
}
