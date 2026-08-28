import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Page, Title } from "@/components/study/Page";
import { Photo } from "@/components/study/Photo";
import { PHOTOS } from "@/lib/photos";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/archive")({
  head: () => ({
    meta: [
      { title: "The Unseen Archive — Chapter 04" },
      {
        name: "description",
        content: "Things Chalika Azka Feirazy probably doesn't remember doing, filed as observations.",
      },
      { property: "og:title", content: "The Unseen Archive" },
      { property: "og:description", content: "Twelve small behavioural observations, most of them undramatic." },
    ],
  }),
  component: Archive,
});

type Obs = {
  id: string;
  title: string;
  noticed: string;
  remembered: string;
  means: string;
  confidence: number;
};

const OBS: Obs[] = [
  {
    id: "OBS-001",
    title: "The volume drop",
    noticed:
      "When a subject actually matters to you, you get quieter, not louder. Sentences get shorter. The typing indicator appears and disappears three times before anything arrives.",
    remembered:
      "Because it's the opposite of what people expect from you. Everyone reads you as the talkative one, so they read your silence as nothing happening.",
    means:
      "The quiet isn't absence, it's compression. You're trying to make the feeling small enough to hand over without it becoming a whole event.",
    confidence: 92,
  },
  {
    id: "OBS-002",
    title: "The joke at the serious part",
    noticed:
      "Roughly a beat before a heavy sentence, you'll insert something funny. Sometimes a meme, sometimes a voice, sometimes just a deliberately silly word.",
    remembered:
      "Because the joke is always well-timed and always slightly off-tone, which is how I learned it isn't really a joke.",
    means:
      "It's a pressure valve and a test at once. If the other person laughs and moves on, you're safe from having said it. If they stay, you'll say the real version.",
    confidence: 88,
  },
  {
    id: "OBS-003",
    title: "The receipts",
    noticed:
      "You remember detail with unreasonable accuracy: what someone was worried about, the exact wording that hurt, the name of a side character, what I said I'd do on a day I'd already forgotten.",
    remembered:
      "Because you deploy it kindly almost every time. You bring things back at the moment they're useful to somebody else.",
    means:
      "Memory is your love language and also, occasionally, your evidence file. Both come from the same habit of paying full attention.",
    confidence: 95,
  },
  {
    id: "OBS-004",
    title: "The reflex to help",
    noticed:
      "When someone describes a problem you understand emotionally, you're already halfway into fixing it before they've finished the sentence.",
    remembered:
      "Because the trigger is specific: you help fastest with feelings you personally recognise.",
    means:
      "You're not just being generous. You're treating other people the way you'd want to be treated in the same state, which means every act of helping is also a quiet self-portrait.",
    confidence: 90,
  },
  {
    id: "OBS-005",
    title: "Protecting people from you",
    noticed:
      "You hold things back specifically so the other person won't worry. Then you carry the held thing until it gets heavy enough to affect you anyway.",
    remembered:
      "Because I have twice found out about something days late and the first thing you said was I didn't want to bother you while you were busy.",
    means:
      "It's love implemented as omission. It's also the single most reliable way for a small thing to become a large one. You are not a bother. You have never once been the bother.",
    confidence: 94,
  },
  {
    id: "OBS-006",
    title: "Two dialects",
    noticed:
      "Anxious-you writes long, hedged, apologetic messages with several maybes. Safe-you writes short, clear, funny ones and says the actual point in the first line.",
    remembered:
      "Because the difference is so consistent I can tell what state you're in before I've read the content.",
    means:
      "Your clarity isn't a skill you lack. It's a skill that anxiety takes offline. Which means the work isn't learning to communicate. It's learning what makes you feel safe enough to.",
    confidence: 91,
  },
  {
    id: "OBS-007",
    title: "The enthusiasm pitch",
    noticed:
      "There's a register your voice hits for things you genuinely love: a book, a musical, a character, an Arctic Monkeys line, an Aikatsu song you have absolutely no intention of defending.",
    remembered:
      "Because your whole face reorganises. You gesture more. You stop editing yourself entirely.",
    means:
      "That's the unmediated version of you. Not the polite one, not the careful one. When people say you're warm, that pitch is what they actually mean.",
    confidence: 97,
  },
  {
    id: "OBS-008",
    title: "Soft until precise",
    noticed:
      "You are gentle by default, and then occasionally, usually when rested and unbothered, you'll say something completely direct with no cushioning at all.",
    remembered:
      "Because it lands hard and it's always correct, and afterwards you look faintly surprised at yourself.",
    means:
      "Firmness isn't foreign to you. It's conditional on capacity. On a full tank you're one of the clearest people I know.",
    confidence: 85,
  },
  {
    id: "OBS-009",
    title: "The stated need vs the actual one",
    noticed:
      "You'll ask for space when what would help is company, or ask for advice when what would help is agreement that the thing is genuinely unfair.",
    remembered:
      "Because I got it wrong a few times by taking the request literally, and you were too kind to correct me.",
    means:
      "You ask for the version you think is least expensive for the other person. I'm learning to ask a follow-up question instead of just complying.",
    confidence: 80,
  },
  {
    id: "OBS-010",
    title: "Minimising in real time",
    noticed:
      "Mid-sentence downgrades. It's not a big deal. I'm probably overreacting. Never mind, it's fine. Usually attached to something that is, in fact, a big deal.",
    remembered:
      "Because the downgrade always arrives about two seconds after the honest part, like a correction being issued.",
    means:
      "You're pre-empting the possibility of being told you're too much. Nobody in this study has ever thought you were too much.",
    confidence: 89,
  },
  {
    id: "OBS-011",
    title: "The journal as a second brain",
    noticed:
      "You write to find out what you think. Not to record the day, to process it. You go into the page confused and come out with a position.",
    remembered:
      "Because most people who journal are archiving. You're computing.",
    means:
      "You already have a functioning method for understanding yourself. The gap isn't insight. It's the distance between the page and the Tuesday afternoon where the insight has to be used.",
    confidence: 86,
  },
  {
    id: "OBS-012",
    title: "Choosing other people's comfort",
    noticed:
      "In small decisions — where to eat, when to leave, whose plan wins — you default to the other person's preference and present it as having no preference.",
    remembered:
      "Because you do have a preference. It shows up half a second before you say it doesn't matter.",
    means:
      "It's not passivity. It's a habit of paying the smaller cost yourself so nobody has to negotiate. I'd like to make it safe for you to just say what you want, in a sentence, first.",
    confidence: 83,
  },
];

function Archive() {
  const [open, setOpen] = useState<string | null>(null);
  const [seen, setSeen] = useState<string[]>([]);

  const reveal = (id: string) => {
    setOpen((cur) => (cur === id ? null : id));
    setSeen((s) => (s.includes(id) ? s : [...s, id]));
  };

  return (
    <Page tone="field">
      <Title n="04" sub="Things you probably don't remember doing. None of these are complaints. All of them are receipts.">
        The unseen
        <br />
        archive
      </Title>

      <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,1fr)_15rem] md:items-start">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-border py-3">
          <span className="meta text-muted-foreground">ENTRIES · 12</span>
          <span className="meta text-madder">OPENED · {String(seen.length).padStart(2, "0")}</span>
          <span className="meta text-muted-foreground">METHOD · PAYING ATTENTION</span>
        </div>
        <Photo
          {...PHOTOS.archive}
          index="PLATE II"
          tilt={-2.2}
          tape
          className="mx-auto w-full max-w-[260px] md:mx-0"
          imgClassName="aspect-[4/3]"
        />
      </div>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {OBS.map((o, i) => {
          const isOpen = open === o.id;
          const wasSeen = seen.includes(o.id);
          return (
            <li
              key={o.id}
              className={cn(
                "group relative",
                isOpen && "sm:col-span-2 xl:col-span-3",
              )}
            >
              <button
                onClick={() => reveal(o.id)}
                aria-expanded={isOpen}
                className={cn(
                  "block h-full w-full border border-ink/50 bg-card p-5 text-left transition-all duration-300 card-paper",
                  !isOpen && "hover:-translate-y-1 hover:border-madder",
                )}
                style={{ rotate: isOpen ? "0deg" : `${(i % 3) - 1}deg` }}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="meta text-madder">{o.id}</span>
                  <span className="meta text-muted-foreground">
                    {wasSeen ? "OPENED" : "SEALED"}
                  </span>
                </div>
                <h3 className="display mt-3 text-2xl">{o.title}</h3>

                {!isOpen ? (
                  <>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink/55 blur-[2.2px] transition group-hover:blur-[1px]">
                      {o.noticed}
                    </p>
                    <span className="meta mt-4 block text-muted-foreground group-hover:text-madder">
                      OPEN FILE →
                    </span>
                  </>
                ) : (
                  <div className="mt-5 grid gap-6 lg:grid-cols-3">
                    <Field label="WHAT I NOTICED" body={o.noticed} />
                    <Field label="WHY I REMEMBERED IT" body={o.remembered} />
                    <Field label="WHAT I THINK IT MEANS" body={o.means} />
                    <div className="lg:col-span-3">
                      <div className="flex items-center gap-3">
                        <span className="meta shrink-0 text-muted-foreground">CONFIDENCE</span>
                        <span className="h-[3px] min-w-0 flex-1 bg-border">
                          <span
                            className="block h-full bg-madder transition-[width] duration-700"
                            style={{ width: `${o.confidence}%` }}
                          />
                        </span>
                        <span className="meta shrink-0">{o.confidence}%</span>
                      </div>
                      <p className="meta mt-4 text-muted-foreground">CLICK TO CLOSE</p>
                    </div>
                  </div>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <p className="hand mt-10 -rotate-[0.6deg]">
        twelve entries and I still have a list of things I haven't figured out how to write down yet
      </p>
    </Page>
  );
}

function Field({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <p className="meta text-forest">{label}</p>
      <p className="mt-2 text-[0.95rem] leading-[1.8] text-ink/90">{body}</p>
    </div>
  );
}
