import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";
import {
  sampleAdminStats,
  sampleAiSummary,
  sampleAuditLog,
  samplePendingEvents,
  sampleQueue,
} from "@/lib/sample-admin";
import styles from "./admin.module.css";
import { AdminMobileChrome } from "./AdminMobileChrome";
import { AdminSidebar } from "./AdminSidebar";
import { ReviewQueue } from "./ReviewQueue";

export const metadata: Metadata = { title: "Admin console" };

// Screen 33 · Admin dashboard (web) — and screen 34 on phones (AdminMobileChrome)
// TODO: restrict to signed-in staff with role-based access (feature doc, section 12).
export default function AdminPage() {
  return (
    <div className={styles.shell}>
      <AdminSidebar />
      <AdminMobileChrome />

      <main className={styles.main}>
        <header className={styles.desktopHeader} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16 }}>
          <div style={{ flex: "1 1 260px" }}>
            <p className="lbl">[Election name] · Election day</p>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em" }}>Moderation overview</h1>
          </div>
          <div style={{ position: "relative", flex: "0 1 300px", minWidth: 200 }}>
            <Icon name="search" size="s" style={{ position: "absolute", left: 14, top: 13, color: "var(--muted)" }} />
            <input
              className="inp"
              type="search"
              aria-label="Search reports, PUs, users"
              placeholder="Search PU code, report ID, user"
              style={{ paddingLeft: 42, height: 44 }}
            />
          </div>
          <span className="badge b-off" style={{ height: 30, padding: "0 12px" }}>[Role]</span>
        </header>

        <div className={styles.statGrid}>
          {sampleAdminStats.map((stat) => (
            <div key={stat.label} className="card" style={{ padding: 14 }}>
              <p className="sm">{stat.label}</p>
              <p className="n" style={{ fontSize: 26 }}>{stat.value}</p>
              <p className="sm" style={stat.tone ? { color: stat.tone, fontWeight: 700 } : undefined}>{stat.note}</p>
            </div>
          ))}
        </div>

        <div className={styles.columns}>
          <ReviewQueue items={sampleQueue} />

          <div className={styles.sideColumn}>
            {/* AI-assisted analysis (feature doc 6.1) — supports, never replaces, human review */}
            <section className="card" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div className="row" style={{ gap: 10 }}>
                <span className="tile t-b" style={{ width: 36, height: 36 }}>
                  <Icon name="sparkle" size="s" />
                </span>
                <h2 className="h3" style={{ flex: 1 }}>{sampleAiSummary.title}</h2>
              </div>
              <p className="body" style={{ fontSize: 13.5 }}>{sampleAiSummary.text}</p>
              <div className="warn" style={{ fontSize: 12 }}>
                <span>Thresholds trigger review only. They never establish an official result.</span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn sm" type="button" style={{ flex: 1 }}>Mark verified</button>
                <button className="btn sm ghost" type="button" style={{ flex: 1 }}>Mark disputed</button>
              </div>
            </section>

            <section className="card" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div className="between" style={{ marginBottom: 6 }}>
                <h2 className="h3">Events pending approval</h2>
                <span className="badge b-rev">{samplePendingEvents.count}</span>
              </div>
              {samplePendingEvents.items.map((event, index) => (
                <div key={index} className="li" style={{ padding: "10px 0" }}>
                  <span className="grow">
                    <span className="h3" style={{ display: "block", fontSize: 14 }}>{event.title}</span>
                    <span className="sm">{event.meta}</span>
                  </span>
                  <button className="chip" type="button" style={{ height: 32 }}>Review</button>
                </div>
              ))}
            </section>

            <section className="card" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <h2 className="h3">Audit log</h2>
              {sampleAuditLog.map((entry, index) => (
                <p key={index} className="sm">
                  <strong style={{ color: "var(--ink)" }}>{entry.who}</strong> {entry.what} · {entry.when}
                </p>
              ))}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
