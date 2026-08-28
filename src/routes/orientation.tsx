import { createFileRoute } from "@tanstack/react-router";
import { Page, Title } from "@/components/study/Page";

export const Route = createFileRoute("/orientation")({
  head: () => ({
    meta: [
      { title: "Orientation — The Way I See You" },
      {
        name: "description",
        content:
          "Subject: Chalika Azka Feirazy. Observation period: 03 months. Conclusion: premature.",
      },
      { property: "og:title", content: "Orientation" },
      { property: "og:description", content: "Subject, period, status, and everything not yet known." },
    ],
  }),
  component: Orientation,
});

const FIELDS: Array<[string, string]> = [
  ["SUBJECT", "Chalika Azka Feirazy"],
  ["OBSERVATION PERIOD", "03 MONTHS"],
  ["STATUS", "ONGOING"],
  ["KNOWN VARIABLES", "Not enough"],
  ["UNKNOWN VARIABLES", "A lot"],
  ["CONFIDENCE", "Increasing"],
  ["CONCLUSION", "Premature"],
  ["OBSERVER", "Nabil"],
];

function Orientation() {
  return (
    <Page tone="field">
      <Title n="02" sub="Before the study begins, the terms of the study.">
        Orientation
      </Title>

      <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="relative border border-ink/70 bg-card p-5 sm:p-7 card-paper">
          <div className="meta absolute -top-3 left-5 bg-paper px-2 text-madder">RECORD HEADER</div>
          <dl className="mt-2 divide-y divide-border">
            {FIELDS.map(([k, v], i) => (
              <div
                key={k}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 py-3.5 rise-in"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <dt className="meta min-w-0 text-muted-foreground">{k}</dt>
                <dd
                  className={
                    k === "SUBJECT"
                      ? "display text-right text-xl text-burgundy sm:text-2xl"
                      : "font-mono text-right text-sm"
                  }
                >
                  {v}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 flex items-end justify-between gap-4">
            <p className="hand">filed by Nabil, who keeps checking his notes</p>
            <div className="shrink-0 rotate-[-6deg] border-2 border-madder/70 px-3 py-1">
              <span className="meta text-madder/80">UNFINISHED</span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <p className="prose-letter">
            I could write a thousand words about why I love you and still miss the smallest things.
            The ones I'd miss are probably the ones that matter most: the half-second before you
            answer a question you already know the answer to, the way your typing speed drops when
            something has actually landed.
          </p>
          <div className="h-px w-24 bg-madder/50" />
          <p className="prose-letter">
            The problem with trying to understand a person is that people aren't static systems. A
            fact about you on a Tuesday can quietly expire by Friday, and the honest thing to do is
            keep re-reading instead of pretending the first reading was final.
          </p>
          <p className="display text-3xl leading-tight sm:text-4xl">
            You change.
            <br />
            I change.
            <br />
            The way I understand you changes.
          </p>
          <p className="prose-letter">
            So this isn't a final description. It is simply the version of you I have been lucky
            enough to see so far, written down carefully in case it's useful to you, and kept
            deliberately open in case you turn out to be different tomorrow.
          </p>
          <p className="meta text-muted-foreground">
            NOTE — Nothing in this file is a diagnosis. It is one person's attention, written down.
          </p>
        </div>
      </div>
    </Page>
  );
}
