import { useState } from "react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/portraits/v01.png.asset.json";
import unternehmenImg from "@/assets/portraits/a01-2.png.asset.json";
import insight1 from "@/assets/preview/a01.jpg.asset.json";
import insight2 from "@/assets/preview/a02.png.asset.json";
import insight3 from "@/assets/preview/a06.png.asset.json";
import insight4 from "@/assets/preview/a08.png.asset.json";
import insight5 from "@/assets/preview/a01.png.asset.json";
import insight6 from "@/assets/preview/a12.png.asset.json";
import insight7 from "@/assets/preview/a02.png.asset.json";

const nav = [
  { id: "unternehmen", label: "UNTERNEHMEN" },
  { id: "dienstleistungen", label: "DIENSTLEISTUNGEN" },
  { id: "fachwissen", label: "FACHWISSEN" },
  { id: "kontakt", label: "KONTAKT" },
];

const services = [
  {
    n: "01",
    t: "Administration",
    d: "Wir unterstützen Sie bei administrativen Aufgaben im Geschäftsalltag, von Korrespondenz und Dokumentenablage bis zur Termin- und Fristenverwaltung. So bleiben interne Abläufe sauber organisiert und nachvollziehbar.",
    items: ["Postadministration", "Korrespondenz", "Offert- und Rechnungswesen", "Dokumentenmanagement", "Terminverwaltung"],
  },
  {
    n: "02",
    t: "Buchhaltung",
    d: "Wir führen Ihre Finanzbuchhaltung, Debitoren- und Kreditorenbuchhaltung sowie den Zahlungsverkehr zuverlässig und termingerecht. Auch Mehrwertsteuerabrechnungen und digitale Buchhaltungsprozesse werden sauber betreut.",
    items: ["Finanzbuchhaltung", "Debitorenbuchhaltung", "Kreditorenbuchhaltung", "Mehrwertsteuerabrechnungen", "Digitalisierung Buchhaltung"],
  },
  {
    n: "03",
    t: "Personaladministration",
    d: "Wir begleiten Ihre Personaladministration von Arbeitsverträgen über Lohnbuchhaltung bis zu Sozialversicherungen und Quellensteuerabrechnungen. Lohnläufe, Lohnausweise und Behördenmeldungen werden korrekt verarbeitet.",
    items: ["Arbeitsverträge", "Lohnbuchhaltung", "Quellensteuerabrechnungen", "Sozialversicherungen", "Lohnausweise"],
  },
  {
    n: "04",
    t: "Jahresabschluss",
    d: "Wir erstellen Zwischen- und Jahresabschlüsse fachgerecht und stimmen die relevanten Konten sorgfältig ab. Dabei achten wir auf klare Unterlagen, nachvollziehbare Zahlen und eine saubere Abschlussdokumentation.",
    items: ["Zwischenabschlüsse", "Jahresabschlüsse", "Bilanz und Erfolgsrechnung", "Anhang und Revisionsunterlagen", "Abschlussberatung"],
  },
  {
    n: "05",
    t: "Steuererklärung",
    d: "Wir unterstützen Sie bei Steuererklärungen, Veranlagungskontrollen, Einsprachen und steuerlichen Fragestellungen. Ziel ist eine korrekte Deklaration mit Blick auf mögliche Optimierungen.",
    items: ["Steuererklärungen", "Veranlagungskontrolle", "Einspracheverfahren", "Steueroptimierung", "Steuervertretung"],
  },
  {
    n: "06",
    t: "Unternehmensberatung",
    d: "Wir begleiten Sie bei Firmengründungen, strukturellen Veränderungen und betriebswirtschaftlichen Entscheidungen. Dabei stehen klare Grundlagen, realistische Einschätzungen und umsetzbare Lösungen im Vordergrund.",
    items: ["Gründungsberatung", "Gesellschaftsgründungen", "Umstrukturierungen", "Umwandlungen", "Liquidationen"],
  },
];

const values = [
  { n: "01", t: "Diskretion", d: "Vertrauliche Angelegenheiten erfordern höchste Sorgfalt und absolute Verlässlichkeit." },
  { n: "02", t: "Präzision", d: "Sorgfältige, strukturierte und fachlich fundierte Treuhandarbeit bis ins Detail." },
  { n: "03", t: "Vertrauen", d: "Eine langfristige Zusammenarbeit entsteht durch Klarheit, Verlässlichkeit und transparente Kommunikation." },
];

const insights = [
  { n: "01", t: "Checkliste für Ihre Steuererklärung", d: "Eine vollständige Übersicht der wichtigsten Unterlagen für eine korrekt vorbereitete Steuererklärung.", img: insight1.url },
  { n: "02", t: "Unternehmen gründen in der Schweiz: Welche Rechtsform passt?", d: "Die Wahl der Rechtsform beeinflusst Haftung, Steuern, Sozialversicherungen und die spätere Entwicklung des Unternehmens.", img: insight2.url },
  { n: "03", t: "Verwaltungsrat: Aufgaben, Verantwortung und Haftungsrisiken", d: "Der Verwaltungsrat trägt die oberste Verantwortung für Führung, Organisation und finanzielle Kontrolle der Gesellschaft.", img: insight3.url },
  { n: "04", t: "Kündigung Arbeitsvertrag: Fristen, Form und Sperrfristen", d: "Eine Kündigung muss korrekt vorbereitet werden, damit Fristen, Formvorschriften und Sperrfristen eingehalten werden.", img: insight4.url },
  { n: "05", t: "Unwahre Buchführung: Warum eine saubere Buchhaltung rechtlich wichtig ist", d: "Eine saubere Buchhaltung ist Grundlage für Jahresabschluss, Steuern, MWST, Löhne und unternehmerische Entscheidungen.", img: insight5.url },
  { n: "06", t: "Gewinnverteilung, Reserven und Verlustvortrag: Was Unternehmen beachten müssen", d: "Gewinnverwendung, Reserven und Verlustvortrag müssen vor einer Ausschüttung rechtlich und steuerlich korrekt beurteilt werden.", img: insight6.url },
  { n: "07", t: "Missbräuchliche Konkurse: Was die Regeln seit 01.01.2025 für Unternehmen bedeuten", d: "Seit 01.01.2025 gelten strengere Regeln, damit finanzielle Pflichten nicht durch wiederholte oder gezielte Konkurse umgangen werden.", img: insight7.url },
];

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openService, setOpenService] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <div className="container-px flex items-center justify-between h-16 md:h-[76px]">
          <a href="#top" className="font-nav text-foreground text-[0.74rem] md:text-[0.8rem] tracking-[0.2em]">
            MASOON TREUHAND
          </a>
          <nav className="hidden lg:flex items-center font-nav text-muted-foreground tracking-[0.2em] text-[0.7rem]">
            {nav.map((n, i) => (
              <span key={n.id} className="flex items-center">
                <a href={`#${n.id}`} className="px-5 hover:text-foreground transition-colors">
                  {n.label}
                </a>
                {i < nav.length - 1 && <span className="text-border">|</span>}
              </span>
            ))}
          </nav>
          <button
            aria-label="Menu"
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={`h-px w-6 bg-foreground transition-transform ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-foreground transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`h-px w-6 bg-foreground transition-transform ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden border-t border-border bg-background">
            <nav className="container-px flex flex-col py-6 gap-5 font-nav tracking-[0.2em]">
              {nav.map((n) => (
                <a key={n.id} href={`#${n.id}`} onClick={() => setMenuOpen(false)} className="text-foreground">
                  {n.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* HERO – Split Screen */}
      <section id="top" className="relative pt-16 md:pt-[76px]">
        <div className="grid lg:grid-cols-2 min-h-[calc(100vh-76px)]">
          <div className="flex items-center bg-background">
            <div className="px-6 md:px-12 lg:px-20 py-20 lg:py-0 max-w-xl">
              <p className="font-mono-label text-muted-foreground mb-8">— MASOON TREUHAND</p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-foreground">
                MASOON<br />TREUHAND
              </h1>
              <div className="hairline my-10 max-w-[120px]" />
              <p className="font-nav text-muted-foreground tracking-[0.22em] text-[0.78rem]">
                TREUHAND <span className="text-border mx-2">|</span> BUCHHALTUNG <span className="text-border mx-2">|</span> STEUERN <span className="text-border mx-2">|</span> BERATUNG
              </p>
              <p className="mt-10 text-base md:text-lg text-stone leading-[1.85] font-light">
                Auf der Basis von <span className="font-medium text-foreground">Diskretion</span> | <span className="font-medium text-foreground">Präzision</span> | <span className="font-medium text-foreground">Vertrauen</span> begleiten wir Sie mit fachlicher Klarheit und hohem Anspruch durch alle Phasen Ihres Geschäftslebens.
              </p>
            </div>
          </div>
          <div className="relative min-h-[420px] lg:min-h-0 overflow-hidden">
            <img
              src={heroImg.url}
              alt="MASOON Treuhand"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* UNTERNEHMEN */}
      <section id="unternehmen" className="section-y container-px">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7 space-y-6">
            <p className="font-mono-label text-muted-foreground mb-4">— UNTERNEHMEN</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-[2.25rem] leading-tight">
              Treuhand mit Struktur und Anspruch.
            </h2>
            <p className="text-base md:text-lg text-stone leading-relaxed">
              Wir schaffen klare Grundlagen für eine zuverlässige und langfristige Zusammenarbeit.
            </p>
            <div className="space-y-5 text-base leading-relaxed text-stone pt-4">
              <p>MASOON TREUHAND begleitet Unternehmen in treuhänderischen und betriebswirtschaftlichen Fragestellungen mit fachlicher Kompetenz und hohem Qualitätsanspruch.</p>
              <p>Mit modernen digitalen Prozessen, klaren Strukturen und persönlicher Betreuung entwickeln wir effiziente Lösungen, abgestimmt auf die individuellen Anforderungen unserer Mandanten.</p>
              <p>Ob Buchhaltung, Lohnadministration, Steuern oder Unternehmensberatung, unser Fokus liegt auf einer professionellen Mandatsbetreuung mit klaren Abläufen und hoher Verlässlichkeit.</p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <img src={unternehmenImg.url} alt="MASOON Treuhand Unternehmen" className="w-full h-auto object-cover" />
          </div>
        </div>
      </section>

      {/* WERTE */}
      <section className="bg-[hsl(var(--surface-2))]">
        <div className="container-px section-y">
          <div className="max-w-3xl mb-14">
            <p className="font-mono-label text-muted-foreground mb-5">— WERTE</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-[2.25rem] leading-tight mb-6">
              Diese Werte prägen unsere Treuhandarbeit.
            </h2>
            <p className="text-base md:text-lg text-stone leading-relaxed">
              Wir arbeiten verbindlich, sorgfältig und mit klarem Anspruch an Qualität, damit jedes Mandat sauber und verlässlich geführt wird.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10 md:gap-14 border-t border-border pt-12">
            {values.map((v) => (
              <div key={v.t}>
                <span className="font-mono-label text-muted-foreground">{v.n}</span>
                <h3 className="font-display text-xl md:text-2xl mt-5 mb-4">{v.t}</h3>
                <p className="text-stone leading-relaxed text-sm md:text-base">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIENSTLEISTUNGEN */}
      <section id="dienstleistungen" className="section-y container-px">
        <div className="max-w-3xl mb-14">
          <p className="font-mono-label text-muted-foreground mb-5">— DIENSTLEISTUNGEN</p>
          <h2 className="font-display text-2xl md:text-3xl lg:text-[2.25rem] leading-tight mb-6">
            Dienstleistungen mit klarem Fokus.
          </h2>
          <p className="text-base md:text-lg text-stone leading-relaxed">
            Von der laufenden Administration bis zum Jahresabschluss, die Leistungen sind auf eine saubere, effiziente und nachvollziehbare Mandatsführung ausgerichtet.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 border-t border-l border-border">
          {services.map((s) => {
            const open = openService === s.n;
            return (
              <div key={s.n} className="border-r border-b border-border p-8 lg:p-10 flex flex-col">
                <span className="font-mono-label text-muted-foreground">{s.n}</span>
                <h3 className="font-display text-xl md:text-[1.4rem] mt-5 mb-4 leading-snug">{s.t}</h3>
                <p className="text-sm md:text-[0.95rem] text-stone leading-[1.75]">{s.d}</p>
                {open && (
                  <ul className="mt-6 space-y-2 text-sm text-stone">
                    {s.items.map((it) => (
                      <li key={it}>— {it}</li>
                    ))}
                  </ul>
                )}
                <button
                  type="button"
                  onClick={() => setOpenService(open ? null : s.n)}
                  className="font-mono-label link-underline self-start mt-6"
                >
                  {open ? "— Weniger" : "— Mehr"}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* FACHWISSEN */}
      <section id="fachwissen" className="bg-[hsl(var(--surface-2))]">
        <div className="container-px section-y">
          <div className="max-w-3xl mb-14">
            <p className="font-mono-label text-muted-foreground mb-5">— FACHWISSEN</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-[2.25rem] leading-tight mb-6">
              Einblicke aus unserer täglichen Arbeit.
            </h2>
            <p className="text-base md:text-lg text-stone leading-relaxed">
              Wir zeigen ausgewählte Fachthemen verständlich und praxisnah, mit Fokus auf klare Entscheidungen und sichere Abläufe im Geschäftsalltag.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14 border-t border-border pt-12">
            {insights.map((p) => (
              <article key={p.n} className="flex flex-col">
                <div className="aspect-[16/10] w-full overflow-hidden mb-6 bg-secondary">
                  <img src={p.img} alt={p.t} className="w-full h-full object-cover" />
                </div>
                <span className="font-mono-label text-muted-foreground mb-3">{p.n}</span>
                <h3 className="font-display text-lg md:text-xl mb-3 leading-snug">{p.t}</h3>
                <p className="text-sm text-stone leading-[1.75] mb-5">{p.d}</p>
                <a href="#" className="font-mono-label link-underline self-start">— Mehr erfahren</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* KONTAKT */}
      <section id="kontakt" className="section-y container-px border-t border-border">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="font-mono-label text-muted-foreground mb-5">— KONTAKT</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl leading-tight mb-6">
              Sprechen wir über Ihr Anliegen.
            </h2>
            <p className="text-base md:text-lg text-stone leading-relaxed max-w-md">
              Wir nehmen uns Zeit für Ihre Anfrage und klären gemeinsam, welche Unterstützung für Ihr Unternehmen sinnvoll ist.
            </p>
          </div>

          <form className="lg:col-span-7 space-y-7" onSubmit={(e) => e.preventDefault()}>
            {[
              { id: "nachname", label: "NACHNAME", type: "text" },
              { id: "vorname", label: "VORNAME", type: "text" },
              { id: "email", label: "E-MAIL", type: "email" },
              { id: "tel", label: "TELEFON", type: "tel" },
            ].map((f) => (
              <div key={f.id}>
                <label htmlFor={f.id} className="font-mono-label text-muted-foreground block mb-3">
                  {f.label}
                </label>
                <input
                  id={f.id}
                  type={f.type}
                  className="w-full border-0 border-b border-border bg-transparent py-2 focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
            ))}
            <div>
              <label htmlFor="msg" className="font-mono-label text-muted-foreground block mb-3">
                NACHRICHT
              </label>
              <textarea
                id="msg"
                rows={4}
                className="w-full border-0 border-b border-border bg-transparent py-2 focus:outline-none focus:border-foreground transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="font-mono-label bg-foreground text-background px-8 py-4 hover:bg-stone transition-colors duration-500"
            >
              NACHRICHT SENDEN
            </button>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Mit dem Absenden bestätigen Sie, dass wir Sie zur Bearbeitung Ihrer Anfrage kontaktieren dürfen.
            </p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-foreground text-background">
        <div className="container-px py-16 md:py-20">
          <div className="grid md:grid-cols-3 gap-10 mb-14">
            <div>
              <p className="font-nav text-sm tracking-[0.22em]">— MASOON TREUHAND</p>
            </div>
            <div>
              <p className="font-mono-label text-background/60 mb-4">KONTAKT</p>
              <ul className="space-y-1 text-sm text-background/85">
                <li>MASOON TREUHAND</li>
                <li>Täschmattstrasse 19</li>
                <li>6015 Luzern</li>
                <li className="pt-2"><a href="mailto:info@masoontreuhand.ch" className="hover:text-background">info@masoontreuhand.ch</a></li>
                <li><a href="tel:+41799663636" className="hover:text-background">+41 79 966 36 36</a></li>
              </ul>
            </div>
            <div>
              <p className="font-mono-label text-background/60 mb-4">ÖFFNUNGSZEITEN</p>
              <ul className="space-y-1 text-sm text-background/85">
                <li>Montag-Freitag</li>
                <li>08.00-12.00 <span className="text-background/50">|</span> 13.00-17.00 Uhr</li>
                <li className="pt-2">Samstag-Sonntag geschlossen</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-background/15 flex flex-col md:flex-row justify-between gap-3 text-xs text-background/60">
            <p>2026 MASOON TREUHAND <span className="mx-1">|</span> Alle Rechte vorbehalten.</p>
            <p className="flex gap-4">
              <Link to="/impressum" className="hover:text-background">Impressum</Link>
              <span>|</span>
              <Link to="/datenschutz" className="hover:text-background">Datenschutz</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
