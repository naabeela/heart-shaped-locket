import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { markReached } from "@/lib/chapters";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Way I See You — An incomplete study of Chalika Azka Feirazy" },
      {
        name: "description",
        content:
          "Three months of observation, curiosity, affection, and still not enough data. An interactive study made for Chalika Azka Feirazy.",
      },
      { property: "og:title", content: "The Way I See You" },
      {
        property: "og:description",
        content: "An incomplete study of Chalika Azka Feirazy. Three months of observation.",
      },
    ],
  }),
  component: Entry,
});

const LINES = [
  "Before you enter,\nthere is one thing you should know.",
  "This isn't a collection of everything I remember about you.",
  "It's about the things I noticed.",
  "Especially the things you probably didn't think anyone noticed.",
];

function Entry() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    markReached(1);
  }, []);

  useEffect(() => {
    if (done) return;
    const t = window.setTimeout(() => {
      if (step < LINES.length - 1) setStep((s) => s + 1);
      else setDone(true);
    }, step === 0 ? 2600 : 3000);
    return () => window.clearTimeout(t);
  }, [step, done]);

  const advance = () => {
    if (step < LINES.length - 1) setStep((s) => s + 1);
    else setDone(true);
  };

  return (
    <div
      className="relative flex min-h-screen flex-col bg-ink text-paper grain"
      onClick={done ? undefined : advance}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.16] grid-field" />

      <div className="relative mx-auto flex w-full max-w-[1180px] flex-1 flex-col px-5">
        <div className="flex items-baseline justify-between pt-6">
          <span className="meta text-paper/50">FILE 001 · PRIVATE</span>
          <span className="meta text-paper/50">03 MONTHS</span>
        </div>

        <div className="flex flex-1 items-center py-16">
          <div className="w-full">
            <p
              key={step}
              className="display max-w-[18ch] whitespace-pre-line text-[clamp(2.2rem,8.5vw,4.6rem)] soft-in"
            >
              {LINES[step]}
            </p>

            <div className="mt-14 flex flex-wrap items-center gap-5">
              {done ? (
                <button
                  onClick={() => {
                    setLeaving(true);
                    window.setTimeout(() => navigate({ to: "/orientation" }), 700);
                  }}
                  className="meta group relative overflow-hidden border border-paper/70 px-6 py-4 text-paper transition-colors hover:border-rose"
                >
                  <span className="relative z-10 group-hover:text-ink">BEGIN OBSERVATION</span>
                  <span className="absolute inset-0 -translate-x-full bg-rose transition-transform duration-500 group-hover:translate-x-0" />
                </button>
              ) : (
                <span className="meta text-paper/40">
                  {step + 1} / {LINES.length} · tap to continue
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="pb-8">
          <div className="h-px w-full bg-paper/15" />
          <div className="mt-4 grid gap-1 sm:grid-cols-[minmax(0,1fr)_auto]">
            <p className="meta min-w-0 text-paper/45">
              THE WAY I SEE YOU · AN INCOMPLETE STUDY OF CHALIKA AZKA FEIRAZY
            </p>
            <p className="meta text-paper/45">STATUS: ONGOING</p>
          </div>
        </div>
      </div>

      <div
        className={`pointer-events-none fixed inset-0 z-50 bg-paper transition-opacity duration-700 ${
          leaving ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
