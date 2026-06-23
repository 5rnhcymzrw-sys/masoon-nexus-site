import { Link } from "react-router-dom";
import { ReactNode } from "react";

const LegalLayout = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="min-h-screen bg-background text-foreground">
    <header className="border-b border-border">
      <div className="container-px flex items-center justify-between h-20">
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-display text-xl tracking-wide">MASOON</span>
          <span className="font-mono-label text-muted-foreground mt-1">Treuhand</span>
        </Link>
        <Link to="/" className="font-mono-label link-underline">— Zurück zur Startseite</Link>
      </div>
    </header>
    <main className="container-px py-24 md:py-32">
      <div className="max-w-3xl mx-auto">
        <p className="font-mono-label text-muted-foreground mb-6">— {title}</p>
        <h1 className="font-display text-5xl md:text-6xl mb-16">{title}</h1>
        <div className="space-y-12 text-stone leading-relaxed">{children}</div>
      </div>
    </main>
    <footer className="bg-foreground text-background">
      <div className="container-px py-10 flex flex-col md:flex-row justify-between gap-4 text-xs text-background/60">
        <p>2026 MASOON TREUHAND | Alle Rechte vorbehalten.</p>
        <p className="flex gap-6">
          <Link to="/impressum" className="hover:text-background">Impressum</Link>
          <Link to="/datenschutz" className="hover:text-background">Datenschutz</Link>
        </p>
      </div>
    </footer>
  </div>
);

export const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section>
    <h2 className="font-display text-2xl text-foreground mb-4">{title}</h2>
    <div className="space-y-4 whitespace-pre-line">{children}</div>
  </section>
);

export default LegalLayout;
