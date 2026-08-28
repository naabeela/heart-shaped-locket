import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CHAPTERS, readReached } from "@/lib/chapters";

export const Route = createFileRoute("/index-of-observations")({
  head: () => ({
    meta: [
      { title: "Observation Index — The Way I See You" },
      { name: "description", content: "The index of chapters in the study of Chalika Azka Feirazy." },
      { property: "og:title", content: "Observation Index" },
      { property: "og:description", content: "Sixteen entries. Some of them still opening." },
    ],
  }),
  component: IndexPage,
});

function IndexPage() {
  const [reached, setReached] = useState(1);
  useEffect(() => setReached(readReached()), []);

  return (
    <div className="min-h-screen bg-paper grain">
      <div className="mx-auto max-w-[900px] px-5 py-14">
        <div className="flex items-baseline justify-between">
          <span className="meta text-madder">OBSERVATION INDEX</span>
          <Link to="/" className="meta text-muted-foreground hover:text-madder">
            CLOSE
          </Link>
        </div>
        <h1 className="display mt-5 text-[clamp(2.4rem,8vw,4.2rem)]">Contents</h1>
        <p className="hand mt-2">read in order if you can — it builds</p>

        <ul className="mt-10 border-t border-border">
          {CHAPTERS.map((c, i) => {
            const unlocked = i + 1 <= reached + 1;
            return (
              <li key={c.to} className="border-b border-border">
                {unlocked ? (
                  <Link
                    to={c.to}
                    className="group grid grid-cols-[3rem_minmax(0,1fr)_auto] items-baseline gap-3 py-4 transition-colors hover:bg-paper-deep/60"
                  >
                    <span className="meta text-muted-foreground">{c.n}</span>
                    <span className="display truncate text-2xl group-hover:text-madder sm:text-3xl">
                      {c.label}
                    </span>
                    <span className="meta text-muted-foreground group-hover:text-madder">OPEN</span>
                  </Link>
                ) : (
                  <div className="grid grid-cols-[3rem_minmax(0,1fr)_auto] items-baseline gap-3 py-4 opacity-45">
                    <span className="meta text-muted-foreground">{c.n}</span>
                    <span className="display truncate text-2xl sm:text-3xl">
                      <span className="redact px-1">{c.label}</span>
                    </span>
                    <span className="meta text-muted-foreground">SEALED</span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <p className="meta mt-8 text-muted-foreground">
          Sealed entries open as you move through the study. Nothing here is a test.
        </p>
      </div>
    </div>
  );
}
