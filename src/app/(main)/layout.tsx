import { TabBar } from "@/components/layout/TabBar";

// Layout for the main app screens (Home, Stats, Report, News, Profile):
// the page content plus the bottom tab bar.
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="scr">
      {children}
      <TabBar />
    </div>
  );
}
