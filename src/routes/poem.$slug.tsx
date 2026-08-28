import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { POEMS, poemBySlug } from "@/lib/poems";

export const Route = createFileRoute("/poem/$slug")({
  loader: ({ params }) => {
    const poem = poemBySlug(params.slug);
    if (!poem) throw notFound();
    return { poem };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Poem unavailable" }, { name: "robots", content: "noindex" }],
      };
    }
    const t = `${loaderData.poem.title} — A poem for Chalika Azka Feirazy`;
    return {
      meta: [
        { title: t },
        { name: "description", content: loaderData.poem.theme },
        { property: "og:title", content: t },
        { property: "og:description", content: loaderData.poem.theme },
      ],
    };
  },
  component: PoemPage,
});

function PoemPage() {
  const { poem } = Route.useLoaderData();
  const i = POEMS.findIndex((p) => p.slug === poem.slug);
  const prev = POEMS[i - 1];
  const next = POEMS[i + 1];

  return (
    <main className="relative min-h-screen bg-paper-deep px-5 py-14 sm:px-8 sm:py-20 grain">
      <div className="mx-auto max-w-[46rem]">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <Link to="/poetry" className="meta min-w-0 truncate text-muted-foreground hover:text-burgundy">
            ← ALL POEMS
          </Link>
          <span className="meta shrink-0 text-muted-foreground">
            {poem.n} · {poem.lang === "id" ? "BAHASA INDONESIA" : "ENGLISH"}
          </span>
        </div>

        <article className="mt-14 border border-ink/40 bg-paper px-6 py-12 card-paper sm:px-14 sm:py-16">
          <h1 className="display text-[clamp(2rem,7vw,3.4rem)] leading-[1.08] text-burgundy">
            {poem.title}
          </h1>
          <p className="meta mt-4 text-muted-foreground">{poem.theme}</p>
          <div className="mt-12 space-y-0">
            {poem.lines.map((line, k) =>
              line === "" ? (
                <div key={k} className="h-6" aria-hidden="true" />
              ) : (
                <p
                  key={k}
                  className="poem-line text-[clamp(1.02rem,2.6vw,1.18rem)] leading-[2.05] text-ink/95"
                  style={{ animationDelay: `${Math.min(k * 42, 1400)}ms` }}
                >
                  {line}
                </p>
              ),
            )}
          </div>
          <p className="meta mt-14 border-t border-border pt-6 text-muted-foreground">
            FOR CHALIKA AZKA FEIRAZY · MONTH THREE
          </p>
        </article>

        <nav className="mt-10 grid grid-cols-2 gap-4">
          {prev ? (
            <Link
              to="/poem/$slug"
              params={{ slug: prev.slug }}
              className="meta border border-border p-4 hover:border-burgundy hover:text-burgundy"
            >
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to="/poem/$slug"
              params={{ slug: next.slug }}
              className="meta border border-border p-4 text-right hover:border-burgundy hover:text-burgundy"
            >
              {next.title} →
            </Link>
          ) : (
            <Link
              to="/letters"
              className="meta border border-burgundy p-4 text-right text-burgundy hover:bg-burgundy hover:text-paper"
            >
              CONTINUE TO THE LETTERS →
            </Link>
          )}
        </nav>
      </div>
    </main>
  );
}
