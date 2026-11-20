import type { Metadata } from "next";
import { StepHeader } from "@/components/layout/StepHeader";
import { routes } from "@/lib/routes";
import { RegisterForm } from "./RegisterForm";

export const metadata: Metadata = { title: "Create account" };

// Screen 03 · Create account
export default function RegisterPage() {
  return (
    <>
      <StepHeader step={2} totalSteps={4} backHref={routes.onboarding.language} />
      <RegisterForm />
    </>
  );
}
