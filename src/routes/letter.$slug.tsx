import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { LETTERS, letterBySlug } from "@/lib/letters";

export const Route = createFileRoute("/letter/$slug")({
  loader: ({ params }) => {
    const letter = letterBySlug(params.slug);
    if (!letter) throw notFound();
    return { letter };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Letter unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const t = `${loaderData.letter.title} — For Chalika Azka Feirazy`;
    return {
      meta: [
        { title: t },
        { name: "description", content: loaderData.letter.meta },
        { property: "og:title", content: t },
        { property: "og:description", content: loaderData.letter.meta },
      ],
    };
  },
  component: LetterPage,
});

function LetterPage() {
  const { letter } = Route.useLoaderData();
  const i = LETTERS.findIndex((l) => l.slug === letter.slug);
  const next = LETTERS[i + 1];

  return (
    <main className="relative min-h-screen bg-paper-deep px-5 py-14 sm:px-8 sm:py-20 grain">
      <div className="mx-auto max-w-[44rem]">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <Link to="/letters" className="meta min-w-0 truncate text-muted-foreground hover:text-burgundy">
            ← ALL LETTERS
          </Link>
          <span className="meta shrink-0 text-muted-foreground">
            {letter.n} / 04 · {letter.lang === "id" ? "BAHASA INDONESIA" : "ENGLISH"}
          </span>
        </div>

        <article className="mt-12 border border-ink/40 bg-paper px-6 py-12 card-paper sm:px-14 sm:py-16">
          <h1 className="display text-[clamp(2rem,6.5vw,3.1rem)] leading-[1.1] text-burgundy">
            {letter.title}
          </h1>
          <p className="meta mt-3 text-muted-foreground">{letter.meta}</p>
          <div className="mt-11 space-y-6">
            {letter.paras.map((p, k) => (
              <p
                key={k}
                className="text-[clamp(1rem,2.5vw,1.08rem)] leading-[1.95] text-ink/95"
              >
                {p}
              </p>
            ))}
          </div>
          <p className="hand mt-12 text-[1.4rem]">{letter.sign}</p>
        </article>

        <nav className="mt-10 flex justify-end">
          {next ? (
            <Link
              to="/letter/$slug"
              params={{ slug: next.slug }}
              className="meta border border-border p-4 hover:border-burgundy hover:text-burgundy"
            >
              {next.title} →
            </Link>
          ) : (
            <Link
              to="/reciprocal"
              className="meta border border-burgundy p-4 text-burgundy hover:bg-burgundy hover:text-paper"
            >
              CONTINUE · WHAT YOU TAUGHT ME →
            </Link>
          )}
        </nav>
      </div>
    </main>
  );
}
