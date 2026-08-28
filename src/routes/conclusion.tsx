import { createFileRoute } from "@tanstack/react-router";
import { Page, Title } from "@/components/study/Page";

export const Route = createFileRoute("/conclusion")({
  head: () => ({
    meta: [
      { title: "Conclusion (Provisional) — Chapter 15" },
      {
        name: "description",
        content: "A provisional conclusion to a study of Chalika Azka Feirazy that cannot be concluded.",
      },
      { property: "og:title", content: "Conclusion (Provisional)" },
      { property: "og:description", content: "You are not a problem I want to solve." },
    ],
  }),
  component: Conclusion,
});

const STATUS = [
  ["Model status", "PROVISIONAL"],
  ["Observation window", "THREE MONTHS"],
  ["Confidence", "MODERATE, AND HAPPY TO BE WRONG"],
  ["Known unknowns", "MORE THAN AT THE START"],
  ["Revisions expected", "CONTINUOUS"],
  ["Completion", "NOT APPLICABLE"],
];

function Conclusion() {
  return (
    <Page tone="quiet">
      <Title n="15" sub="Every honest study ends by admitting what it couldn't reach.">
        Conclusion
        <br />
        <span className="text-muted-foreground">(provisional)</span>
      </Title>

      <dl className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2">
        {STATUS.map(([k, v]) => (
          <div key={k} className="bg-paper p-5">
            <dt className="meta text-muted-foreground">{k}</dt>
            <dd className="meta mt-1.5 text-madder">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-16 max-w-[62ch] space-y-6 text-[1rem] leading-[1.95]">
        <p>
          Fourteen chapters ago this was going to be a portrait. Something finished, framed,
          defensible. What it turned into is closer to a set of field notes written by someone who
          kept having to cross things out.
        </p>
        <p>
          I was wrong about the quietness. I was wrong about what the fast answers meant. I was
          wrong, more than once, about which version of you needed something and which one was
          just tired. Every correction made the record better and the conclusion less possible,
          which is a strange thing to be pleased about, and I am pleased about it.
        </p>
        <p>
          What I can state with reasonable confidence: that you are more careful with other people
          than with yourself; that your sensitivity is a competence and not a fault line; that the
          gap between what you know and what you do is closing measurably; that you are, in the
          plainest terms, a good person having a hard year and doing it with more grace than the
          year deserves.
        </p>
        <p>
          What I cannot state: anything about who you will be. That's not a gap in the method. That's
          the subject refusing to hold still, which is the single most encouraging finding in the
          entire document.
        </p>
      </div>

      <div className="mt-16 border-y-2 border-ink py-12">
        <p className="display text-[clamp(2rem,7.5vw,4rem)] leading-[1.08] text-burgundy">
          You are not a problem I want to solve. You are a person I want to keep meeting.
        </p>
      </div>

      <p className="hand mt-10 -rotate-[0.6deg]">
        Chalika Azka Feirazy — there's one page left, and it doesn't behave.
      </p>
    </Page>
  );
}
