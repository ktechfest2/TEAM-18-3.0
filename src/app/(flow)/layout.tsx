// Step-by-step flows (voting, results, incidents, checkout…): plain screen shell, no tab bar.
export default function FlowLayout({ children }: { children: React.ReactNode }) {
  return <div className="scr">{children}</div>;
}
