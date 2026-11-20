import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { routes } from "@/lib/routes";
import { ADMIN_NAV } from "@/lib/sample-admin";
import styles from "./admin.module.css";

// Navigation links shared by the desktop sidebar and the phone menu.
// TODO: each section needs its own page; only Overview exists so far.
export function AdminNavLinks() {
  return (
    <nav aria-label="Admin sections" style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {ADMIN_NAV.map((item, index) => (
        <a
          key={item.label}
          href="#"
          className={index === 0 ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}
          aria-current={index === 0 ? "page" : undefined}
        >
          <Icon name={item.icon} size="s" />
          <span style={{ flex: 1 }}>{item.label}</span>
          {item.count && (
            <span className="badge" style={{ background: "var(--amber)", color: "var(--ink)", height: 22 }}>
              {item.count}
            </span>
          )}
        </a>
      ))}

      {/* Way back to the citizen app (the installed app has no address bar) */}
      <Link href={routes.profile} className={styles.navLink} style={{ marginTop: 12, borderTop: "1px solid rgba(255,255,255,0.12)", borderRadius: 0, paddingTop: 12 }}>
        <Icon name="back" size="s" />
        <span style={{ flex: 1 }}>Back to app</span>
      </Link>
    </nav>
  );
}

export function AdminLogo() {
  return (
    <div className="logo" style={{ padding: "0 8px" }}>
      <span className="mark" style={{ background: "var(--amber)", color: "var(--ink)" }}>
        <Icon name="eye" />
      </span>
      <span style={{ display: "flex", flexDirection: "column" }}>
        <span className="word" style={{ fontSize: 17 }}>EYENEC</span>
        <span style={{ fontSize: 12, color: "#A9B8AF" }}>Admin console</span>
      </span>
    </div>
  );
}

// Dark sidebar shown on wide screens (screen 33).
export function AdminSidebar() {
  return (
    <aside className={styles.sidebar}>
      <AdminLogo />
      <AdminNavLinks />
    </aside>
  );
}
