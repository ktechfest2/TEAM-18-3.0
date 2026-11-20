"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { routes } from "@/lib/routes";
import { sampleElection } from "@/lib/sample-data";

type Answer = "yes" | "no";

const OPTIONS: { value: Answer; title: string; hint: string; icon: IconName; tone: string }[] = [
  { value: "yes", title: "Yes, I voted", hint: "Next, confirm your polling unit", icon: "check", tone: "t-g" },
  { value: "no", title: "No, not yet", hint: "We'll help you find your polling unit", icon: "close", tone: "t-n" },
];

// Body of screen 09. "Yes" continues the report; "No" shows a reminder instead.
export function VotedChoice() {
  const [answer, setAnswer] = useState<Answer>("yes");

  return (
    <>
      <main className="content" style={{ gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 8 }}>
          <span className="chip" style={{ alignSelf: "flex-start", height: 30, fontSize: 12 }}>
            <Icon name="calendar" size="s" style={{ width: 16, height: 16 }} />
            {sampleElection.name}
          </span>
          <h1 className="h1" style={{ fontSize: 30 }}>Have you voted in this election?</h1>
          <p className="body">We only record that you took part — never who you voted for.</p>
        </div>

        <div role="radiogroup" aria-label="Have you voted?" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
                  <span style={{ fontSize: 18, fontWeight: 800 }}>{option.title}</span>
                  <span className="sm">{option.hint}</span>
                </span>
                <span className="radio" />
              </button>
            );
          })}
        </div>

        {answer === "no" && (
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p className="h3">There&apos;s still time</p>
            <p className="body">
              Polls close at {sampleElection.pollsClose}. If you&apos;re in the queue by then, you can still vote.
            </p>
            <Link className="link" href={routes.profile}>
              See my polling unit →
            </Link>
          </div>
        )}

        <div className="priv" style={{ marginTop: "auto" }}>
          <Icon name="shieldCheck" size="s" />
          <span>
            Participation reports are counted anonymously in aggregated statistics. They are not votes and are never
            treated as results.
          </span>
        </div>
      </main>

      <div className="foot">
        {answer === "yes" ? (
          <Link className="btn" href={routes.report.votedLocation}>
            Continue
          </Link>
        ) : (
          <Link className="btn ghost" href={routes.home}>
            Back to home
          </Link>
        )}
      </div>
    </>
  );
}
