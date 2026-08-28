import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Page, Title } from "@/components/study/Page";
import { Photo } from "@/components/study/Photo";
import { PHOTOS } from "@/lib/photos";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/patterns")({
  head: () => ({
    meta: [
      { title: "Patterns — Chapter 05" },
      {
        name: "description",
        content: "People are rarely as random as they think. Four states of Chalika Azka Feirazy, mapped.",
      },
      { property: "og:title", content: "Patterns" },
      { property: "og:description", content: "Four states, one person, observed over three months." },
    ],
  }),
  component: Patterns,
});

type State = {
  key: string;
  label: string;
  color: string;
  ring: string;
  line: string;
  traits: Array<{ t: string; v: number }>;
  note: string;
};

const STATES: State[] = [
  {
    key: "safe",
    label: "When safe",
    color: "text-forest",
    ring: "border-forest",
    line: "var(--forest)",
    traits: [
      { t: "Expressive", v: 92 },
      { t: "Direct", v: 84 },
      { t: "Playful", v: 95 },
      { t: "Decisive", v: 74 },
      { t: "Self-editing", v: 18 },
    ],
    note: "This is the version of you that argues with me about a fictional character for eleven minutes and then says the honest thing without warning. Nothing has been added to you here. Something has just been removed.",
  },
  {
    key: "anxious",
    label: "When anxious",
    color: "text-madder",
    ring: "border-madder",
    line: "var(--madder)",
    traits: [
      { t: "Holding in", v: 90 },
      { t: "Overthinking", v: 88 },
      { t: "Minimising", v: 82 },
      { t: "Needs prompting", v: 76 },
      { t: "Impulse risk", v: 61 },
    ],
    note: "The pattern is containment. You keep the feeling inside on the theory that it will be cheaper for everyone. It compounds instead. The tell is a shorter reply than the situation deserves.",
  },
  {
    key: "cares",
    label: "When you care",
    color: "text-burgundy",
    ring: "border-burgundy",
    line: "var(--burgundy)",
    traits: [
      { t: "Helps", v: 96 },
      { t: "Remembers", v: 94 },
      { t: "Gives", v: 91 },
      { t: "Protects", v: 87 },
      { t: "Stays involved", v: 89 },
    ],
    note: "Caring is not a mood for you, it's an activity. You do things. You look things up. You check back three days later. This is the most legible pattern in the entire file.",
  },
  {
    key: "overwhelmed",
    label: "When overwhelmed",
    color: "text-navy",
    ring: "border-navy",
    line: "var(--navy)",
    traits: [
      { t: "Communication", v: 34 },
      { t: "Self-priority", v: 22 },
      { t: "Problem clarity", v: 38 },
      { t: "Sleep / eating", v: 29 },
      { t: "Internal noise", v: 93 },
    ],
    note: "Here the definitions blur. The problem stops having edges, which makes it unsolvable, which makes it heavier. Usually what's needed first isn't a solution, it's someone helping you name the actual shape of the thing.",
  },
];

function Patterns() {
  const [active, setActive] = useState(0);
  const s = STATES[active]!;

  return (
    <Page>
      <Title n="05" sub="People are rarely as random as they think. Four states. Select one and watch the system change.">
        Patterns
      </Title>

      <div className="mt-12 flex flex-wrap gap-2">
        {STATES.map((st, i) => (
          <button
            key={st.key}
            onClick={() => setActive(i)}
            className={cn(
              "meta border px-4 py-2.5 transition-colors",
              i === active ? cn("bg-ink text-paper", st.ring) : "border-border hover:border-madder",
            )}
          >
            {st.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="relative border border-ink/60 bg-card p-6 sm:p-9 card-paper">
          <div className="flex items-baseline justify-between">
            <span className={cn("meta", s.color)}>STATE {String(active + 1).padStart(2, "0")}</span>
            <span className="meta text-muted-foreground">N = 3 MONTHS</span>
          </div>
          <h2 className={cn("display mt-3 text-[clamp(2rem,7vw,3.6rem)]", s.color)}>{s.label}</h2>

          <ul className="mt-8 space-y-5">
            {s.traits.map((tr, i) => (
              <li key={tr.t} className="grid grid-cols-[minmax(0,9rem)_minmax(0,1fr)_2.6rem] items-center gap-3">
                <span className="meta min-w-0 truncate text-muted-foreground">{tr.t}</span>
                <span className="relative block h-6 min-w-0 border-b border-border">
                  <span
                    className="absolute bottom-0 left-0 top-0 transition-[width] duration-700 ease-out"
                    style={{
                      width: `${tr.v}%`,
                      background: `repeating-linear-gradient(115deg, ${s.line} 0 2px, transparent 2px 6px)`,
                      transitionDelay: `${i * 60}ms`,
                    }}
                  />
                </span>
                <span className="meta text-right">{tr.v}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 border-t border-border pt-6 text-[0.98rem] leading-[1.85]">{s.note}</p>
        </div>

        <div className="space-y-8">
          <Photo
            {...PHOTOS.patterns}
            index="PLATE III"
            tilt={2}
            className="mx-auto w-full max-w-[330px]"
            imgClassName="aspect-[4/5]"
          />
          <div className="border-l-2 border-rose pl-5">
            <p className="meta text-muted-foreground">READING NOTE</p>
            <p className="mt-3 text-[0.95rem] leading-[1.85]">
              None of these states is the real you with the others being performances. They're the
              same person under different pressure. The useful discovery of three months is that the
              variable moving between them is almost never how much you care. It's how safe you feel
              while caring.
            </p>
          </div>
          <p className="hand -rotate-[0.7deg]">
            i keep this chart because it stops me taking your quiet personally
          </p>
        </div>
      </div>
    </Page>
  );
}
