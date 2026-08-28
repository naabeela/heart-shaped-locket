import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Page, Title } from "@/components/study/Page";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/becoming")({
  head: () => ({
    meta: [
      { title: "The Parts Still Becoming — Chapter 11" },
      {
        name: "description",
        content: "An unfinished blueprint: what she is still building, and what I am still building too.",
      },
      { property: "og:title", content: "The Parts Still Becoming" },
      { property: "og:description", content: "We are both unfinished people. Neither of us gets to demand perfection." },
    ],
  }),
  component: Becoming,
});

const HERS = [
  {
    label: "Still learning",
    items: [
      {
        t: "Logic as a second language",
        b: "You lead with feeling, which is not the wrong instrument, it's just one instrument. What you're building is the habit of running the emotional read and then asking a second question: what would this look like if it were simply a sequence of facts. You already do it for other people. The translation is happening.",
      },
      {
        t: "Defining the problem accurately",
        b: "Under pressure the problem loses its edges, and something without edges can't be solved, only endured. The skill in progress is naming: this specific thing, on this specific day, involving this specific person. Half the weight comes off in the naming alone.",
      },
    ],
  },
  {
    label: "Still practising",
    items: [
      {
        t: "Saying the inconvenient sentence first",
        b: "You can already say it. You've proved that in the weeks where you were rested and unafraid. The practice is doing it on the bad days too, in a shorter version, before it has to be excavated.",
      },
      {
        t: "Consistency between words and movement",
        b: "You know what you want to do. The gap is the follow-through, and it's not a character defect, it's a first-sixty-seconds problem. Every time you close that gap, even badly, the next one gets easier. I've watched this happen enough times to have stopped worrying about it.",
      },
    ],
  },
  {
    label: "Still becoming",
    items: [
      {
        t: "Brave in your own defence",
        b: "You're already brave for other people, instantly and without calculating. The becoming is extending that clearance to yourself: recognising that being unfairly treated matters just as much when the person it's happening to is you.",
      },
      {
        t: "Initiative without a push",
        b: "Not because being pushed is shameful, but because there's a particular kind of confidence that only comes from having moved first once. I'd like you to have that feeling. I'd like you to get to be the person who started it.",
      },
    ],
  },
  {
    label: "Still forgiving",
    items: [
      {
        t: "The version of you who handled it badly",
        b: "The impulsive decision, the message sent at the wrong hour, the thing you agreed to that you shouldn't have. You keep those on file with a severity nobody else would apply. Forgiving her is part of the work, and she was doing her best with less information and more fear than you have now.",
      },
      {
        t: "Being someone who hides things to protect people",
        b: "It came from somewhere. It was, at one point, useful. Retiring a strategy doesn't require despising the person who needed it.",
      },
    ],
  },
  {
    label: "Still building",
    items: [
      {
        t: "Self-respect as infrastructure",
        b: "Not confidence, that's weather. Self-respect is the load-bearing structure: the assumption that your needs count in the room by default, without a case being made for them. It's being built slowly and mostly out of small unwitnessed decisions.",
      },
      {
        t: "Taking care of yourself on ordinary days",
        b: "Eating, sleeping, stopping. Currently treated as rewards. Being reclassified, slowly, as the conditions that make everything else possible. This is the item I most want to see finished, and the one I'm least entitled to lecture about.",
      },
    ],
  },
];

const MINE = [
  { t: "Tone", b: "Mine changes faster than I notice, and you read every shift as data about you. That's not a you problem to solve. It's a me problem to fix, and the fix is boring and daily." },
  { t: "Emotional sensitivity", b: "I've missed things you signalled clearly. Not because I didn't care — because I was reading the words and not the pitch. I'm getting better at the pitch." },
  { t: "Being less serious", b: "You've told me I get heavy when the moment doesn't need it. You're right. Being serious isn't the same as being present, and it's often just me being uncomfortable in a well-dressed way." },
  { t: "Energy management", b: "You should not have to guess which version of me is arriving. Predictability is a form of kindness and I've been inconsistent about supplying it." },
  { t: "Time", b: "Making room deliberately rather than in the leftovers. Leftover time is a message, even when I don't mean it as one." },
  { t: "Patience and yielding", b: "Not needing to be right. Letting a thing go unresolved for a day. Losing an argument on purpose because the argument was less important than you." },
  { t: "Eating and sleeping properly", b: "You've mentioned it more than once. It's on this list because you were right to mention it, and because it's hard to ask you to treat rest as an input while I treat it as optional." },
  { t: "Not putting you second", b: "The most important line here. There have been moments where I prioritised myself and framed it as circumstance. You noticed. You said nothing. I'd rather you said something, and I'd rather it stopped being necessary." },
];

function Becoming() {
  const [open, setOpen] = useState(0);

  return (
    <Page tone="field">
      <Title n="11" sub="An unfinished drawing. The lines that aren't there yet are still part of the plan.">
        The parts
        <br />
        still becoming
      </Title>

      <div className="relative mt-14 border border-forest/40 bg-card/70 p-5 sm:p-8">
        <div className="pointer-events-none absolute inset-0 opacity-[0.35] grid-field" />
        <div className="relative">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="meta text-forest">DRAWING 01 · REVISION ONGOING</span>
            <span className="meta text-muted-foreground">SCALE · ONE LIFE</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {HERS.map((g, i) => (
              <button
                key={g.label}
                onClick={() => setOpen(i)}
                className={cn(
                  "meta border px-3.5 py-2 transition-colors",
                  i === open
                    ? "border-forest bg-forest text-paper"
                    : "border-border hover:border-forest hover:text-forest",
                )}
              >
                {g.label}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {HERS[open].items.map((it) => (
              <article key={it.t} className="border-l-2 border-forest/60 pl-5">
                <h3 className="display text-2xl">{it.t}</h3>
                <p className="mt-3 text-[0.96rem] leading-[1.85] text-ink/90">{it.b}</p>
              </article>
            ))}
          </div>

          <svg
            viewBox="0 0 600 60"
            className="mt-10 w-full text-forest/50"
            aria-hidden="true"
            role="presentation"
          >
            <path
              d="M4 40 H180 M220 40 H360 M400 40 H520"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="0"
            />
            <path d="M520 40 H596" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 7" fill="none" />
            <circle cx="4" cy="40" r="3" fill="currentColor" />
            <circle cx="520" cy="40" r="3" fill="currentColor" />
          </svg>
          <p className="meta text-muted-foreground">SOLID = BUILT · DASHED = NOT YET DRAWN</p>
        </div>
      </div>

      <section className="mt-20">
        <div className="flex items-baseline gap-3">
          <span className="meta text-madder">RECIPROCAL SHEET</span>
          <span className="h-px flex-1 bg-border" />
        </div>
        <h2 className="display mt-4 text-[clamp(2rem,7vw,3.6rem)]">And I'm not done either.</h2>
        <p className="mt-4 max-w-[58ch] text-[0.98rem] leading-[1.85] text-muted-foreground">
          It would be dishonest to write eleven chapters about what you're still learning and leave
          my own sheet blank. Here is mine, in the same handwriting, without the softening.
        </p>

        <ul className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2">
          {MINE.map((m, i) => (
            <li key={m.t} className="bg-paper p-5">
              <div className="flex items-baseline gap-3">
                <span className="meta text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display text-xl">{m.t}</h3>
              </div>
              <p className="mt-2.5 text-[0.93rem] leading-[1.8] text-ink/85">{m.b}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 border-t-2 border-ink pt-8">
          <p className="display max-w-[22ch] text-[clamp(1.8rem,6vw,3rem)] leading-tight">
            We are both unfinished people. Neither of us gets to demand perfection from the other.
          </p>
          <p className="mt-5 max-w-[58ch] text-[0.98rem] leading-[1.85]">
            You're getting better at being there for yourself. I'm getting better at being there for
            you. Those two projects are running at the same time, in the same three months, and
            neither one is a condition of the other.
          </p>
        </div>
      </section>
    </Page>
  );
}
