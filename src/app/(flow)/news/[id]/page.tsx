import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Icon } from "@/components/ui/Icon";
import { ShareButton } from "@/components/ui/ShareButton";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { routes } from "@/lib/routes";
import { findNews, sampleNews } from "@/lib/sample-news";

export const metadata: Metadata = { title: "Article" };

// Prerender the sample articles at build time.
export function generateStaticParams() {
  return sampleNews.map((item) => ({ id: item.id }));
}

// Screen 21 · Article
export default function ArticlePage({ params }: PageProps<"/news/[id]">) {
  return (
    <div style={{ background: "#fff", flex: 1, display: "flex", flexDirection: "column" }}>
      {/* The article depends on the URL, so it loads inside Suspense */}
      <Suspense fallback={<div className="img" style={{ height: 250, borderRadius: 0 }} />}>
        {params.then(({ id }) => (
          <Article id={id} />
        ))}
      </Suspense>
    </div>
  );
}

const OTHER_LANGUAGES = ["Pidgin", "Yorùbá", "Hausa", "Igbo"];

function Article({ id }: { id: string }) {
  const article = findNews(id);
  const isOfficial = article.label.status === "official";

  return (
    <>
      <div className="img" style={{ height: 250, borderRadius: 0, flexShrink: 0, position: "relative" }}>
        Story image
        <Link className="ibtn" href={routes.news.list} aria-label="Back" style={{ position: "absolute", top: 18, left: 20 }}>
          <Icon name="back" />
        </Link>
        <ShareButton title={article.title} style={{ position: "absolute", top: 18, right: 20 }} />
      </div>

      <main className="content" style={{ paddingTop: 20, gap: 14 }}>
        <div className="row" style={{ gap: 8, flexWrap: "wrap" }}>
          <StatusBadge status={article.label.status} label={article.label.text} />
          {article.tags.map((tag) => (
            <span key={tag} className="badge b-sub">{tag}</span>
          ))}
        </div>

        <h1 className="h1" style={{ fontSize: 23 }}>{article.title}</h1>

        <div className="row" style={{ padding: "10px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
          <span className="tile t-b" style={{ width: 36, height: 36, fontSize: 12, fontWeight: 800 }}>
            {article.source.slice(0, 2).toUpperCase()}
          </span>
          <span className="grow">
            <span className="h3" style={{ display: "block", fontSize: 14 }}>{article.source}</span>
            <span className="sm">Published {article.time}</span>
          </span>
          {/* TODO: link to the original source */}
          <a className="link" href="#" style={{ fontSize: 13 }}>Source</a>
        </div>

        {isOfficial && (
          <div className="priv" style={{ background: "var(--blue-t)", color: "#1A43B8" }}>
            <Icon name="shieldCheck" size="s" />
            <span>
              <strong>Official source.</strong> Content republished from the issuing authority and checked by the
              EYENEC news desk.
            </span>
          </div>
        )}

        {article.body.map((paragraph, index) => (
          <p key={index} style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65, color: "#23302A" }}>
            {paragraph}
          </p>
        ))}

        {/* TODO: switch to a translated version of the article */}
        <div className="row" style={{ gap: 8, marginTop: 4, flexWrap: "wrap" }}>
          <span className="sm" style={{ fontWeight: 600 }}>Read in:</span>
          {OTHER_LANGUAGES.map((language) => (
            <button key={language} className="chip" type="button" style={{ height: 30 }}>
              {language}
            </button>
          ))}
        </div>
      </main>
    </>
  );
}
