import { createFileRoute } from "@tanstack/react-router";
import { Page, Title } from "@/components/study/Page";

export const Route = createFileRoute("/unseen")({
  head: () => ({
    meta: [
      { title: "Things I Wish You Could See From Where I Stand — Chapter 10" },
      {
        name: "description",
        content:
          "What Chalika Azka Feirazy underestimates about herself, written from the other side of the room.",
      },
      { property: "og:title", content: "Things I Wish You Could See From Where I Stand" },
      { property: "og:description", content: "Not a compliment list. A change of vantage point." },
    ],
  }),
  component: Unseen,
});

const BLOCKS = [
  {
    head: "You think your sensitivity costs you. From here it's the reason people tell you the truth.",
    body: [
      "You've described it to me as a problem: that you feel things too fast, too much, at the wrong volume. What I see is different. I see people arriving in conversations with you already half-disarmed, because on some level they've registered that you will take whatever they say seriously.",
      "That's rarer than you think. Most people are functionally deaf to each other. They wait for their turn. You don't do that, and it means the people around you get an experience they can't reliably get anywhere else: the experience of being fully received.",
      "It costs you. I know it costs you. But calling it a weakness is a category error. It's the most expensive thing you own and you keep giving it away for free.",
    ],
  },
  {
    head: "The things you file as ordinary are the things I'd list first.",
    body: [
      "Remembering what someone was anxious about. Sending the message you weren't sure you should send. Noticing that a room has gone tense before anyone says anything. Asking a follow-up question that proves you were listening the first time.",
      "You do these constantly and you categorise them as nothing, the way people categorise breathing as nothing. From outside they don't look like nothing at all. They look like a specific, learnable skill that most people never learn, performed by someone who thinks she's just being normal.",
    ],
  },
  {
    head: "You are not behind. You are in the middle of something.",
    body: [
      "The skripsi, the internship, the version of yourself you keep drafting in your journal. You measure all of it against a finished state that exists nowhere and belongs to nobody.",
      "Three months in, here's my honest read: you are a person doing several hard things at once, mostly without applause, occasionally without sleep, and you are still funny, still kind to your friends, still curious about a book you have no time to read. That's not falling behind. That's carrying more than the load-bearing walls were rated for.",
    ],
  },
];

const PERMISSIONS = [
  {
    t: "You don't have to earn the right to be cared for.",
    b: "You act as though care is a payment released on completion of duties. It isn't. Nobody around you is running that ledger, and if they were, you'd be enormously in credit. The care doesn't arrive because you were useful this week. It arrives because you're you and you're here.",
  },
  {
    t: "You are allowed to need things.",
    b: "Out loud. Specifically. In the first sentence rather than the fifth. Needing something is not a demand and it's not an imposition, it's information — and withholding it doesn't protect anyone, it just makes the other person work with a worse map.",
  },
  {
    t: "You are allowed to be learning.",
    b: "Being twenty-something and still figuring out logic, honesty, consistency, courage, and what to do with a feeling that won't sit down is not a shameful condition. It's the assignment. Everyone is doing it; you're just one of the few keeping notes.",
  },
  {
    t: "You are allowed to be wrong and still be worthy of tenderness.",
    b: "This is the one I most want you to keep. Being wrong doesn't revoke anything. Not my patience, not your right to be treated gently, not your standing as someone worth staying for. You can handle something badly on a Tuesday and still be, on that same Tuesday, entirely lovable.",
  },
];

function Unseen() {
  return (
    <Page>
      <Title n="10" sub="Not a compliment list. A change of vantage point.">
        Things I wish
        <br />
        you could see
        <br />
        from where I stand
      </Title>

      <div className="mt-16 space-y-16">
        {BLOCKS.map((b, i) => (
          <section
            key={i}
            className="grid gap-6 border-t border-ink pt-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12"
          >
            <h2 className="display text-[clamp(1.6rem,4.6vw,2.5rem)] leading-[1.12] text-burgundy">
              {b.head}
            </h2>
            <div className="space-y-5">
              {b.body.map((p, j) => (
                <p key={j} className="text-[1rem] leading-[1.9] text-ink/90">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-20">
        <p className="meta text-madder">FOUR THINGS I WOULD LIKE ON THE RECORD</p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {PERMISSIONS.map((p, i) => (
            <article
              key={p.t}
              className="border border-ink/50 bg-card p-6 card-paper"
              style={{ rotate: `${i % 2 === 0 ? -0.5 : 0.6}deg` }}
            >
              <span className="meta text-muted-foreground">
                {String(i + 1).padStart(2, "0")} / 04
              </span>
              <h3 className="display mt-3 text-[1.6rem] leading-[1.15]">{p.t}</h3>
              <p className="mt-4 text-[0.95rem] leading-[1.85] text-ink/85">{p.b}</p>
            </article>
          ))}
        </div>
        <p className="hand mt-8 -rotate-[0.5deg]">
          i'm not telling you how to feel. i'm telling you what it looks like from over here.
        </p>
      </div>
    </Page>
  );
}
