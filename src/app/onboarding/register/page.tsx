import type { Metadata } from "next";
import Link from "next/link";
import { StepHeader } from "@/components/layout/StepHeader";
import { SelectField } from "@/components/ui/SelectField";
import { routes } from "@/lib/routes";

export const metadata: Metadata = { title: "Create account" };

// Screen 03 · Create account
// TODO: submit the form to the registration API and send the SMS code.
export default function RegisterPage() {
  return (
    <>
      <StepHeader step={2} totalSteps={4} backHref={routes.onboarding.language} />

      <main className="content" style={{ gap: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingTop: 4 }}>
          <h1 className="h1">Create your account</h1>
          <p className="body">Use the details on your voter&apos;s card so we can confirm your eligibility.</p>
        </div>

        <div className="field">
          <label htmlFor="fullName">Full name</label>
          <input className="inp" id="fullName" name="fullName" autoComplete="name" placeholder="As on your voter's card" />
        </div>

        <div className="field">
          <label htmlFor="phone">Phone number</label>
          <div style={{ display: "flex", gap: 8 }}>
            <span className="inp" style={{ width: 84, display: "flex", alignItems: "center", fontWeight: 600 }}>
              +234
            </span>
            <input
              className="inp"
              id="phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="801 234 5678"
              style={{ flex: 1 }}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="email">
            Email <span style={{ color: "var(--muted)", fontWeight: 500 }}>(optional)</span>
          </label>
          <input className="inp" id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
        </div>

        <div className="grid2">
          <div className="field">
            <label htmlFor="dob">Date of birth</label>
            <input className="inp" id="dob" name="dob" type="date" autoComplete="bday" />
          </div>
          <SelectField id="gender" label="Gender" options={["Female", "Male", "Prefer not to say"]} />
        </div>

        <div className="field">
          <label htmlFor="password">Create password</label>
          <input
            className="inp"
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
          />
        </div>

        <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, lineHeight: 1.45, color: "var(--muted)" }}>
          <input
            type="checkbox"
            name="acceptTerms"
            style={{ width: 20, height: 20, margin: 0, accentColor: "var(--green)", flexShrink: 0 }}
          />
          <span>
            I agree to the{" "}
            <a href="#" style={{ fontWeight: 700 }}>
              Terms
            </a>{" "}
            and{" "}
            <a href="#" style={{ fontWeight: 700 }}>
              Privacy Policy
            </a>
            . My identity will never be linked to how I vote.
          </span>
        </label>
      </main>

      <div className="foot">
        <Link className="btn" href={routes.onboarding.verify}>
          Send verification code
        </Link>
      </div>
    </>
  );
}
