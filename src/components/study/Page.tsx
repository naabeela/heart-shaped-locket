import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { CHAPTERS, chapterIndexFor, markReached } from "@/lib/chapters";
import { cn } from "@/lib/utils";

const TINT: Record<string, string> = {
  rose: "text-madder",
  green: "text-forest",
  blue: "text-navy",
  ink: "text-ink",
};

export function Page({
  children,
  tone = "paper",
  className,
}: {
  children: ReactNode;
  tone?: "paper" | "field" | "dark";
  className?: string;
}) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const idx = chapterIndexFor(path.startsWith("/poetry") ? "/poetry" : path.startsWith("/letters") ? "/letters" : path);

  useEffect(() => {
    markReached(idx);
  }, [idx]);

  const chapter = CHAPTERS[idx - 1];
  const next = CHAPTERS[idx];
  const prev = idx > 1 ? CHAPTERS[idx - 2] : undefined;

  return (
    <div
      className={cn(
        "relative min-h-screen grain",
        tone === "field" && "paper-field",
        tone === "dark" && "bg-ink text-paper",
        className,
      )}
    >
      <header className="sticky top-0 z-30 border-b border-border/70 backdrop-blur-[2px]">
        <div
          className={cn(
            "mx-auto flex max-w-[1180px] items-center gap-4 px-5 py-2.5",
            tone === "dark" ? "bg-ink/85" : "bg-paper/85",
          )}
        >
          <Link to="/" className="meta shrink-0 hover:text-madder">
            THE WAY I SEE YOU
          </Link>
          <span className="meta hidden min-w-0 flex-1 truncate text-muted-foreground sm:block">
            {chapter?.n} · {chapter?.label}
          </span>
          <Link
            to="/index-of-observations"
            className="meta shrink-0 border border-border px-2.5 py-1 hover:border-madder hover:text-madder"
          >
            INDEX
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1180px] px-5 pb-24 pt-10 sm:pt-14">{children}</main>

      <footer className="border-t border-border">
        <div className="mx-auto grid max-w-[1180px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-8">
          <div className="min-w-0">
            {prev ? (
              <Link to={prev.to} className="meta text-muted-foreground hover:text-madder">
                ← {prev.n} {prev.label}
              </Link>
            ) : (
              <span className="meta text-muted-foreground">FILE OPENED · 03 MONTHS</span>
            )}
          </div>
          {next ? (
            <Link
              to={next.to}
              className={cn(
                "group shrink-0 border border-current px-4 py-2.5 transition-colors",
                TINT[next.tint] ?? "text-ink",
                tone === "dark" && "text-paper",
              )}
            >
              <span className="meta block opacity-60">NEXT · {next.n}</span>
              <span className="display text-xl">{next.label}</span>
            </Link>
          ) : null}
        </div>
      </footer>
    </div>
  );
}

export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("meta text-muted-foreground", className)}>{children}</p>
  );
}

export function Title({
  n,
  children,
  sub,
}: {
  n: string;
  children: ReactNode;
  sub?: ReactNode;
}) {
  return (
    <div className="rise-in">
      <div className="flex items-baseline gap-3">
        <span className="meta text-madder">{n}</span>
        <span className="h-px flex-1 bg-border" />
      </div>
      <h1 className="display mt-4 text-[clamp(2.6rem,9vw,5.4rem)]">{children}</h1>
      {sub ? <p className="mt-4 max-w-[52ch] text-[0.98rem] leading-relaxed text-muted-foreground">{sub}</p> : null}
    </div>
  );
}
