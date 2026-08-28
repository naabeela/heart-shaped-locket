import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Page, Title } from "@/components/study/Page";
import { Photo } from "@/components/study/Photo";
import { PHOTOS } from "@/lib/photos";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/observation")({
  head: () => ({
    meta: [
      { title: "The Way I See You — Chapter 03" },
      {
        name: "description",
        content:
          "A psychological portrait of Chalika Azka Feirazy in seven parts: softest, strongest, strangest, safe, away, given, forgotten.",
      },
      { property: "og:title", content: "The Way I See You" },
      { property: "og:description", content: "Seven parts of one person, opened one at a time." },
    ],
  }),
  component: Observation,
});

type Panel = {
  key: string;
  letter: string;
  title: string;
  pull: string;
  body: string[];
  margin: string;
};

const PANELS: Panel[] = [
  {
    key: "soft",
    letter: "A",
    title: "Your softest parts",
    pull: "Softness in you is not the absence of edges. It is a decision you keep making.",
    margin: "you apologise for this. don't.",
    body: [
      "The softest thing about you isn't your voice or the way you say sayang when you're half asleep. It's that you keep responding to other people's feelings as if those feelings are real and urgent and worth stopping for. Most people hear a friend's problem and file it. You hear it and rearrange your afternoon.",
      "I've watched you read a message from Kak Dera or Ufi and physically change posture before answering. You sit up. You draft, delete, redraft. You're not performing care, you're calculating it: how do I say this so she feels held instead of handled. That calculation takes energy, and you spend it constantly, on people who will never see the drafts.",
      "The other soft thing is how you love the objects around a feeling. A perfume you associate with a specific week. A book you won't lend out because your handwriting is in the margins. A song that is not just a song but a room you can walk back into. You attach meaning to things because meaning is how you keep track of your own life.",
      "I think you believe softness makes you easier to hurt. It does, sometimes. It also makes you the person everyone tells the truth to. That's not a small thing to be.",
    ],
  },
  {
    key: "strong",
    letter: "B",
    title: "Your strongest parts",
    pull: "You are strongest in the exact moment you stop asking whether you're allowed to be.",
    margin: "evidence: the whole skripsi",
    body: [
      "Your strength is badly labelled. People look for it in volume and don't find it, so they assume it isn't there. But you have been holding an internship and a skripsi and a family and a friendship group and a relationship in the same set of hands, and the number of days you have simply gotten up and done the next thing is not a small number.",
      "You are strong in diagnosis. You can usually name what needs to happen. In a conversation where I'm still circling, you'll say the accurate sentence first. The gap between knowing and doing is real for you, but let's be precise about which part is missing: the knowing is already there, and knowing is the harder half to teach.",
      "You're strong when you're not scared. When you feel safe you get direct in a way that surprises people who only know the soft version. You'll say I don't like that, or that's not what I meant, cleanly, without decorating it. That version of you is not a different person. It's you with the anxiety removed, which means it's you.",
      "And you're strong in returning. You go quiet, you spiral, you come back. Coming back is a skill. Plenty of people never learn it.",
    ],
  },
  {
    key: "strange",
    letter: "C",
    title: "Your strangest contradictions",
    pull: "An extrovert with a locked room in the middle of the house.",
    margin: "my favourite part, honestly",
    body: [
      "You are an ENFP who can talk to anyone and still come home needing an enormous amount of internal space, and you feel guilty about needing it, as if being social publicly means you owe availability privately. You don't.",
      "You are dreamy and impractical about most things and then astonishingly practical about the one thing nobody expected: logistics of taking care of someone else. You'll forget to eat and remember exactly what somebody said they were nervous about three weeks ago.",
      "You want honesty and you are occasionally afraid of what honesty costs, so you sometimes deliver a true thing wrapped in a joke, and then watch to see whether it was received. I have learned to listen to the joke twice.",
      "You are emotionally fluent about everyone in the room and then go strangely illiterate when the subject is you. You can explain someone's avoidance with real insight. Turn the same lens around and the resolution drops.",
    ],
  },
  {
    key: "safe",
    letter: "D",
    title: "What makes you feel safe",
    pull: "Safety, for you, is being met at the same volume you offered.",
    margin: "note to self: match her energy",
    body: [
      "Consistency of tone. Not softness exactly, tone. If my voice is warm on Monday and flat on Tuesday for reasons that have nothing to do with you, you will read the flatness as information about you. You've told me this in different words more than once.",
      "Being asked a second time. The first answer you give is usually the diplomatic one. The second one, after someone shows they actually want the real answer, is the true one. People who only ask once get the summary.",
      "Being validated before being advised. You don't need solutions immediately. You need someone to confirm the feeling exists and is reasonable. Then you'll usually solve it yourself, out loud, in about four minutes.",
      "Small evidence of attention. Remembering the name of the character you were annoyed about. Noticing a new perfume. Referencing a thing you said days ago. Big declarations don't reassure you nearly as much as proof that someone kept the receipts.",
    ],
  },
  {
    key: "away",
    letter: "E",
    title: "What makes you pull away",
    pull: "You don't withdraw to punish. You withdraw to contain.",
    margin: "the silence is never empty",
    body: [
      "Unpredictable energy. When the person you rely on changes temperature without explanation, you stop transmitting and start monitoring. It costs you a lot and it looks, from outside, like you've simply gone quiet.",
      "Feeling like a burden. The instant you suspect your feelings are inconvenient, you archive them. Not resolve, archive. They come back later with interest.",
      "Being handled instead of heard. If a response feels like a technique rather than a person, you'll close. You can hear the difference between someone answering you and someone managing you.",
      "Anticipated conflict. Not conflict itself, the forecast of it. You'll shrink a real complaint down to something small enough not to start anything, then feel unseen for the exact reason that you shrank it. I know that loop. I've watched it happen. I'm learning to notice the shrinking in real time and ask for the full-size version.",
    ],
  },
  {
    key: "give",
    letter: "F",
    title: "What you give other people",
    pull: "You give people the experience of being taken seriously.",
    margin: "including me. especially me.",
    body: [
      "Attention with no agenda. You listen to things that don't benefit you at all: someone's fandom, someone's family situation, someone's dumb long story about their coworker. You stay engaged because the person matters, not because the topic does.",
      "Permission. You are exceptionally good at telling people that what they feel is allowed. That sentence changes people. Most of us walk around suspecting our reactions are excessive; you disagree out loud and it recalibrates the whole nervous system of the conversation.",
      "Continuity. You remember. Birthdays, but also grudges people confided, but also the small hopeful thing someone mentioned once and was too shy to repeat. You carry other people's threads for them.",
      "Delight. There is a specific pitch your voice goes to when you talk about something you actually love, a book, a musical number, a character who does not exist, Aikatsu, a Reality Club lyric you've decided is about your life. That pitch is contagious. You hand out enthusiasm like it's free, and for you it apparently is.",
    ],
  },
  {
    key: "forget",
    letter: "G",
    title: "What you sometimes forget to give yourself",
    pull: "You are generous with everyone standing outside your body.",
    margin: "this is the page I'd reread",
    body: [
      "The permission you hand out so freely. You'll tell a friend her exhaustion is valid and then treat your own as a scheduling failure. Same evidence, two verdicts.",
      "Time that isn't owed to anyone. Rest, for you, keeps getting classified as a reward for finishing, and since the skripsi is never finished, the reward keeps getting postponed. That's not discipline, that's a loop with no exit written into it.",
      "The benefit of the doubt. You will construct the most charitable possible reading of someone else's bad day and the least charitable reading of your own.",
      "Being prioritised by you. Not by me. I can do my part and I intend to. But there's a category of care that only counts when it comes from the inside: eating properly on a bad week, saying the inconvenient true sentence, choosing yourself in a small ordinary decision where nobody is watching and nobody will thank you. I want you to have that. Not because you'd finally deserve it, you already do. Because you'd finally believe it.",
    ],
  },
];

function Observation() {
  const [open, setOpen] = useState<string | null>("soft");
  const opened = PANELS.findIndex((p) => p.key === open);

  return (
    <Page>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
        <Title
          n="03"
          sub="Seven parts of one person. Open them in any order. None of them cancel the others out."
        >
          The way
          <br />I see you
        </Title>
        <Photo
          {...PHOTOS.observation}
          index="PLATE I"
          tilt={1.4}
          className="mx-auto w-full max-w-[380px]"
          imgClassName="aspect-[4/5]"
        />
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-[13rem_minmax(0,1fr)]">
        <nav className="lg:sticky lg:top-24 lg:self-start">
          <p className="meta mb-3 text-muted-foreground">SECTIONS</p>
          <ul className="flex gap-2 overflow-x-auto pb-2 lg:block lg:overflow-visible lg:pb-0">
            {PANELS.map((p) => (
              <li key={p.key} className="shrink-0 lg:mb-1.5">
                <button
                  onClick={() => setOpen(p.key)}
                  className={cn(
                    "meta w-full border px-3 py-2 text-left transition-colors",
                    open === p.key
                      ? "border-burgundy bg-burgundy text-paper"
                      : "border-border hover:border-madder hover:text-madder",
                  )}
                >
                  {p.letter} · {p.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative">
          {PANELS.map((p, i) => {
            const active = p.key === open;
            return (
              <article
                key={p.key}
                hidden={!active}
                className="relative border border-ink/60 bg-card p-6 sm:p-10 card-paper"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <span className="meta text-madder">
                    SECTION {p.letter} / {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="meta text-muted-foreground">
                    OPENED {String(opened + 1).padStart(2, "0")} OF 07
                  </span>
                </div>
                <h2 className="display mt-4 text-[clamp(2rem,6vw,3.4rem)]">{p.title}</h2>
                <p className="mt-5 border-l-2 border-rose pl-4 font-display text-xl italic leading-snug text-burgundy sm:text-2xl">
                  {p.pull}
                </p>
                <div className="mt-8 columns-1 gap-10 lg:columns-2">
                  {p.body.map((para, j) => (
                    <p
                      key={j}
                      className="mb-5 break-inside-avoid text-[0.98rem] leading-[1.85] text-ink/90"
                    >
                      {para}
                    </p>
                  ))}
                </div>
                <p className="hand mt-6 -rotate-[0.8deg]">{p.margin}</p>
              </article>
            );
          })}
        </div>
      </div>
    </Page>
  );
}
