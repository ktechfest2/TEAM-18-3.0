import type { Metadata } from "next";
import { StepHeader } from "@/components/layout/StepHeader";
import { routes } from "@/lib/routes";
import { LocationForm } from "./LocationForm";

export const metadata: Metadata = { title: "Your polling unit" };

// Screen 05 · Location setup
export default function LocationPage() {
  return (
    <>
      <StepHeader step={4} totalSteps={4} backHref={routes.onboarding.verify} />
      <LocationForm />
    </>
  );
}
