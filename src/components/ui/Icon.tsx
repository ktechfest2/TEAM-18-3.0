// Stroke icons used across the EYENEC designs.
// Usage: <Icon name="home" />  or  <Icon name="back" size="s" />

const PATHS = {
  eye: (
    <>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3.2" />
    </>
  ),
  back: <path d="m15 6-6 6 6 6" />,
  chevronRight: <path d="m9 6 6 6-6 6" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  check: <path d="m5 12 5 5 9-10" />,
  plus: <path d="M12 5v14M5 12h14" />,
  bell: <path d="M6 9a6 6 0 0 1 12 0c0 6 2.5 7.5 2.5 7.5h-17S6 15 6 9M10 20a2 2 0 0 0 4 0" />,
  home: <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />,
  stats: <path d="M5 20V11M12 20V4M19 20v-6" />,
  news: <path d="M4 5h13v14H6a2 2 0 0 1-2-2zM17 9h3v8a2 2 0 0 1-2 2M8 9h5M8 13h5" />,
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
    </>
  ),
  document: (
    <>
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M9 12h7M9 16h5" />
    </>
  ),
  alert: <path d="M12 3 2 20h20zM12 10v4M12 17h.01" />,
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  ballot: (
    <>
      <rect x="4" y="9" width="16" height="12" rx="2" />
      <path d="M8 9V4h8v5M9 15l2 2 4-4" />
    </>
  ),
  shield: <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" />,
  wifiOff: <path d="M2 2l20 20M8.5 16.5a5 5 0 0 1 7 0M5 13a10 10 0 0 1 5.2-2.8M19 13a10 10 0 0 0-2.4-1.7M2 8.8a15 15 0 0 1 4.2-2.6M22 8.8A15 15 0 0 0 10.7 5M12 20h.01" />,
} as const;

export type IconName = keyof typeof PATHS;

type IconProps = {
  name: IconName;
  size?: "s" | "m" | "l";
  className?: string;
  style?: React.CSSProperties;
};

export function Icon({ name, size = "m", className = "", style }: IconProps) {
  const sizeClass = size === "m" ? "" : size;
  return (
    <svg
      className={`ic ${sizeClass} ${className}`.trim()}
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={style}
    >
      {PATHS[name]}
    </svg>
  );
}
