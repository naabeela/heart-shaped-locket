import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Page, Title } from "@/components/study/Page";

export const Route = createFileRoute("/variables")({
  head: () => ({
    meta: [
      { title: "The Variables — Chapter 09" },
      {
        name: "description",
        content: "A conceptual model of the conditions that change how Chalika Azka Feirazy behaves.",
      },
      { property: "og:title", content: "The Variables" },
      { property: "og:description", content: "Not a diagnosis. Just a model built from observation." },
    ],
  }),
  component: Variables,
});

type Key = "safety" | "rest" | "pressure" | "attention" | "trust" | "selfRespect";

const INPUTS: Array<{ key: Key; label: string; hint: string }> = [
  { key: "safety", label: "Safety", hint: "how little she's bracing for a reaction" },
  { key: "rest", label: "Rest", hint: "sleep, food, hours that belong to nobody" },
  { key: "pressure", label: "Pressure", hint: "skripsi, internship, deadlines, expectation" },
  { key: "attention", label: "Attention received", hint: "evidence that someone is actually listening" },
  { key: "trust", label: "Trust in the room", hint: "consistency of the other person's tone" },
  { key: "selfRespect", label: "Self-respect", hint: "how much she counts herself as a person present" },
];

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

function Variables() {
  const [v, setV] = useState<Record<Key, number>>({
    safety: 55,
    rest: 40,
    pressure: 70,
    attention: 55,
    trust: 60,
    selfRespect: 45,
  });

  const out = useMemo(() => {
    const { safety, rest, pressure, attention, trust, selfRespect } = v;
    const base = (safety + trust) / 2;
    return {
      directness: clamp(base * 0.7 + rest * 0.2 + selfRespect * 0.25 - pressure * 0.3),
      expression: clamp(safety * 0.5 + attention * 0.35 + rest * 0.25 - pressure * 0.22),
      clarity: clamp(rest * 0.45 + safety * 0.35 + 20 - pressure * 0.35),
      selfAdvocacy: clamp(selfRespect * 0.6 + safety * 0.3 + rest * 0.15 - pressure * 0.25),
      holdingIn: clamp(pressure * 0.55 + (100 - safety) * 0.5 - attention * 0.18),
      warmth: clamp(72 + attention * 0.2 - pressure * 0.12),
    };
  }, [v]);

  const reading =
    out.holdingIn > 65
      ? "Containment mode. She'll still be kind to everyone in the room. She just won't be in it herself."
      : out.directness > 70 && out.clarity > 60
        ? "This is the version people are surprised by: fast, funny, unhedged, willing to say the inconvenient sentence in the first line."
        : out.selfAdvocacy < 35
          ? "Everyone gets looked after here except her. Watch how the warmth stays high while self-advocacy drops. That's the whole problem in one line."
          : "Somewhere in the middle. Functional, a little guarded, still doing more for other people than for herself.";

  return (
    <Page tone="field">
      <Title
        n="09"
        sub="Move the conditions. Watch what changes. Nothing here is fixed, which is the entire point."
      >
        The variables
      </Title>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="border border-navy/40 bg-card p-5 sm:p-7 card-paper">
          <p className="meta text-navy">INPUT CONDITIONS</p>
          <div className="mt-6 space-y-7">
            {INPUTS.map((inp) => (
              <div key={inp.key}>
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3">
                  <label htmlFor={inp.key} className="meta min-w-0 truncate">
                    {inp.label}
                  </label>
                  <span className="meta text-madder">{v[inp.key]}</span>
                </div>
                <input
                  id={inp.key}
                  type="range"
                  min={0}
                  max={100}
                  value={v[inp.key]}
                  onChange={(e) => setV((s) => ({ ...s, [inp.key]: Number(e.target.value) }))}
                  className="mt-2 h-8 w-full cursor-pointer appearance-none bg-transparent [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-2 [&::-moz-range-thumb]:rounded-none [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-burgundy [&::-webkit-slider-runnable-track]:h-[2px] [&::-webkit-slider-runnable-track]:bg-border [&::-webkit-slider-thumb]:mt-[-9px] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-burgundy"
                />
                <p className="mt-1 text-xs text-muted-foreground">{inp.hint}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() =>
              setV({ safety: 92, rest: 85, pressure: 20, attention: 88, trust: 90, selfRespect: 80 })
            }
            className="meta mt-8 border border-forest px-4 py-2.5 text-forest hover:bg-forest hover:text-paper"
          >
            LOAD PRESET · A GOOD WEEK
          </button>
        </div>

        <div className="space-y-8">
          <div className="border border-ink/50 bg-card p-5 sm:p-7 card-paper">
            <p className="meta text-forest">OBSERVED OUTPUT</p>
            <div className="mt-6 space-y-4">
              <Bar label="Directness" value={out.directness} />
              <Bar label="Expressiveness" value={out.expression} />
              <Bar label="Problem clarity" value={out.clarity} />
              <Bar label="Self-advocacy" value={out.selfAdvocacy} />
              <Bar label="Holding things in" value={out.holdingIn} invert />
              <Bar label="Warmth toward others" value={out.warmth} />
            </div>
            <p className="mt-7 border-t border-border pt-5 text-[0.97rem] leading-[1.85]">
              {reading}
            </p>
          </div>

          <div className="border-l-2 border-madder pl-5">
            <p className="meta text-madder">DISCLAIMER</p>
            <p className="mt-2 text-[0.95rem] leading-[1.8]">
              Not a diagnosis. Just a model built from observation. It's deliberately simple, it's
              certainly wrong in places, and you're allowed to disagree with every coefficient in
              it. If you tell me it's wrong, I'll change it. That's how the whole thing is supposed
              to work.
            </p>
          </div>

          <p className="hand -rotate-[0.7deg]">
            notice that warmth barely moves. that one isn't conditional on anything.
          </p>
        </div>
      </div>
    </Page>
  );
}

function Bar({ label, value, invert }: { label: string; value: number; invert?: boolean }) {
  return (
    <div className="grid grid-cols-[minmax(0,8.5rem)_minmax(0,1fr)_2.4rem] items-center gap-3">
      <span className="meta min-w-0 truncate text-muted-foreground">{label}</span>
      <span className="relative block h-[10px] min-w-0 bg-paper-deep">
        <span
          className="absolute inset-y-0 left-0 transition-[width] duration-500 ease-out"
          style={{
            width: `${value}%`,
            background: invert ? "var(--madder)" : "var(--forest)",
          }}
        />
      </span>
      <span className="meta text-right">{value}</span>
    </div>
  );
}
