import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Title } from "@/components/study/Page";
import { LETTERS } from "@/lib/letters";

export const Route = createFileRoute("/letters")({
  head: () => ({
    meta: [
      { title: "Four Letters — Chapter 13" },
      {
        name: "description",
        content: "Four long letters written to Chalika Azka Feirazy across three months.",
      },
      { property: "og:title", content: "Four Letters" },
      { property: "og:description", content: "Two in Indonesian, two in English. Read them in order." },
    ],
  }),
  component: Letters,
});

function Letters() {
  return (
    <Page>
      <Title n="13" sub="Four of them, written at different points and left unedited except for spelling.">
        Letters
      </Title>

      <p className="mt-8 max-w-[58ch] text-[0.98rem] leading-[1.85] text-muted-foreground">
        They are meant to be read in order. The first two are about noticing; the third is the
        difficult one; the fourth is the one I would keep if I could only keep one.
      </p>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {LETTERS.map((l, i) => (
          <Link
            key={l.slug}
            to="/letter/$slug"
            params={{ slug: l.slug }}
            className="group relative block border border-ink/45 bg-card p-7 card-paper transition-transform hover:-translate-y-0.5"
            style={{ rotate: `${i % 2 ? 0.5 : -0.5}deg` }}
          >
            <span className="tape" aria-hidden="true" />
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3">
              <span className="meta min-w-0 truncate text-muted-foreground">LETTER {l.n}</span>
              <span className="meta shrink-0 text-madder">{l.lang === "id" ? "ID" : "EN"}</span>
            </div>
            <h2 className="display mt-3 text-[1.9rem] leading-[1.1] group-hover:text-burgundy">
              {l.title}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{l.meta}</p>
            <p className="meta mt-6 text-burgundy">OPEN →</p>
          </Link>
        ))}
      </div>
    </Page>
  );
}
