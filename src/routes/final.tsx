import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Photo } from "@/components/study/Photo";
import { PHOTOS } from "@/lib/photos";

export const Route = createFileRoute("/final")({
  head: () => ({
    meta: [
      { title: "Accept Incompleteness — Chapter 16" },
      {
        name: "description",
        content: "The last page of a study of Chalika Azka Feirazy that was never going to close.",
      },
      { property: "og:title", content: "Accept Incompleteness" },
      { property: "og:description", content: "Study status: ONGOING." },
    ],
  }),
  component: Final,
});

type Stage = "start" | "refused" | "accepted" | "after";

function Final() {
  const [stage, setStage] = useState<Stage>("start");

  return (
    <main className="relative min-h-screen bg-paper px-5 py-16 sm:px-8 sm:py-24 grain">
      <div className="mx-auto max-w-[46rem]">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <Link to="/index-of-observations" className="meta min-w-0 truncate text-muted-foreground hover:text-burgundy">
            ← INDEX
          </Link>
          <span className="meta shrink-0 text-muted-foreground">16 / 16</span>
        </div>

        {stage === "start" && (
          <section className="animate-fade-in mt-24 text-center">
            <p className="meta text-muted-foreground">ALL SECTIONS RECORDED</p>
            <h1 className="display mt-6 text-[clamp(2.4rem,9vw,4.5rem)] leading-[1.05]">
              The study is ready
              <br />
              to be closed.
            </h1>
            <button
              onClick={() => setStage("refused")}
              className="meta mt-14 border-2 border-burgundy px-8 py-4 text-burgundy transition-colors hover:bg-burgundy hover:text-paper"
            >
              COMPLETE STUDY
            </button>
          </section>
        )}

        {stage === "refused" && (
          <section className="animate-fade-in mt-24">
            <p className="meta text-madder">SYSTEM RESPONSE</p>
            <h1 className="display mt-5 text-[clamp(2.4rem,9vw,4.5rem)] leading-[1.05] text-madder">
              Cannot complete.
            </h1>
            <div className="mt-8 max-w-[58ch] space-y-5 text-[1rem] leading-[1.95]">
              <p>
                A study can only be closed when the subject stops changing. This one hasn't, and
                shows no indication of doing so.
              </p>
              <p>
                Chalika Azka Feirazy is still learning, still practising, still forgiving the earlier
                versions of herself, still building the parts nobody sees her building. Every
                finding in these sixteen chapters has a date on it. Some are already out of date.
                Most of them will be.
              </p>
              <p className="text-muted-foreground">
                Closing the file would require pretending otherwise. The observer has declined.
              </p>
            </div>
            <button
              onClick={() => setStage("accepted")}
              className="meta mt-14 border-2 border-forest px-8 py-4 text-forest transition-colors hover:bg-forest hover:text-paper"
            >
              ACCEPT INCOMPLETENESS
            </button>
          </section>
        )}

        {(stage === "accepted" || stage === "after") && (
          <section className="animate-fade-in mt-20">
            <Photo {...PHOTOS.final} index="PLATE V" tape />
            <div className="mt-14 max-w-[56ch] space-y-6 text-[1.02rem] leading-[1.95]">
              <p>
                Three months ago I did not know you, and now there are sixteen chapters, six poems,
                four letters, and a model with sliders on it — none of which manage to hold the
                actual person.
              </p>
              <p>
                That's the finding. Not the patterns, not the variables, not any clever sentence in
                the middle of chapter eleven. The finding is that you outrun the description, every
                single time I try to write one, and that I would like to spend a considerable
                amount of time being outrun.
              </p>
              <p>
                Thank you for the three months. For the difficult evenings you didn't clean up
                afterwards. For being someone worth this many pages, and patient with someone still
                learning to read them.
              </p>
              <p className="display text-[clamp(1.7rem,6vw,2.8rem)] leading-[1.15] text-burgundy">
                Happy three months, Chalika Azka Feirazy.
              </p>
              <p className="meta text-forest">Study status: ONGOING.</p>
            </div>

            {stage === "accepted" ? (
              <button
                onClick={() => setStage("after")}
                className="meta mt-16 border-b border-ink pb-1 hover:text-burgundy"
              >
                Continue.
              </button>
            ) : (
              <div className="animate-fade-in mt-16 border-t border-border pt-10">
                <p className="display text-[clamp(1.4rem,5vw,2.2rem)] text-muted-foreground">
                  Month 04 is not written yet.
                </p>
                <p className="hand mt-6 -rotate-[0.7deg]">that part we do together.</p>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
