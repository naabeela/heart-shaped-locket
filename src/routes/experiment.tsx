import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Page, Title } from "@/components/study/Page";
import { readUnlocked, saveUnlocked } from "@/lib/experiment";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/experiment")({
  head: () => ({
    meta: [
      { title: "The Variable Experiment — Chapter 08" },
      {
        name: "description",
        content:
          "Seven behavioural scenarios. Guess what happens next, then read what actually does.",
      },
      { property: "og:title", content: "The Variable Experiment" },
      { property: "og:description", content: "Not a quiz. A way of learning one specific person." },
    ],
  }),
  component: Experiment,
});

type Verdict = "observed" | "close" | "used-to-think";

type Choice = { text: string; verdict: Verdict; response: string };

type Scenario = {
  id: string;
  unlocks: string;
  prompt: string[];
  choices: Choice[];
  reveal: string[];
};

const SCENARIOS: Scenario[] = [
  {
    id: "S-01",
    unlocks: "HYPOTHESIS — safety precedes clarity",
    prompt: [
      "Something is bothering you.",
      "You don't want your partner to worry.",
      "What happens next?",
    ],
    choices: [
      { text: "You say it immediately, plainly.", verdict: "used-to-think", response: "That is what I used to think too." },
      { text: "You go quiet and wait to be asked.", verdict: "observed", response: "Observed." },
      { text: "You mention a smaller, related thing instead.", verdict: "close", response: "Close." },
      { text: "You decide it isn't important and move on.", verdict: "close", response: "Close — but it doesn't actually leave." },
    ],
    reveal: [
      "You might think silence means nothing is wrong. From what I've observed, silence can sometimes mean the opposite: the quieter it gets, the more there is.",
      "The mechanism isn't secrecy. It's arithmetic. You weigh the cost of me worrying against the cost of you carrying it, and you consistently price your own capacity too cheaply.",
      "What works: not interrogation. One specific question, asked calmly, and then room. Usually the second question is where the real sentence lives.",
    ],
  },
  {
    id: "S-02",
    unlocks: "OBSERVATION O2 — asymmetric problem-solving",
    prompt: [
      "A friend messages you at 1am with a problem.",
      "You have an internship report due at 9.",
      "What happens next?",
    ],
    choices: [
      { text: "You reply properly, at length, and finish the report late.", verdict: "observed", response: "Observed." },
      { text: "You say you'll talk tomorrow.", verdict: "used-to-think", response: "That is what I used to think too." },
      { text: "You reply briefly and then think about it for an hour anyway.", verdict: "close", response: "Close." },
      { text: "You ignore it until morning.", verdict: "used-to-think", response: "Statistically, no." },
    ],
    reveal: [
      "You are faster at other people's emotional problems than your own, and you use better reasoning on theirs. Same brain, different permissions.",
      "This isn't a flaw to be corrected into coldness. It's a resource that currently has no allocation limit. The version of this I'd like for you isn't caring less. It's the friend still getting your attention and you still getting sleep.",
    ],
  },
  {
    id: "S-03",
    unlocks: "CORRELATION — perceived burden ↓ disclosure",
    prompt: [
      "I ask what's wrong.",
      "The honest answer is something I did.",
      "What happens next?",
    ],
    choices: [
      { text: "You tell me directly.", verdict: "close", response: "Close — if the week has been kind to you." },
      { text: "You say it's nothing and hope I ask again.", verdict: "observed", response: "Observed." },
      { text: "You tell me a softened, 30% version.", verdict: "observed", response: "Also observed. Frequently the same event." },
      { text: "You bring it up two days later.", verdict: "close", response: "Close. Usually via a joke first." },
    ],
    reveal: [
      "The softened version is the interesting one. You don't lie, you scale. You hand over the smallest true fragment that won't start anything, and then feel unseen because I responded to the fragment.",
      "I've stopped treating the first answer as final. Not because I doubt you. Because I've learned that the first answer is the one designed to protect me.",
      "What I owe you here: a tone consistent enough that the full-size version never feels expensive.",
    ],
  },
  {
    id: "S-04",
    unlocks: "OBSERVATION O5 — the gentle prompt",
    prompt: [
      "You already know what you need to do about something difficult.",
      "You've known for a week.",
      "What happens next?",
    ],
    choices: [
      { text: "You do it once someone sits with you while you start.", verdict: "observed", response: "Observed." },
      { text: "You do it alone after enough time passes.", verdict: "close", response: "Close. It costs more this way." },
      { text: "You wait to be pushed hard.", verdict: "used-to-think", response: "That is what I used to think too — pushing makes it worse." },
      { text: "You never do it.", verdict: "used-to-think", response: "No. You get there. The route is just longer." },
    ],
    reveal: [
      "The blocker isn't knowledge and it isn't willingness. It's the first sixty seconds, which you experience as much larger than they are.",
      "Advice fails here because you already have the advice. Company works, because the fear that stalls you is mostly about being alone if it goes badly.",
      "This is why I've stopped explaining things you already know and started just being in the room.",
    ],
  },
  {
    id: "S-05",
    unlocks: "VARIABLE — rest as input, not reward",
    prompt: [
      "Thesis week. You've eaten one proper meal in two days.",
      "Someone tells you to rest.",
      "What happens next?",
    ],
    choices: [
      { text: "You agree, then keep working.", verdict: "observed", response: "Observed." },
      { text: "You rest and feel guilty the entire time.", verdict: "close", response: "Close — the guilt tax is real." },
      { text: "You actually rest.", verdict: "used-to-think", response: "Occasionally. I'm keeping the data point." },
      { text: "You get annoyed at being told.", verdict: "close", response: "Fair. Nobody likes being managed." },
    ],
    reveal: [
      "You've filed rest under reward, and rewards require completion, and the skripsi is never complete, so the reward is structurally unreachable.",
      "Reclassifying it as an input changes the whole equation: not something you've earned, something the work requires. Eating is not a celebration. It is a Tuesday.",
      "I have no standing to lecture here. My own sleep schedule is one of the things on my list in chapter eleven.",
    ],
  },
  {
    id: "S-06",
    unlocks: "ANOMALY A1 — the unexplained directness",
    prompt: [
      "Someone treats a person you love unfairly, in front of you.",
      "You are already tired and overwhelmed.",
      "What happens next?",
    ],
    choices: [
      { text: "You say something clear and unhedged, immediately.", verdict: "observed", response: "Observed — and the model doesn't predict it." },
      { text: "You stay quiet and process it later.", verdict: "used-to-think", response: "That is what I used to think too." },
      { text: "You defuse it with humour, then address it privately.", verdict: "close", response: "Close. Also common." },
      { text: "You freeze.", verdict: "used-to-think", response: "Not for other people. Only for yourself." },
    ],
    reveal: [
      "This is the anomaly in the paper. Under conditions where the model predicts withdrawal, you become direct — as long as the person being defended isn't you.",
      "It tells me the capacity is fully intact. Not developing. Intact. The only missing piece is the belief that you belong in the category of people worth defending that way.",
      "You do. I'd like you to eventually take my word for it, and then, better, stop needing my word for it.",
    ],
  },
  {
    id: "S-07",
    unlocks: "LIMITATION — the observer is not neutral",
    prompt: [
      "I get my tone wrong. Flat, too serious, distracted by my own week.",
      "Nothing is technically wrong.",
      "What happens next?",
    ],
    choices: [
      { text: "You ask if I'm okay.", verdict: "close", response: "Close. Usually first." },
      { text: "You read it as being about you and go quiet.", verdict: "observed", response: "Observed. And that one is mine, not yours." },
      { text: "You match my flatness.", verdict: "close", response: "Close — and then we're both doing it." },
      { text: "You tell me directly that my tone is off.", verdict: "used-to-think", response: "Rarely, and only when you feel safe. Which is the whole point." },
    ],
    reveal: [
      "Half of what this study records as your pattern is actually a response to my inconsistency. Unpredictable energy is the fastest way to make you stop transmitting, and I've supplied plenty of it.",
      "So the experiment cuts both ways. Every variable I measure in you is partly a reading of me.",
      "That's the limitation section of the paper, and it isn't false modesty. It's the most honest thing in here.",
    ],
  },
];

function Experiment() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [corrected, setCorrected] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => setUnlocked(readUnlocked()), []);
  useEffect(() => {
    if (unlocked.length) saveUnlocked(unlocked);
  }, [unlocked]);

  const s = SCENARIOS[i];
  const choice = picked === null ? null : s.choices[picked];

  const choose = (idx: number) => {
    if (picked !== null) return;
    setPicked(idx);
    setUnlocked((u) => (u.includes(s.id) ? u : [...u, s.id]));
    if (s.choices[idx].verdict !== "observed") setCorrected((c) => c + 1);
  };

  const next = () => {
    if (i === SCENARIOS.length - 1) {
      setDone(true);
      return;
    }
    setI((v) => v + 1);
    setPicked(null);
  };

  if (done) {
    return (
      <Page tone="dark">
        <div className="py-10">
          <p className="meta text-rose">MODEL UPDATED.</p>
          <h1 className="display mt-5 text-[clamp(2.6rem,10vw,6rem)]">
            Model
            <br />
            updated.
          </h1>
          <div className="mt-12 grid gap-px border border-paper/25 bg-paper/25 sm:grid-cols-2 lg:grid-cols-4">
            <Stat k="OBSERVATIONS LEARNED" v={`${unlocked.length} / 07`} />
            <Stat k="PATTERNS RECOGNISED" v={`${Math.min(unlocked.length, 5)} / 05`} />
            <Stat k="ASSUMPTIONS CORRECTED" v={String(corrected).padStart(2, "0")} />
            <Stat k="UNKNOWN VARIABLES REMAINING" v="MANY" />
          </div>

          <div className="mt-14 max-w-[62ch] space-y-5 text-[1rem] leading-[1.9] text-paper/85">
            <p>
              None of that was a score. There was no correct set of answers, and nothing here
              measures whether you are a good partner or a good person.
            </p>
            <p>
              The point of the experiment was smaller and stranger: to show what it looks like from
              the outside when someone spends three months trying to predict you, gets it wrong
              often, and keeps updating instead of concluding.
            </p>
            <p>
              Every scenario in there is real. Every one of them ends with me knowing you slightly
              better and understanding how much of the file is still blank.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <button
              onClick={() => {
                setDone(false);
                setI(0);
                setPicked(null);
                setCorrected(0);
              }}
              className="meta border border-paper/60 px-5 py-3 hover:border-rose hover:text-rose"
            >
              RUN AGAIN
            </button>
            <Link to="/theory" className="meta border border-rose bg-rose px-5 py-3 text-ink">
              READ THE UPDATED THEORY
            </Link>
            <Link to="/variables" className="meta border border-paper/60 px-5 py-3 hover:border-rose hover:text-rose">
              CONTINUE → 09 THE VARIABLES
            </Link>
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page tone="dark">
      <Title n="08" sub="Seven situations. Choose what you think happens. There is no correct answer and no score.">
        The variable
        <br />
        experiment
      </Title>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-paper/20 py-3">
        <span className="meta text-rose">SCENARIO {s.id}</span>
        <span className="meta text-paper/50">{i + 1} OF {SCENARIOS.length}</span>
        <span className="meta text-paper/50">UNLOCKS · {s.unlocks}</span>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          {s.prompt.map((line, j) => (
            <p
              key={j}
              className="display text-[clamp(1.7rem,5.4vw,2.9rem)] leading-[1.15] rise-in"
              style={{ animationDelay: `${j * 90}ms` }}
            >
              {line}
            </p>
          ))}

          <ul className="mt-10 space-y-2.5">
            {s.choices.map((c, idx) => {
              const isPicked = picked === idx;
              return (
                <li key={c.text}>
                  <button
                    onClick={() => choose(idx)}
                    disabled={picked !== null}
                    className={cn(
                      "w-full border px-4 py-3.5 text-left text-[0.95rem] leading-snug transition-colors",
                      isPicked
                        ? "border-rose bg-rose/15 text-paper"
                        : picked !== null
                          ? "border-paper/15 text-paper/35"
                          : "border-paper/35 hover:border-rose hover:text-rose",
                    )}
                  >
                    <span className="meta mr-3 opacity-60">{String.fromCharCode(65 + idx)}</span>
                    {c.text}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="min-h-[16rem] border-l border-paper/20 pl-6 sm:pl-8">
          {choice ? (
            <div className="soft-in">
              <p
                className={cn(
                  "meta",
                  choice.verdict === "observed" ? "text-sage" : "text-rose",
                )}
              >
                {choice.response}
              </p>
              <div className="mt-6 space-y-5">
                {s.reveal.map((p, j) => (
                  <p key={j} className="text-[0.98rem] leading-[1.9] text-paper/85">
                    {p}
                  </p>
                ))}
              </div>
              <button
                onClick={next}
                className="meta mt-9 border border-paper/60 px-5 py-3 hover:border-rose hover:text-rose"
              >
                {i === SCENARIOS.length - 1 ? "UPDATE MODEL →" : "NEXT SCENARIO →"}
              </button>
            </div>
          ) : (
            <p className="meta text-paper/40">
              AWAITING PREDICTION — the response will appear here
            </p>
          )}
        </div>
      </div>
    </Page>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="bg-ink p-5">
      <p className="meta text-paper/45">{k}</p>
      <p className="display mt-3 text-3xl text-paper">{v}</p>
    </div>
  );
}
