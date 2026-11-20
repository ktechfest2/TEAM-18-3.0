import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { T } from "@/i18n";

type StepHeaderProps = {
  step: number;
  totalSteps: number;
  backHref: string;
  /** "back" shows an arrow, "close" shows an ✕ (used when leaving a flow). */
  backIcon?: "back" | "close";
};

// Top bar for step-by-step flows: back button, progress bar, "2 of 4".
export function StepHeader({ step, totalSteps, backHref, backIcon = "back" }: StepHeaderProps) {
  return (
    <header className="top">
      <Link className="ibtn" href={backHref} aria-label={backIcon === "close" ? "Close" : "Back"}>
        <Icon name={backIcon} />
      </Link>

      <div className="prog" style={{ flex: 1 }} aria-hidden="true">
        {Array.from({ length: totalSteps }, (_, i) => (
          <i key={i} className={i < step ? "on" : undefined} />
        ))}
      </div>

      <span className="sm" style={{ fontWeight: 600 }}>
        <T k="common.stepOf" values={{ step, total: totalSteps }} />
      </span>
    </header>
  );
}
