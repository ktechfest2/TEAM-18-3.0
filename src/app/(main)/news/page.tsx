import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { routes } from "@/lib/routes";
import { sampleNews } from "@/lib/sample-news";
import { NewsFilters } from "./NewsFilters";

export const metadata: Metadata = { title: "News" };

// Screen 20 · News centre
// TODO: search and filters should query the news API.
export default function NewsPage() {
  const [featured, ...rest] = sampleNews;

  return (
    <>
      <header className="top">
        <h1 className="t-title" style={{ fontSize: 20 }}>News</h1>
        <Link className="ibtn" href={routes.notifications} aria-label="Notifications">
          <Icon name="bell" />
          <span className="dot" />
        </Link>
      </header>

      <div style={{ padding: "0 20px 12px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ position: "relative" }}>
          <Icon name="search" size="s" style={{ position: "absolute", left: 14, top: 13, color: "var(--muted)" }} />
          <input
            className="inp"
            type="search"
            aria-label="Search news"
            placeholder="Search updates, schedules, guides"
            style={{ paddingLeft: 42, height: 44 }}
          />
        </div>
        <NewsFilters />
      </div>

      <main className="content" style={{ gap: 12 }}>
        {/* Featured story */}
        <Link
          className="card"
          href={routes.news.article(featured.id)}
          style={{ padding: 0, overflow: "hidden", textDecoration: "none", color: "var(--ink)" }}
        >
          <div className="img" style={{ height: 132, borderRadius: 0 }}>Story image</div>
          <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 6 }}>
            <div className="row" style={{ gap: 6 }}>
              <StatusBadge status={featured.label.status} label={featured.label.text} />
              <span className="sm">{featured.source} · {featured.time}</span>
            </div>
            <p className="h3" style={{ fontSize: 16, lineHeight: 1.3 }}>{featured.title}</p>
          </div>
        </Link>

        {/* Other stories */}
        <div className="card" style={{ padding: "2px 14px" }}>
          {rest.map((item) => (
            <Link key={item.id} className="li" href={routes.news.article(item.id)}>
              <span className="grow" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span className="row" style={{ gap: 6 }}>
                  <StatusBadge status={item.label.status} label={item.label.text} />
                  <span className="sm">{item.source} · {item.time}</span>
                </span>
                <span className="h3" style={{ fontSize: 14 }}>{item.title}</span>
              </span>
              <span className="img" style={{ width: 64, height: 64, borderRadius: 10, flexShrink: 0 }} />
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
