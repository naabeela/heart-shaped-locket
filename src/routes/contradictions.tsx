import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Page, Title } from "@/components/study/Page";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contradictions")({
  head: () => ({
    meta: [
      { title: "The Contradictions I Don't Want to Resolve — Chapter 06" },
      {
        name: "description",
        content:
          "Six contradictions in Chalika Azka Feirazy that I have no intention of solving.",
      },
      { property: "og:title", content: "The Contradictions I Don't Want to Resolve" },
      { property: "og:description", content: "I don't love you despite these. I recognise you through them." },
    ],
  }),
  component: Contradictions,
});

const ITEMS = [
  {
    a: "Soft",
    b: "not incapable of being firm",
    body: [
      "The mistake people make is treating your gentleness as your ceiling. They assume that because you lead with warmth, warmth is all that's available, and they get surprised when you draw a line and it holds.",
      "What I've seen is that your firmness is real but conditional. It shows up when you're rested, when you're not scared of the reaction, when the thing being defended is somebody else. Defending yourself is the harder case, and it's the one you're still practising. That's not weakness. That's an unevenly distributed skill, and the distribution is moving.",
    ],
  },
  {
    a: "Dreamy",
    b: "capable of being surprisingly practical",
    body: [
      "You float. You get attached to atmospheres, to the mood of a room, to what a week smells like. And then somebody has an actual problem and you become weirdly operational: here's what you say, here's who you talk to, here's the order to do it in.",
      "The practicality is entirely available to you. It just activates around other people's logistics more reliably than your own. If you gave yourself the advice you give Ufi, half your week would reorganise itself by Thursday.",
    ],
  },
  {
    a: "Extroverted",
    b: "sometimes needing enormous amounts of internal space",
    body: [
      "You genuinely like people. This isn't a mask. The energy you spend talking is real energy, not performance, which is exactly why it runs out.",
      "The part you feel guilty about is the recovery. You think that being visibly social obligates you to be endlessly available, and when you need a whole quiet evening you treat it as a betrayal of the person you were at lunch. It isn't. Both are you. One of them is just the version that pays the bill.",
    ],
  },
  {
    a: "Emotionally intelligent about everyone",
    b: "still learning to extend that to yourself",
    body: [
      "You can look at a friend's situation and describe, accurately and without cruelty, the pattern she's stuck in. You'll name the fear underneath it. You'll suggest a first step small enough to actually take.",
      "Turn that same equipment inward and the reading goes fuzzy. Your own patterns become character flaws rather than responses. Your own fear becomes evidence of being difficult. The instrument is excellent. It's the calibration for one specific subject that's off, and I suspect that's because you've been the one holding it for everyone else for a long time.",
    ],
  },
  {
    a: "Very capable of knowing what should be done",
    b: "sometimes needing a gentle first push",
    body: [
      "You're rarely wrong about the necessary action. You'll articulate it before I do. The distance between the sentence and the movement is where things stall, and it isn't laziness, it's the size of the first step being negotiated against the fear of getting it wrong.",
      "So I've stopped explaining what you already know and started doing the smaller, less impressive thing: sitting there while you begin. Not pushing. Just being in the room so the first minute is less lonely. It works more often than advice ever did.",
    ],
  },
  {
    a: "Wanting honesty",
    b: "sometimes afraid of what honesty costs",
    body: [
      "You ask for the truth and you mean it. You also flinch slightly in the second before receiving it, because in your history honesty has occasionally arrived as a bill.",
      "What I've learned is to say the true thing and then stay. The staying is the whole mechanism. The fear isn't of information, it's of the leaving that sometimes follows information. Nobody is leaving. Not over a true sentence, and not over the version of you who was afraid to say it yet.",
    ],
  },
];

function Contradictions() {
  const [open, setOpen] = useState(0);

  return (
    <Page tone="field">
      <Title
        n="06"
        sub="A contradiction is only a problem if you were expecting a simpler person."
      >
        The contradictions
        <br />I don't want
        <br />
        to resolve
      </Title>

      <div className="mt-14 space-y-3">
        {ITEMS.map((it, i) => {
          const active = i === open;
          return (
            <article
              key={it.a}
              className={cn(
                "border transition-colors",
                active ? "border-ink bg-card card-paper" : "border-border bg-transparent",
              )}
            >
              <button
                onClick={() => setOpen(active ? -1 : i)}
                aria-expanded={active}
                className="grid w-full grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-3 p-5 text-left sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:p-7"
              >
                <span className="meta pt-2 text-madder">{String(i + 1).padStart(2, "0")}</span>
                <span className="min-w-0">
                  <span className="display block text-[clamp(1.6rem,5vw,2.8rem)] leading-[1.05]">
                    {it.a},
                  </span>
                  <span className="display block text-[clamp(1.5rem,4.4vw,2.4rem)] italic leading-[1.1] text-burgundy">
                    {active ? it.b : <span className="opacity-45">{it.b}</span>}
                  </span>
                </span>
              </button>
              {active ? (
                <div className="grid gap-6 border-t border-border px-5 pb-8 pt-6 sm:grid-cols-2 sm:px-7">
                  {it.body.map((p, j) => (
                    <p key={j} className="text-[0.97rem] leading-[1.85] text-ink/90">
                      {p}
                    </p>
                  ))}
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      <div className="mt-16 border-t-2 border-ink pt-8">
        <p className="display max-w-[24ch] text-[clamp(1.8rem,6vw,3.2rem)] leading-tight">
          I don't love you despite these contradictions. I recognise you through them.
        </p>
        <p className="hand mt-5">a consistent person would have been much less interesting</p>
      </div>
    </Page>
  );
}
