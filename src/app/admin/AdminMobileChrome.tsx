"use client";

import { useState } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import styles from "./admin.module.css";
import { AdminLogo, AdminNavLinks } from "./AdminSidebar";

const TABS: { label: string; icon: IconName }[] = [
  { label: "Overview", icon: "home" },
  { label: "Queue", icon: "document" },
  { label: "Incidents", icon: "alert" },
  { label: "Events", icon: "calendar" },
];

// Phone-only admin header, slide-out menu and bottom tabs (screen 34).
// Hidden on wide screens by admin.module.css.
export function AdminMobileChrome() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className={styles.mobileHeader}>
        <div className="row">
          <button className={`ibtn ${styles.darkIconButton}`} type="button" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
            <Icon name="menu" />
          </button>
          <div className="grow">
            <p style={{ margin: 0, fontSize: 11.5, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#A9B8AF" }}>
              Admin console
            </p>
            <h1 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Moderation overview</h1>
          </div>
          {/* TODO: open a search screen */}
          <button className={`ibtn ${styles.darkIconButton}`} type="button" aria-label="Search">
            <Icon name="search" />
          </button>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <span className="badge" style={{ background: "var(--amber)", color: "var(--ink)" }}>Election day</span>
          <span className="badge" style={{ background: "rgba(255,255,255,0.12)", color: "#fff" }}>[Role]</span>
        </div>
      </header>

      <div className={styles.mobileTabbar}>
        <nav className="tabbar" aria-label="Admin">
          {TABS.map((tab, index) => (
            <a key={tab.label} className={index === 0 ? "tab on" : "tab"} href="#" aria-current={index === 0 ? "page" : undefined}>
              <Icon name={tab.icon} />
              {tab.label}
            </a>
          ))}
          <button className="tab" type="button" onClick={() => setMenuOpen(true)} style={{ border: 0, background: "transparent", fontFamily: "inherit", cursor: "pointer" }}>
            <Icon name="more" />
            More
          </button>
        </nav>
      </div>

      {menuOpen && (
        <div className={styles.drawerBackdrop} role="dialog" aria-modal="true" aria-label="Admin menu">
          <div className={styles.drawer}>
            <div className="row">
              <div className="grow">
                <AdminLogo />
              </div>
              <button className={`ibtn ${styles.darkIconButton}`} type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
                <Icon name="close" />
              </button>
            </div>
            <AdminNavLinks />
          </div>
          {/* Tapping outside the menu closes it */}
          <button type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)} style={{ flex: 1, border: 0, background: "transparent" }} />
        </div>
      )}
    </>
  );
}
