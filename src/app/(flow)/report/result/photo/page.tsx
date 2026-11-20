import type { Metadata } from "next";
import Link from "next/link";
import { TitleHeader } from "@/components/layout/TitleHeader";
import { Icon } from "@/components/ui/Icon";
import { PhotoPicker } from "@/components/ui/PhotoPicker";
import { routes } from "@/lib/routes";

export const metadata: Metadata = { title: "Result sheet photo" };

// PLACEHOLDER summary — should show what the user entered on screen 15.
const SUMMARY = [
  { label: "Winner reported", value: "[Party]" },
  { label: "Valid / rejected", value: "[0] / [0]" },
  { label: "Submitted", value: "Today, [time]" },
];

// Screen 16 · Result sheet photo
// TODO: "Submit result report" should send the figures + photo to the API.
export default function ResultPhotoPage() {
  return (
    <>
      <TitleHeader
        title="Result sheet photo"
        backHref={routes.report.result}
        right={<span className="sm" style={{ fontWeight: 600 }}>2 of 2</span>}
      />

      <main className="content" style={{ gap: 14 }}>
        <p className="body">
          Attach a clear photo of the result sheet publicly displayed at the polling unit. Optional, but it speeds up
          verification.
        </p>

        <PhotoPicker label="Result sheet photo" />

        <div className="card" style={{ padding: "4px 16px" }}>
          {SUMMARY.map((row) => (
            <div key={row.label} className="li">
              <span className="sm grow">{row.label}</span>
              <span className="h3" style={{ fontSize: 14 }}>{row.value}</span>
            </div>
          ))}
        </div>

        <div className="warn">
          <Icon name="alert" size="s" />
          <span>
            Only photograph where lawful and safe. Your report starts as <strong>Received</strong> and is reviewed
            before it is shown as verified.
          </span>
        </div>
      </main>

      <div className="foot">
        <Link className="btn" href={routes.myReports}>
          Submit result report
        </Link>
      </div>
    </>
  );
}
