"use client";

import { useEffect, useRef } from "react";
import { SearchIcon, XIcon } from "./Icon";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
}

export function SearchBar({ value, onChange, resultCount }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        onChange("");
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onChange]);

  return (
    <div className="group relative flex items-center">
      <span
        className="pointer-events-none absolute left-3 text-fg-muted transition-colors group-focus-within:text-accent"
        aria-hidden
      >
        <SearchIcon />
      </span>
      <input
        ref={inputRef}
        type="search"
        inputMode="search"
        spellCheck={false}
        autoComplete="off"
        aria-label="Buscar libros por título o área"
        placeholder="Buscar libro o área…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-md border border-border bg-bg-surface pl-9 pr-24 font-mono text-sm text-fg-primary placeholder:text-fg-muted outline-none transition-colors focus:border-accent/60 focus:ring-1 focus:ring-accent/30"
      />
      <div className="pointer-events-none absolute right-2 flex items-center gap-2 font-mono text-2xs text-fg-muted">
        {value ? (
          <button
            type="button"
            onClick={() => onChange("")}
            className="pointer-events-auto flex h-6 w-6 items-center justify-center rounded text-fg-muted transition-colors hover:bg-bg-hover hover:text-fg-primary"
            aria-label="Limpiar búsqueda"
          >
            <XIcon width={14} height={14} />
          </button>
        ) : (
          <kbd className="rounded border border-border bg-bg-base px-1.5 py-0.5">
            ⌘K
          </kbd>
        )}
        <span className="tabular-nums">{resultCount}</span>
      </div>
    </div>
  );
}
