import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Title } from "@/components/study/Page";
import { POEMS } from "@/lib/poems";

export const Route = createFileRoute("/poetry")({
  head: () => ({
    meta: [
      { title: "Six Poems — Chapter 12" },
      {
        name: "description",
        content: "Six original poems written for Chalika Azka Feirazy, three in Indonesian and three in English.",
      },
      { property: "og:title", content: "Six Poems" },
      { property: "og:description", content: "Each one has its own room. Read them one at a time." },
    ],
  }),
  component: Poetry,
});

function Poetry() {
  return (
    <Page tone="field">
      <Title n="12" sub="Six of them. Each one has its own room. They are meant to be read one at a time, slowly.">
        Poems
      </Title>

      <p className="mt-8 max-w-[58ch] text-[0.98rem] leading-[1.85] text-muted-foreground">
        Three written in Indonesian, three written in English. Not translations of each other —
        different things came out in different languages, and I let them.
      </p>

      <ul className="mt-14 divide-y divide-border border-y border-ink">
        {POEMS.map((p) => (
          <li key={p.slug}>
            <Link
              to="/poem/$slug"
              params={{ slug: p.slug }}
              className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-4 py-7 transition-colors hover:bg-paper-deep sm:gap-7"
            >
              <span className="meta text-madder">{p.n}</span>
              <span className="min-w-0">
                <span className="display block text-[clamp(1.5rem,4.4vw,2.4rem)] leading-[1.15] group-hover:text-burgundy">
                  {p.title}
                </span>
                <span className="mt-1.5 block text-sm text-muted-foreground">{p.theme}</span>
              </span>
              <span className="meta text-muted-foreground">
                {p.lang === "id" ? "ID" : "EN"}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="hand mt-10 -rotate-[0.6deg]">
        no explanations attached. if a line is wrong, tell me and i'll rewrite it.
      </p>
    </Page>
  );
}
