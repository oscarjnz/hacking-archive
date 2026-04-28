export function Footer() {
  return (
    <footer className="mt-16 border-t border-border-subtle">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-4 py-6 font-mono text-2xs text-fg-muted md:flex-row md:items-center md:px-8">
        <p>
          Recursos alojados en{" "}
          <a
            href="https://archive.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg-secondary underline-offset-2 hover:text-accent hover:underline"
          >
            archive.org
          </a>
          . Sólo con fines educativos.
        </p>
        <p>
          <span className="text-fg-secondary">hacking-archive</span> · build
          static · open access
        </p>
      </div>
    </footer>
  );
}
