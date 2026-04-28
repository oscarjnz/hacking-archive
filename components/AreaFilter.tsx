"use client";

import type { Area } from "@/types";
import { cn } from "@/lib/utils";

interface AreaFilterProps {
  areas: Area[];
  active: Set<Area>;
  counts: Record<Area, number>;
  onToggle: (area: Area) => void;
  onClear: () => void;
}

export function AreaFilter({
  areas,
  active,
  counts,
  onToggle,
  onClear,
}: AreaFilterProps) {
  const hasActive = active.size > 0;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={onClear}
        className={cn(
          "h-8 rounded-md border px-3 font-mono text-2xs uppercase tracking-wider transition-colors",
          !hasActive
            ? "border-accent/40 bg-accent-subtle/40 text-accent"
            : "border-border bg-bg-surface text-fg-secondary hover:border-border-strong hover:text-fg-primary",
        )}
        aria-pressed={!hasActive}
      >
        Todas
      </button>
      {areas.map((area) => {
        const isActive = active.has(area);
        return (
          <button
            key={area}
            type="button"
            onClick={() => onToggle(area)}
            className={cn(
              "h-8 rounded-md border px-3 font-mono text-2xs uppercase tracking-wider transition-colors",
              isActive
                ? "border-accent/40 bg-accent-subtle/40 text-accent"
                : "border-border bg-bg-surface text-fg-secondary hover:border-border-strong hover:text-fg-primary",
            )}
            aria-pressed={isActive}
          >
            {area}
            <span
              className={cn(
                "ml-1.5 text-2xs tabular-nums",
                isActive ? "text-accent/70" : "text-fg-muted",
              )}
            >
              {counts[area] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}
