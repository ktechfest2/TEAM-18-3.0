"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { useT, type MessageKey } from "@/i18n";
import { routes } from "@/lib/routes";
import { sampleElection } from "@/lib/sample-data";

type Answer = "yes" | "no";

const OPTIONS: { value: Answer; title: MessageKey; hint: MessageKey; icon: IconName; tone: string }[] = [
  { value: "yes", title: "voted.yes", hint: "voted.yesHint", icon: "check", tone: "t-g" },
  { value: "no", title: "voted.no", hint: "voted.noHint", icon: "close", tone: "t-n" },
];

// Body of screen 09. "Yes" continues the report; "No" shows a reminder instead.
export function VotedChoice() {
  const [answer, setAnswer] = useState<Answer>("yes");
  const t = useT();

  return (
    <>
      <main className="content" style={{ gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 8 }}>
          <span className="chip" style={{ alignSelf: "flex-start", height: 30, fontSize: 12 }}>
            <Icon name="calendar" size="s" style={{ width: 16, height: 16 }} />
            {sampleElection.name}
          </span>
          <h1 className="h1" style={{ fontSize: 30 }}>{t("voted.title")}</h1>
          <p className="body">{t("voted.body")}</p>
        </div>

        <div role="radiogroup" aria-label={t("voted.title")} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {OPTIONS.map((option) => {
            const isSelected = option.value === answer;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                className={isSelected ? "opt on" : "opt"}
                onClick={() => setAnswer(option.value)}
                style={{ padding: 20 }}
              >
                <span className={`tile ${option.tone}`}>
                  <Icon name={option.icon} />
                </span>
                <span className="grow" style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontSize: 18, fontWeight: 800 }}>{t(option.title)}</span>
                  <span className="sm">{t(option.hint)}</span>
                </span>
                <span className="radio" />
              </button>
            );
          })}
        </div>

        {answer === "no" && (
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p className="h3">{t("voted.stillTime")}</p>
            <p className="body">
              {t("voted.stillTimeBody", { time: sampleElection.pollsClose })}
            </p>
            <Link className="link" href={routes.profile}>
              {t("voted.seeMyUnit")}
            </Link>
          </div>
        )}

        <div className="priv" style={{ marginTop: "auto" }}>
          <Icon name="shieldCheck" size="s" />
          <span>
            {t("voted.privacy")}
          </span>
        </div>
      </main>

      <div className="foot">
        {answer === "yes" ? (
          <Link className="btn" href={routes.report.votedLocation}>
            {t("common.continue")}
          </Link>
        ) : (
          <Link className="btn ghost" href={routes.home}>
            {t("common.backToHome")}
          </Link>
        )}
      </div>
    </>
  );
}
