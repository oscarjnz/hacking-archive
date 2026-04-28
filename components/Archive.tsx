"use client";

import { useEffect, useMemo, useState } from "react";
import type { Area, LevelGroup } from "@/types";
import { ALL_AREAS, BOOKS, LEVEL_GROUPS } from "@/data/books";
import { normalize } from "@/lib/utils";
import { AreaFilter } from "./AreaFilter";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { LevelSection } from "./LevelSection";
import { SearchBar } from "./SearchBar";
import { Sidebar } from "./Sidebar";

const TOTAL_BOOKS = BOOKS.length;
const TOTAL_LEVELS = LEVEL_GROUPS.length;
const TOTAL_AREAS = ALL_AREAS.length;

const AREA_COUNTS = ALL_AREAS.reduce<Record<Area, number>>(
  (acc, area) => {
    acc[area] = BOOKS.filter((b) => b.area === area).length;
    return acc;
  },
  {} as Record<Area, number>,
);

export function Archive() {
  const [query, setQuery] = useState("");
  const [activeAreas, setActiveAreas] = useState<Set<Area>>(new Set());
  const [collapsed, setCollapsed] = useState<Set<number>>(new Set());
  const [activeLevel, setActiveLevel] = useState<number | null>(1);

  const filteredGroups = useMemo<
    Array<{ group: LevelGroup; visibleCount: number }>
  >(() => {
    const needle = normalize(query.trim());
    return LEVEL_GROUPS.map((group) => {
      const books = group.books.filter((book) => {
        const areaOk =
          activeAreas.size === 0 || activeAreas.has(book.area);
        if (!areaOk) return false;
        if (!needle) return true;
        return (
          normalize(book.title).includes(needle) ||
          normalize(book.area).includes(needle) ||
          normalize(group.label).includes(needle)
        );
      });
      return {
        group: { ...group, books },
        visibleCount: books.length,
      };
    });
  }, [query, activeAreas]);

  const totalVisible = useMemo(
    () => filteredGroups.reduce((acc, g) => acc + g.visibleCount, 0),
    [filteredGroups],
  );

  const toggleArea = (area: Area) => {
    setActiveAreas((prev) => {
      const next = new Set(prev);
      if (next.has(area)) next.delete(area);
      else next.add(area);
      return next;
    });
  };

  const clearAreas = () => setActiveAreas(new Set());

  const toggleLevel = (level: number) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(level)) next.delete(level);
      else next.add(level);
      return next;
    });
  };

  const collapseAll = () =>
    setCollapsed(new Set(LEVEL_GROUPS.map((g) => g.level)));
  const expandAll = () => setCollapsed(new Set());

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sections = LEVEL_GROUPS.map((g) =>
      document.getElementById(`nivel-${g.level}`),
    ).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (top) {
          const id = top.target.id;
          const match = id.match(/nivel-(\d+)/);
          if (match && match[1]) setActiveLevel(Number(match[1]));
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const allCollapsed = collapsed.size === LEVEL_GROUPS.length;

  return (
    <div className="min-h-screen bg-bg-base text-fg-primary">
      <Header
        totalBooks={TOTAL_BOOKS}
        totalLevels={TOTAL_LEVELS}
        totalAreas={TOTAL_AREAS}
      />

      <main className="mx-auto flex max-w-6xl gap-8 px-4 py-8 md:px-8">
        <Sidebar groups={filteredGroups} activeLevel={activeLevel} />

        <div className="min-w-0 flex-1">
          <section
            aria-label="Filtros y búsqueda"
            className="mb-6 flex flex-col gap-3"
          >
            <SearchBar
              value={query}
              onChange={setQuery}
              resultCount={totalVisible}
            />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <AreaFilter
                areas={ALL_AREAS}
                active={activeAreas}
                counts={AREA_COUNTS}
                onToggle={toggleArea}
                onClear={clearAreas}
              />
              <button
                type="button"
                onClick={allCollapsed ? expandAll : collapseAll}
                className="h-8 rounded-md border border-border bg-bg-surface px-3 font-mono text-2xs uppercase tracking-wider text-fg-secondary transition-colors hover:border-border-strong hover:text-fg-primary"
              >
                {allCollapsed ? "Expandir todo" : "Plegar todo"}
              </button>
            </div>
          </section>

          {totalVisible === 0 ? (
            <div className="rounded-md border border-dashed border-border-subtle bg-bg-surface/40 px-6 py-12 text-center">
              <p className="font-mono text-sm text-fg-secondary">
                No hay resultados para los filtros actuales.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  clearAreas();
                }}
                className="mt-3 font-mono text-2xs uppercase tracking-wider text-accent hover:underline"
              >
                Restablecer filtros
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredGroups.map(({ group }) => (
                <LevelSection
                  key={group.level}
                  level={group.level}
                  label={group.label}
                  description={group.description}
                  books={group.books}
                  totalInLevel={
                    LEVEL_GROUPS.find((g) => g.level === group.level)?.books
                      .length ?? group.books.length
                  }
                  collapsed={collapsed.has(group.level)}
                  onToggle={() => toggleLevel(group.level)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
