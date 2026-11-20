import type { Metadata } from "next";
import { StepHeader } from "@/components/layout/StepHeader";
import { routes } from "@/lib/routes";
import { VotedChoice } from "./VotedChoice";

export const metadata: Metadata = { title: "Have you voted?" };

// Screen 09 · Have you voted?
export default function HaveVotedPage() {
  return (
    <>
      <StepHeader step={1} totalSteps={3} backHref={routes.report.hub} backIcon="close" />
      <VotedChoice />
    </>
  );
}
