"use client";

import { Icon } from "@/components/ui/Icon";

type ShareButtonProps = { title: string; style?: React.CSSProperties };

// Opens the phone's share sheet (Web Share API); falls back to copying the link.
export function ShareButton({ title, style }: ShareButtonProps) {
  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      // The user closed the share sheet — nothing to do.
    }
  }

  return (
    <button className="ibtn" type="button" aria-label="Share" onClick={share} style={style}>
      <Icon name="share" />
    </button>
  );
}
