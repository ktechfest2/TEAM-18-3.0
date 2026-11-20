import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { SegmentedTabs } from "@/components/ui/SegmentedTabs";
import { routes } from "@/lib/routes";
import { sampleNational as stats } from "@/lib/sample-stats";
import { STATS_TABS } from "./stats-tabs";

export const metadata: Metadata = { title: "Leaderboard" };

// Screen 13 · National leaderboard
export default function NationalLeaderboardPage() {
  return (
    <>
      <header className="top">
        <h1 className="t-title" style={{ fontSize: 20 }}>Leaderboard</h1>
        <span className="badge b-sub">
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--green)" }} />
          {stats.updated}
        </span>
      </header>

      <div style={{ padding: "0 20px 12px" }}>
        <SegmentedTabs segments={STATS_TABS} activeHref={routes.stats.national} />
      </div>

      <main className="content" style={{ gap: 14 }}>
        <div className="grid3" style={{ gap: 8 }}>
          <StatCard label="Reports" value={stats.reports} />
          <StatCard label="PUs represented" value={stats.unitsRepresented} />
          <StatCard label="States" value={stats.statesReporting} />
        </div>

        {/* Polling unit result status — stacked bar */}
        <section className="card" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="between">
            <h2 className="h3">Polling unit result status</h2>
            <span className="sm">{stats.totalUnits}</span>
          </div>
          <div style={{ display: "flex", height: 14, borderRadius: 99, overflow: "hidden", gap: 2 }}>
            {stats.resultStatus.map((s) => (
              <div key={s.label} style={{ width: `${s.percent}%`, background: s.color }} />
            ))}
            <div style={{ flex: 1, background: "#E6EAE5" }} />
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", fontSize: 12, color: "var(--muted)", fontWeight: 600 }}>
            {stats.resultStatus.map((s) => (
              <span key={s.label} className="row" style={{ gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: s.color }} />
                {s.label} {s.count}
              </span>
            ))}
          </div>
        </section>

        {/* Participation by state */}
        <section className="card" style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="between">
            <h2 className="h3">Participation by state</h2>
            <span className="sm">Reports / registered</span>
          </div>
          <ol style={{ display: "flex", flexDirection: "column", gap: 11, margin: 0, padding: 0, listStyle: "none" }}>
            {stats.topStates.map((state, index) => (
              <li
                key={index}
                style={{ display: "grid", gridTemplateColumns: "18px 70px 1fr 40px", gap: 8, alignItems: "center", fontSize: 13 }}
              >
                <span style={{ fontWeight: 800, color: index < 3 ? "var(--green)" : "var(--muted)" }}>{index + 1}</span>
                <span style={{ fontWeight: 600 }}>{state.name}</span>
                <div className="track">
                  <div className="fill" style={{ width: `${state.percent * 2}%` }} />
                </div>
                <span style={{ fontWeight: 700, textAlign: "right" }}>{state.percent}%</span>
              </li>
            ))}
          </ol>
          {/* TODO: page listing all 37 states */}
          <a className="link" href="#" style={{ fontSize: 13 }}>
            View all 37
          </a>
        </section>

        {/* Upsell for detailed charts (Standard plan) */}
        <div className="row" style={{ padding: "12px 14px", borderRadius: 14, border: "1px dashed #AEB7B0", background: "#fff" }}>
          <Icon name="lock" size="s" style={{ color: "var(--muted)" }} />
          <span className="grow sm" style={{ color: "var(--ink)" }}>
            Detailed LGA &amp; ward charts on <strong>Standard</strong>
          </span>
          <Link className="link" href={routes.plans} style={{ fontSize: 13 }}>
            Upgrade
          </Link>
        </div>
      </main>
    </>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="card" style={{ padding: 12 }}>
      <p className="sm" style={{ fontSize: 11.5 }}>{label}</p>
      <p className="n" style={{ fontSize: 19 }}>{value}</p>
    </div>
  );
}
