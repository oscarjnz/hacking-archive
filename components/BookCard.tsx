"use client";

import { useState } from "react";
import type { Book } from "@/types";
import { CheckIcon, ExternalIcon, LinkIcon } from "./Icon";

interface BookCardProps {
  book: Book;
  index: number;
}

export function BookCard({ book, index }: BookCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(book.url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = book.url;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    }
  };

  return (
    <article className="group relative flex items-center gap-3 rounded-md border border-border-subtle bg-bg-surface px-4 py-3 transition-colors hover:border-border-strong hover:bg-bg-elevated">
      <span
        className="font-mono text-2xs text-fg-muted tabular-nums"
        aria-hidden
      >
        {String(index).padStart(2, "0")}
      </span>

      <a
        href={book.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-w-0 flex-1 items-baseline gap-3 outline-none focus-visible:ring-1 focus-visible:ring-accent/40 rounded-sm"
      >
        <span className="inline-flex shrink-0 items-center rounded border border-border-subtle bg-bg-base px-1.5 py-0.5 font-mono text-2xs uppercase tracking-wider text-fg-secondary">
          {book.area}
        </span>
        <h3 className="min-w-0 truncate text-sm font-medium text-fg-primary transition-colors group-hover:text-accent">
          {book.title}
        </h3>
      </a>

      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          onClick={handleCopy}
          className="flex h-8 w-8 items-center justify-center rounded text-fg-muted transition-colors hover:bg-bg-hover hover:text-fg-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/40"
          aria-label={copied ? "Enlace copiado" : "Copiar enlace"}
          title={copied ? "Copiado" : "Copiar enlace"}
        >
          {copied ? (
            <CheckIcon className="text-accent" />
          ) : (
            <LinkIcon />
          )}
        </button>
        <a
          href={book.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-8 w-8 items-center justify-center rounded text-fg-muted transition-colors hover:bg-bg-hover hover:text-fg-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/40"
          aria-label={`Abrir ${book.title} en una pestaña nueva`}
          title="Abrir en pestaña nueva"
        >
          <ExternalIcon />
        </a>
      </div>
    </article>
  );
}
