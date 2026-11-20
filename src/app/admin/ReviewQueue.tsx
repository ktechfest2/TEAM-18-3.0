"use client";

import { useState } from "react";
import { FilterChips } from "@/components/ui/FilterChips";
import { Icon } from "@/components/ui/Icon";
import type { QueueItem, QueueKind } from "@/lib/sample-admin";
import styles from "./admin.module.css";

const FILTERS: Record<string, QueueKind | "all"> = {
  All: "all",
  Results: "results",
  Incidents: "incidents",
  Conflicts: "conflicts",
};

// Reports waiting for a moderator. A table on wide screens, cards on phones.
// TODO: "Review" / "Open" should open the report with its evidence.
export function ReviewQueue({ items }: { items: QueueItem[] }) {
  const [filter, setFilter] = useState("All");
  const kind = FILTERS[filter];
  const visible = kind === "all" ? items : items.filter((item) => item.kind === kind);

  return (
    <section className={`card ${styles.queue}`}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, padding: "16px 18px", borderBottom: "1px solid var(--line)" }}>
        <h2 className="h2" style={{ flex: 1 }}>Review queue</h2>
        <FilterChips label="Filter review queue" options={Object.keys(FILTERS)} value={filter} onChange={setFilter} />
      </div>

      {visible.length === 0 && (
        <p className="body" style={{ textAlign: "center", padding: "20px 0" }}>Nothing in this filter right now.</p>
      )}

      {/* Wide screens: table */}
      <div className={styles.queueTable} style={{ overflowX: "auto" }}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Report</th>
              <th scope="col">Polling unit</th>
              <th scope="col">Similar</th>
              <th scope="col">AI flag</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.id}</strong>
                  <br />
                  <span className="sm">{item.meta}</span>
                </td>
                <td>
                  {item.puCode}
                  <br />
                  <span className="sm">{item.puArea}</span>
                </td>
                <td style={{ fontWeight: 700 }}>{item.similar}</td>
                <td><span className={`badge ${item.flag.badge}`}>{item.flag.label}</span></td>
                <td><span className={`badge ${item.status.badge}`}>{item.status.label}</span></td>
                <td>
                  <ActionButton item={item} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phones: cards */}
      <div className={styles.queueCards}>
        {visible.map((item) => (
          <div key={item.id} className="card" style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            <div className="between">
              <span className="h3" style={{ fontSize: 14 }}>{item.id}</span>
              <span className={`badge ${item.status.badge}`}>{item.status.label}</span>
            </div>
            <div className="row" style={{ gap: 10, alignItems: "flex-start" }}>
              <span className={`tile ${item.kind === "incidents" ? "t-r" : "t-b"}`} style={{ width: 36, height: 36, borderRadius: 10 }}>
                <Icon name="pin" size="s" />
              </span>
              <span className="grow">
                <span style={{ display: "block", fontSize: 13.5, fontWeight: 600 }}>{item.puCode} · {item.puArea}</span>
                <span className="sm">{item.meta}</span>
              </span>
            </div>
            <div className="between" style={{ paddingTop: 10, borderTop: "1px solid var(--line)" }}>
              <span className="row" style={{ gap: 6 }}>
                <span className={`badge ${item.flag.badge}`}>{item.flag.label}</span>
                <span className="sm">{item.similar} similar</span>
              </span>
              <ActionButton item={item} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ActionButton({ item }: { item: QueueItem }) {
  return (
    <button className={item.needsAction ? "btn sm" : "btn sm ghost"} type="button" style={{ display: "inline-flex", height: 36 }}>
      {item.needsAction ? "Review" : "Open"}
    </button>
  );
}
