import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg-base px-4">
      <div className="max-w-md text-center">
        <p className="font-mono text-2xs uppercase tracking-wider text-fg-muted">
          404
        </p>
        <h1 className="mt-2 font-mono text-2xl font-semibold text-fg-primary">
          Recurso no encontrado
        </h1>
        <p className="mt-3 text-sm text-fg-secondary">
          La página solicitada no existe en el archivo.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-md border border-border bg-bg-surface px-4 py-2 font-mono text-2xs uppercase tracking-wider text-fg-secondary transition-colors hover:border-accent/40 hover:text-accent"
        >
          Volver al índice
        </Link>
      </div>
    </main>
  );
}
