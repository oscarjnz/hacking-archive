import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hacking-archive.local"),
  title: {
    default: "hacking-archive · cybersecurity reading roadmap",
    template: "%s · hacking-archive",
  },
  description:
    "Archivo estructurado de libros de ciberseguridad organizados por nivel y área: Linux, Redes, Seguridad, Pentesting, Malware y más.",
  applicationName: "hacking-archive",
  keywords: [
    "cybersecurity",
    "ciberseguridad",
    "pentesting",
    "linux",
    "malware",
    "roadmap",
    "books",
    "archive",
  ],
  authors: [{ name: "hacking-archive" }],
  openGraph: {
    type: "website",
    title: "hacking-archive · cybersecurity reading roadmap",
    description:
      "Roadmap estructurado de libros de ciberseguridad por nivel y área.",
    siteName: "hacking-archive",
  },
  twitter: {
    card: "summary",
    title: "hacking-archive",
    description:
      "Roadmap estructurado de libros de ciberseguridad por nivel y área.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="bg-bg-base font-sans text-fg-primary antialiased">
        {children}
      </body>
    </html>
  );
}
