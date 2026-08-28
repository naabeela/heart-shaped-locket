import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Page, Title } from "@/components/study/Page";
import { Photo } from "@/components/study/Photo";
import { PHOTOS } from "@/lib/photos";
import { cn } from "@/lib/utils";
import { readUnlocked } from "@/lib/experiment";

export const Route = createFileRoute("/theory")({
  head: () => ({
    meta: [
      { title: "A Theory of You — Chapter 07" },
      {
        name: "description",
        content:
          "An unfinished model of Chalika Azka Feirazy based on three months of observation.",
      },
      { property: "og:title", content: "A Theory of You" },
      { property: "og:description", content: "Abstract, hypothesis, correlations, anomalies, limitations." },
    ],
  }),
  component: Theory,
});

const SECTIONS: Array<{ id: string; label: string; body: string[]; tone?: "mono" }> = [
  {
    id: "abstract",
    label: "Abstract",
    body: [
      "Chalika Azka Feirazy appears to be a person whose emotional sensitivity is not merely a vulnerability but one of the primary mechanisms through which she understands other people. The same receptivity that makes her easy to affect is what makes her unusually accurate about what is happening inside a room.",
      "This paper proposes that most apparent inconsistencies in the subject resolve cleanly once emotional safety is introduced as the governing variable. Very little of her behaviour is random. Almost all of it is responsive.",
    ],
  },
  {
    id: "hypothesis",
    label: "Hypothesis",
    body: [
      "The more emotionally safe she feels, the more direct and articulate she becomes.",
      "Corollary: attempts to improve her communication by requesting better communication are largely ineffective. Attempts to improve the conditions around the communication are highly effective. The skill was never missing. It was suppressed by threat forecasting.",
    ],
  },
  {
    id: "observations",
    label: "Observations",
    body: [
      "O1 — When anxious, she may protect the relationship by hiding parts of herself, ironically making the relationship harder to understand and therefore less safe, which increases the hiding.",
      "O2 — She solves other people's emotional problems at roughly three times the speed she solves her own, using the same reasoning.",
      "O3 — Her stated needs and her actual needs diverge most when she believes the actual need would inconvenience someone.",
      "O4 — Rest, food, and sleep are treated as rewards contingent on productivity rather than inputs required for it. The model predicts, correctly, that under deadline pressure the inputs are cut first.",
      "O5 — When she is prompted gently rather than pushed, disclosure rises sharply within about two exchanges.",
    ],
  },
  {
    id: "variables",
    label: "Variables",
    body: [
      "Independent: safety, rest, pressure, tone of the other party, time available.",
      "Dependent: directness, self-advocacy, accuracy in defining a problem, willingness to be helped.",
      "Confounding: love. She will override almost any of the above if she believes someone she loves needs her to.",
    ],
  },
  {
    id: "correlations",
    label: "Correlations",
    tone: "mono",
    body: [
      "Self-protection ↑   →   Communication ↓",
      "Safety ↑            →   Directness ↑↑",
      "Pressure ↑          →   Problem definition ↓",
      "Being validated ↑   →   Self-solving ↑ (within minutes)",
      "Perceived burden ↑  →   Disclosure ↓↓",
      "Rest ↑              →   Firmness ↑",
    ],
  },
  {
    id: "anomalies",
    label: "Anomalies",
    body: [
      "A1 — Occasionally she is completely direct while under heavy pressure, with no apparent safety input. The model does not predict this. It happens most often when someone she loves is being treated unfairly, which suggests a second, stronger drive the current framework hasn't captured.",
      "A2 — Sometimes she takes a considered, courageous action in exactly the area she claims to be worst at, without announcing it. The model calls this an outlier. I suspect the model is simply behind.",
      "A3 — Her humour arrives at statistically improbable moments and is almost always correct about the mood. No mechanism proposed.",
      "These anomalies are the most important section in the paper. They are the evidence that the subject exceeds the study.",
    ],
  },
  {
    id: "limitations",
    label: "Limitations",
    body: [
      "The observer is not neutral. He is in love with the subject and has a documented tendency to interpret ambiguous data generously.",
      "The sample period is three months, which is short, and includes an internship and a thesis, meaning the subject was observed largely under load. A rested baseline remains under-sampled.",
      "The observer's own behaviour is part of the environment being measured. Several observations about her communication are, in fairness, partially observations about his tone.",
    ],
  },
  {
    id: "conclusion",
    label: "Conclusion",
    body: [
      "The subject is not a difficult person to understand. She is a person who has learned to make herself smaller in the presence of possible conflict, and who becomes extraordinarily clear the moment that possibility is removed.",
      "The most efficient intervention available to the observer is not advice. It is consistency of tone, patience, and asking twice.",
    ],
  },
  {
    id: "future",
    label: "Future research",
    body: [
      "Month 04 onward: observe subject in conditions of low deadline pressure, which have not yet occurred during the study period.",
      "Investigate whether self-directed care increases when it is treated as ordinary rather than as an achievement.",
      "Continue indefinitely. There is no version of this paper that gets finished, and the researcher has stopped considering that a flaw.",
    ],
  },
];

function Theory() {
  const [unlocked, setUnlocked] = useState(0);
  const [active, setActive] = useState("abstract");
  useEffect(() => setUnlocked(readUnlocked().length), []);

  const s = SECTIONS.find((x) => x.id === active) ?? SECTIONS[0]!;

  return (
    <Page>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end">
        <Title n="07" sub="An unfinished model based on three months of observation.">
          A theory
          <br />
          of you
        </Title>
        <Photo
          {...PHOTOS.theory}
          index="PLATE IV"
          tilt={-1.6}
          className="mx-auto w-full max-w-[340px]"
          imgClassName="aspect-[3/4]"
        />
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-navy/30 py-3">
        <span className="meta text-navy">PAPER 01 · DRAFT</span>
        <span className="meta text-muted-foreground">AUTHOR · ONE PERSON, PAYING ATTENTION</span>
        <span className="meta text-madder">
          FIELD DATA FROM EXPERIMENT · {String(unlocked).padStart(2, "0")} / 07
        </span>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <nav className="lg:sticky lg:top-24 lg:self-start">
          <ol className="flex gap-2 overflow-x-auto pb-2 lg:block lg:overflow-visible">
            {SECTIONS.map((sec, i) => (
              <li key={sec.id} className="shrink-0 lg:mb-1">
                <button
                  onClick={() => setActive(sec.id)}
                  className={cn(
                    "meta w-full px-3 py-2 text-left transition-colors",
                    active === sec.id
                      ? "bg-navy text-paper"
                      : "text-muted-foreground hover:text-navy",
                  )}
                >
                  {String(i + 1).padStart(2, "0")} {sec.label}
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <article className="border border-navy/40 bg-card p-6 sm:p-10 card-paper">
          <p className="meta text-navy">§ {s.label.toUpperCase()}</p>
          <h2 className="display mt-3 text-[clamp(1.9rem,6vw,3.2rem)]">{s.label}</h2>
          <div className="mt-7 space-y-5">
            {s.body.map((p, i) => (
              <p
                key={i}
                className={cn(
                  "rise-in",
                  s.tone === "mono"
                    ? "whitespace-pre font-mono text-[0.78rem] leading-relaxed text-forest sm:text-sm"
                    : "text-[0.98rem] leading-[1.85] text-ink/90",
                )}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {p}
              </p>
            ))}
          </div>
          {s.id === "correlations" ? (
            <p className="mt-8 border-t border-border pt-6 text-[0.98rem] leading-[1.85]">
              The human translation of the second line: when you stop bracing for impact, you say
              what you mean in half the words. I've seen it happen inside a single conversation. It
              is the most hopeful data in this entire file.
            </p>
          ) : null}
          {s.id === "anomalies" ? (
            <p className="hand mt-8">the outliers are my favourite part of you</p>
          ) : null}
        </article>
      </div>
    </Page>
  );
}
