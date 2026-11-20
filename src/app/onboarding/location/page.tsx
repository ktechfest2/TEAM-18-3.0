import type { Metadata } from "next";
import Link from "next/link";
import { StepHeader } from "@/components/layout/StepHeader";
import { Icon } from "@/components/ui/Icon";
import { SelectField } from "@/components/ui/SelectField";
import { routes } from "@/lib/routes";
import { sampleLgas, sampleStates, sampleWards } from "@/lib/sample-locations";
import { PollingUnitPicker } from "./PollingUnitPicker";

export const metadata: Metadata = { title: "Your polling unit" };

// Screen 05 · Location setup
// TODO: load each dropdown from the backend based on the one above it,
// and wire "Use my current location" to the Geolocation API.
export default function LocationPage() {
  return (
    <>
      <StepHeader step={4} totalSteps={4} backHref={routes.onboarding.verify} />

      <main className="content" style={{ gap: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingTop: 4 }}>
          <h1 className="h1">Where do you vote?</h1>
          <p className="body">Set your registered polling unit. We&apos;ll use it for local stats and alerts.</p>
        </div>

        <button className="btn ghost" type="button" style={{ height: 48, fontSize: 15 }}>
          <Icon name="pin" size="s" style={{ color: "var(--green)" }} />
          Use my current location
        </button>

        <SelectField id="state" label="State" options={sampleStates} placeholder="Select state" />
        <SelectField id="lga" label="Local Government Area" options={sampleLgas} placeholder="Select LGA" />
        <SelectField id="ward" label="Ward" options={sampleWards} placeholder="Select ward" />

        <div className="field">
          <label htmlFor="pollingUnitSearch">Polling unit</label>
          <input className="inp" id="pollingUnitSearch" type="search" placeholder="Search polling unit name or code" />
        </div>

        <PollingUnitPicker />
      </main>

      <div className="foot">
        <Link className="btn" href={routes.onboarding.ready}>
          Finish setup
        </Link>
      </div>
    </>
  );
}
