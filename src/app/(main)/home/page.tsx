import type { Metadata } from "next";
import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { T, type MessageKey } from "@/i18n";
import { routes } from "@/lib/routes";
import { FirstName, ShortArea } from "@/components/profile/ProfileText";
import { sampleDashboard as stats, sampleUpdates } from "@/lib/sample-data";

export const metadata: Metadata = { title: "Home" };

const QUICK_LINKS: { href: string; label: MessageKey; icon: IconName; tone: string }[] = [
  { href: routes.stats.national, label: "home.leaderboard", icon: "stats", tone: "t-g" },
  { href: routes.myReports, label: "home.reports", icon: "document", tone: "t-b" },
  { href: routes.report.incident, label: "home.incident", icon: "alert", tone: "t-r" },
  { href: routes.events.list, label: "home.events", icon: "calendar", tone: "t-a" },
];

// Screen 07 · Home dashboard
export default function HomePage() {
  return (
    <>
      <header className="top">
        <div className="logo grow">
          <span className="mark">
            <Icon name="eye" />
          </span>
          <span style={{ display: "flex", flexDirection: "column" }}>
            <span className="word" style={{ fontSize: 17 }}>EYENEC</span>
            <span className="sm" style={{ fontSize: 11.5 }}>
              <T k="home.hi" /> <FirstName /> · <ShortArea />
            </span>
          </span>
        </div>
        <Link className="ibtn" href={routes.notifications} aria-label="Notifications">
          <Icon name="bell" />
          <span className="dot" />
        </Link>
      </header>

      <main className="content" style={{ gap: 14 }}>
        {/* Election-day call to action */}
        <section
          style={{
            background: "var(--green-d)",
            color: "#fff",
            borderRadius: 20,
            padding: 18,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div className="between">
            <span className="badge" style={{ background: "var(--amber)", color: "var(--ink)" }}>
              {stats.electionBadge}
            </span>
            <span style={{ fontSize: 12, color: "#CFE3D8" }}>{stats.pollsClose}</span>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 20, fontWeight: 800 }}><T k="home.haveYouVoted" /></p>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#CFE3D8" }}>
              <T k="home.anonymous" />
            </p>
          </div>
          <Link
            className="btn"
            href={routes.report.voted}
            style={{ background: "#fff", color: "var(--green-d)", height: 46, fontSize: 15 }}
          >
            <T k="home.reportParticipation" />
          </Link>
        </section>

        {/* Headline numbers */}
        <div className="grid2" style={{ gap: 10 }}>
          <div className="card" style={{ padding: 14 }}>
            <p className="sm"><T k="home.participationReports" /></p>
            <p className="n">{stats.participationReports}</p>
            <p className="sm" style={{ color: "var(--green)", fontWeight: 700 }}>{stats.participationChange}</p>
          </div>
          <div className="card" style={{ padding: 14 }}>
            <p className="sm"><T k="home.unitsReporting" /></p>
            <p className="n">{stats.pollingUnitsReporting}</p>
            <p className="sm">{stats.pollingUnitsTotal}</p>
          </div>
          <div className="card" style={{ padding: 14 }}>
            <p className="sm"><T k="home.verifiedUnits" /></p>
            <p className="n">{stats.verifiedUnits}</p>
            <div className="track" style={{ marginTop: 8 }}>
              <div className="fill" style={{ width: `${stats.verifiedPercent}%` }} />
            </div>
          </div>
          <div className="card" style={{ padding: 14 }}>
            <p className="sm"><T k="home.officialUnits" /></p>
            <p className="n">{stats.officialUnits}</p>
            <div className="track" style={{ marginTop: 8 }}>
              <div className="fill" style={{ width: `${stats.officialPercent}%`, background: "var(--blue)" }} />
            </div>
          </div>
        </div>

        {/* Quick links */}
        <nav className="grid3" style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 8 }}>
          {QUICK_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                textDecoration: "none",
                color: "var(--ink)",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              <span className={`tile ${item.tone}`}>
                <Icon name={item.icon} />
              </span>
              <T k={item.label} />
            </Link>
          ))}
        </nav>

        {/* Latest updates */}
        <div className="between">
          <h2 className="h2" style={{ fontSize: 16 }}><T k="home.latestUpdates" /></h2>
          <Link className="link" href={routes.news.list}><T k="home.seeAll" /></Link>
        </div>
        <div className="card" style={{ padding: "2px 14px" }}>
          {sampleUpdates.map((update) => (
            <Link key={update.id} className="li" href={routes.news.article(update.id)}>
              <span className="grow">
                <span style={{ display: "flex", gap: 6, marginBottom: 4 }}>
                  <StatusBadge status={update.status} />
                  <span className="sm" style={{ alignSelf: "center" }}>{update.source}</span>
                </span>
                <span className="h3" style={{ display: "block", fontSize: 14 }}>{update.title}</span>
              </span>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
