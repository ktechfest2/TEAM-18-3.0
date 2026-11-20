import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

type TitleHeaderProps = {
  title: string;
  backHref?: string;
  /** Anything shown on the right, e.g. "1 of 2" or an icon button. */
  right?: React.ReactNode;
};

// Top bar with an optional back button and a page title.
export function TitleHeader({ title, backHref, right }: TitleHeaderProps) {
  return (
    <header className="top">
      {backHref && (
        <Link className="ibtn" href={backHref} aria-label="Back">
          <Icon name="back" />
        </Link>
      )}
      <h1 className="t-title" style={backHref ? undefined : { fontSize: 20 }}>
        {title}
      </h1>
      {right}
    </header>
  );
}
