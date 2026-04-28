"use client";

import type { Book, Level } from "@/types";
import { ChevronIcon } from "./Icon";
import { BookCard } from "./BookCard";
import { cn } from "@/lib/utils";

interface LevelSectionProps {
  level: Level;
  label: string;
  description: string;
  books: Book[];
  totalInLevel: number;
  collapsed: boolean;
  onToggle: () => void;
}

export function LevelSection({
  level,
  label,
  description,
  books,
  totalInLevel,
  collapsed,
  onToggle,
}: LevelSectionProps) {
  const headingId = `level-${level}-heading`;
  const panelId = `level-${level}-panel`;
  const isFiltered = books.length !== totalInLevel;

  return (
    <section
      id={`nivel-${level}`}
      aria-labelledby={headingId}
      className="scroll-mt-24"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={!collapsed}
        aria-controls={panelId}
        className="group flex w-full items-center gap-4 rounded-md border border-border-subtle bg-bg-surface px-4 py-3 text-left transition-colors hover:border-border-strong"
      >
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-border bg-bg-base font-mono text-sm tabular-nums text-accent"
          aria-hidden
        >
          {level}
        </span>
        <div className="min-w-0 flex-1">
          <h2
            id={headingId}
            className="font-mono text-sm font-semibold tracking-tight text-fg-primary"
          >
            {label}
          </h2>
          <p className="truncate text-2xs text-fg-secondary">{description}</p>
        </div>
        <span className="hidden items-center gap-3 font-mono text-2xs text-fg-muted sm:flex">
          <span className="tabular-nums">
            {isFiltered ? `${books.length}/${totalInLevel}` : totalInLevel}{" "}
            libros
          </span>
        </span>
        <ChevronIcon
          className={cn(
            "shrink-0 text-fg-muted transition-transform duration-200 ease-snap group-hover:text-fg-primary",
            collapsed ? "-rotate-90" : "rotate-0",
          )}
        />
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        hidden={collapsed}
        className="mt-2 grid gap-1.5 pl-0 sm:pl-4"
      >
        {books.length === 0 ? (
          <p className="rounded-md border border-dashed border-border-subtle bg-bg-surface/40 px-4 py-6 text-center font-mono text-2xs text-fg-muted">
            Ningún libro coincide con los filtros actuales en este nivel.
          </p>
        ) : (
          books.map((book, idx) => (
            <BookCard key={book.id} book={book} index={idx + 1} />
          ))
        )}
      </div>
    </section>
  );
}
