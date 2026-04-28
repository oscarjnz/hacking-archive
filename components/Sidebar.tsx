"use client";

import type { LevelGroup } from "@/types";
import { cn } from "@/lib/utils";

interface SidebarProps {
  groups: Array<{ group: LevelGroup; visibleCount: number }>;
  activeLevel: number | null;
}

export function Sidebar({ groups, activeLevel }: SidebarProps) {
  return (
    <nav
      aria-label="Navegación por niveles"
      className="sticky top-6 hidden w-52 shrink-0 self-start lg:block"
    >
      <p className="mb-3 font-mono text-2xs uppercase tracking-wider text-fg-muted">
        Roadmap
      </p>
      <ul className="space-y-0.5">
        {groups.map(({ group, visibleCount }) => {
          const isActive = activeLevel === group.level;
          const total = group.books.length;
          return (
            <li key={group.level}>
              <a
                href={`#nivel-${group.level}`}
                className={cn(
                  "flex items-center gap-3 rounded-md border-l-2 px-3 py-2 transition-colors",
                  isActive
                    ? "border-accent bg-accent-subtle/30 text-fg-primary"
                    : "border-transparent text-fg-secondary hover:border-border-strong hover:bg-bg-surface hover:text-fg-primary",
                )}
              >
                <span className="font-mono text-2xs tabular-nums text-fg-muted">
                  0{group.level}
                </span>
                <span className="flex-1 text-sm">{group.label}</span>
                <span className="font-mono text-2xs tabular-nums text-fg-muted">
                  {visibleCount === total ? total : `${visibleCount}/${total}`}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
