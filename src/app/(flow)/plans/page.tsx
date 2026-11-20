import type { Metadata } from "next";
import { TitleHeader } from "@/components/layout/TitleHeader";
import { routes } from "@/lib/routes";
import { PlanPicker } from "./PlanPicker";

export const metadata: Metadata = { title: "Plans" };

// Screen 31 · Subscription plans
export default function PlansPage() {
  return (
    <>
      <TitleHeader title="Plans" backHref={routes.profile} />
      <PlanPicker currentPlan="standard" />
    </>
  );
}
