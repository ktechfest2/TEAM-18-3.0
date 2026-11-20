import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";
import { SegmentedTabs } from "@/components/ui/SegmentedTabs";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { routes } from "@/lib/routes";
import { sampleWardStats as ward } from "@/lib/sample-stats";
import { STATS_TABS } from "../stats-tabs";

export const metadata: Metadata = { title: "Location leaderboard" };

// Shades of blue for official party results (never used for citizen reports).
const PARTY_COLORS = ["#1D4ED8", "#5B7FE0", "#9AB0EE", "#C3D0F5"];

// Screen 14 · Location leaderboard (Standard plan feature)
// TODO: the location chips should open State / LGA / Ward / PU pickers.
export default function LocationLeaderboardPage() {
  return (
    <>
      <header className="top">
        <h1 className="t-title" style={{ fontSize: 20 }}>Leaderboard</h1>
        <span className="badge b-ver">Standard</span>
      </header>

      <div style={{ padding: "0 20px 12px", display: "flex", flexDirection: "column", gap: 12 }}>
        <SegmentedTabs segments={STATS_TABS} activeHref={routes.stats.location} />
        <div className="chips">
          {ward.path.map((level, index) => (
            <button key={index} type="button" className={index === 2 ? "chip on" : "chip"}>
              {level}
              <Icon name="chevronDown" size="s" style={{ width: 14, height: 14 }} />
            </button>
          ))}
        </div>
      </div>

      <main className="content" style={{ gap: 14 }}>
        {/* Ward summary */}
        <section className="card" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="between">
            <div>
              <p className="lbl">Ward</p>
              <h2 className="h2">{ward.wardName}</h2>
            </div>
            <span className="tile t-g">
              <Icon name="pin" />
            </span>
          </div>
          <div className="grid3" style={{ gap: 8 }}>
            <Figure label="Reports" value={ward.reports} />
            <Figure label="PUs reporting" value={ward.unitsReporting} />
            <Figure label="Verified PUs" value={ward.verifiedUnits} />
          </div>
        </section>

        {/* Official results — only from the official dataset */}
        <section className="card" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div className="between">
            <h2 className="h3">Official results</h2>
            <span className="badge b-off">{ward.officialResults.coverage}</span>
          </div>
          {ward.officialResults.parties.map((party, index) => (
            <div
              key={party.name}
              style={{ display: "grid", gridTemplateColumns: "62px 1fr 48px", gap: 8, alignItems: "center", fontSize: 13 }}
            >
              <span style={{ fontWeight: 700 }}>{party.name}</span>
              <div className="track" style={{ height: 10 }}>
                <div className="fill" style={{ width: `${party.percent}%`, background: PARTY_COLORS[index] }} />
              </div>
              <span style={{ textAlign: "right", fontWeight: 700 }}>{party.votes}</span>
            </div>
          ))}
          <p className="sm" style={{ fontSize: 11.5 }}>
            {ward.officialResults.source} Citizen participation reports are not votes and are not shown here.
          </p>
        </section>

        {/* Compare polling units */}
        <div className="between">
          <h2 className="h3">Compare polling units</h2>
          <button type="button" className="link" style={{ fontSize: 13, background: "none", border: 0, cursor: "pointer" }}>
            Sort: reports
          </button>
        </div>
        <div className="card" style={{ padding: "2px 14px" }}>
          {ward.units.map((unit) => (
            <div key={unit.name} className="li">
              <span className="grow">
                <span className="h3" style={{ display: "block", fontSize: 14 }}>{unit.name}</span>
                <span className="sm">{unit.reports}</span>
              </span>
              <StatusBadge status={unit.status} />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

function Figure({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="sm">{label}</p>
      <p className="n" style={{ fontSize: 20 }}>{value}</p>
    </div>
  );
}
