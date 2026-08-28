import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Page, Title } from "@/components/study/Page";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/reciprocal")({
  head: () => ({
    meta: [
      { title: "What You Taught Me — Chapter 14" },
      {
        name: "description",
        content: "The reciprocal record: what Chalika Azka Feirazy changed about Nabil, the person writing this study.",
      },
      { property: "og:title", content: "What You Taught Me" },
      { property: "og:description", content: "Observation runs in both directions. This is the other column." },
    ],
  }),
  component: Reciprocal,
});

const ENTRIES = [
  {
    t: "How to actually learn something instead of collecting it",
    b: "I used to treat understanding as an inventory problem: read more, know more, be able to reference more. You do something different. You take one thing, apply it badly, notice what broke, and go again. Watching you handle a subject you cared about rearranged how I approach my own work. Knowing is cheap. Applying is where the cost is, and you pay it without complaining about the price.",
  },
  {
    t: "That speaking is a skill and silence is rarely neutral",
    b: "I used to think saying nothing was a safe default — a way of not making things worse. You showed me the opposite: that silence gets interpreted anyway, and usually less generously than the truth would have been. I say things earlier now. Not because it's comfortable, but because I've seen what the alternative costs both of us.",
  },
  {
    t: "That being serious is not the same as being present",
    b: "You told me, kindly, that I get heavy when the moment didn't ask for it. I was defensive for about a day and then I understood. Seriousness is often just discomfort wearing a suit. The moments you've been happiest with me were not the profound ones. They were the stupid ones.",
  },
  {
    t: "Where my selfishness hides",
    b: "Not the loud kind. The kind that dresses up as circumstance — being busy, being tired, having a reason. You noticed and said nothing, which is worse than if you'd said something. I've started catching it in advance, and the test I use is simple: would I describe this decision to you out loud, in these words? If not, it's the hidden kind.",
  },
  {
    t: "That validating a feeling is not the same as agreeing with it",
    b: "I used to skip straight to solving, because solving felt like caring. It isn't, or not always. You taught me that a person can want their feeling acknowledged as real without wanting it fixed, argued with, or optimised. Saying 'that makes sense, of course you felt that' turns out to do more than any of the plans I used to offer.",
  },
  {
    t: "Sensitivity as a competence, not a liability",
    b: "You read rooms at a resolution I didn't know was available. I assumed that kind of attention was a temperament I lacked. It's partly trainable, and I've been training it — mostly by copying you, badly, and slowly getting less bad.",
  },
  {
    t: "How to match someone's energy instead of overriding it",
    b: "There is a version of care that is really just imposition: arriving with your own tempo and expecting the other person to convert. You do the opposite. You find where someone already is and meet them at that speed. It looks effortless from outside. I've tried it, so I know it isn't.",
  },
  {
    t: "The difference between being available and being present",
    b: "This is the one I'd write on the front page. I was available for a long time and thought that was the whole job — reachable, responsive, technically there. You showed me that presence is a separate thing: attention with nothing running underneath it. You can be available to twenty people. You can only be present with one at a time, and the person can always tell which one they're getting.",
  },
];

function Reciprocal() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Page tone="field">
      <Title n="14" sub="Observation runs in both directions. This is the column nobody asked me to fill in.">
        What you
        <br />
        taught me
      </Title>

      <p className="mt-8 max-w-[60ch] text-[0.98rem] leading-[1.85] text-muted-foreground">
        Thirteen chapters of me looking at you would be a strange kind of gift — flattering,
        possibly, but one-directional, and one-directional things don't hold weight. So here is the
        return record. Eight things that are different about me because of three months with
        Chalika Azka Feirazy.
      </p>

      <ul className="mt-14 border-t border-ink">
        {ENTRIES.map((e, i) => {
          const isOpen = open === i;
          return (
            <li key={e.t} className="border-b border-border">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-4 py-6 text-left sm:gap-7"
              >
                <span className="meta text-madder">{String(i + 1).padStart(2, "0")}</span>
                <span
                  className={cn(
                    "display min-w-0 text-[clamp(1.25rem,3.6vw,1.95rem)] leading-[1.2] transition-colors",
                    isOpen && "text-burgundy",
                  )}
                >
                  {e.t}
                </span>
                <span className="meta shrink-0 text-muted-foreground">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <p className="animate-fade-in max-w-[64ch] pb-8 pl-0 text-[0.98rem] leading-[1.9] text-ink/90 sm:pl-[3.6rem]">
                  {e.b}
                </p>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-14 border-l-2 border-burgundy pl-6">
        <p className="display max-w-[26ch] text-[clamp(1.5rem,5vw,2.4rem)] leading-[1.2]">
          You have been teaching this whole time without preparing a single lesson.
        </p>
        <p className="mt-4 max-w-[58ch] text-[0.96rem] leading-[1.85] text-muted-foreground">
          None of it was instruction. All of it was just you, being consistent enough in public that
          somebody paying attention could learn from it. I was paying attention.
        </p>
      </div>
    </Page>
  );
}
