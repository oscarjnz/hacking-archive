import { TerminalIcon } from "./Icon";

interface HeaderProps {
  totalBooks: number;
  totalLevels: number;
  totalAreas: number;
}

export function Header({ totalBooks, totalLevels, totalAreas }: HeaderProps) {
  return (
    <header className="border-b border-border-subtle bg-bg-base/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-5 md:px-8">
        <div className="flex items-center gap-3">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-bg-surface text-accent"
            aria-hidden
          >
            <TerminalIcon width={18} height={18} />
          </span>
          <div className="leading-tight">
            <h1 className="font-mono text-base font-semibold tracking-tight text-fg-primary">
              hacking-archive
            </h1>
            <p className="font-mono text-2xs text-fg-muted">
              cybersecurity reading roadmap
            </p>
          </div>
        </div>
        <dl className="hidden items-center gap-6 font-mono text-2xs text-fg-secondary sm:flex">
          <Stat label="books" value={totalBooks} />
          <Stat label="levels" value={totalLevels} />
          <Stat label="areas" value={totalAreas} />
        </dl>
      </div>
    </header>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-end leading-none">
      <dt className="text-fg-muted uppercase tracking-wider">{label}</dt>
      <dd className="mt-1 text-sm text-fg-primary tabular-nums">{value}</dd>
    </div>
  );
}
