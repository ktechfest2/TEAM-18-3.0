"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SelectField } from "@/components/ui/SelectField";
import { routes } from "@/lib/routes";
import { saveUserProfile, useUserProfile } from "@/lib/user-profile";

// Create-account form. Saves the details on this phone, then goes to verification.
// TODO: send the details to the registration API instead (and send the SMS code).
export function RegisterForm() {
  const router = useRouter();
  const saved = useUserProfile();
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const fullName = String(form.get("fullName") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();

    if (!fullName || phone.replace(/\D/g, "").length < 10) {
      setError("Enter your full name and a valid phone number.");
      return;
    }
    if (!form.get("acceptTerms")) {
      setError("Please accept the Terms and Privacy Policy to continue.");
      return;
    }

    saveUserProfile({ fullName, phone, email: String(form.get("email") ?? "").trim() });
    router.push(routes.onboarding.verify);
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: "contents" }}>
      <main className="content" style={{ gap: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingTop: 4 }}>
          <h1 className="h1">Create your account</h1>
          <p className="body">Use the details on your voter&apos;s card so we can confirm your eligibility.</p>
        </div>

        <div className="field">
          <label htmlFor="fullName">Full name</label>
          <input
            className="inp"
            id="fullName"
            name="fullName"
            autoComplete="name"
            placeholder="As on your voter's card"
            defaultValue={saved.fullName}
            key={`name-${saved.fullName}`}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="phone">Phone number</label>
          <div style={{ display: "flex", gap: 8 }}>
            <span className="inp" style={{ width: 84, display: "flex", alignItems: "center", fontWeight: 600 }}>+234</span>
            <input
              className="inp"
              id="phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="801 234 5678"
              defaultValue={saved.phone}
              key={`phone-${saved.phone}`}
              required
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
          <input className="inp" id="password" name="password" type="password" autoComplete="new-password" placeholder="At least 8 characters" />
        </div>

        <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, lineHeight: 1.45, color: "var(--muted)" }}>
          <input type="checkbox" name="acceptTerms" style={{ width: 20, height: 20, margin: 0, accentColor: "var(--green)", flexShrink: 0 }} />
          <span>
            {/* TODO: real Terms and Privacy Policy pages */}
            I agree to the <a href="#" style={{ fontWeight: 700 }}>Terms</a> and{" "}
            <a href="#" style={{ fontWeight: 700 }}>Privacy Policy</a>. My identity will never be linked to how I vote.
          </span>
        </label>

        {error && (
          <p role="alert" className="sm" style={{ color: "var(--red)", fontWeight: 600 }}>
            {error}
          </p>
        )}
      </main>

      <div className="foot">
        <button className="btn" type="submit">
          Send verification code
        </button>
      </div>
    </form>
  );
}
