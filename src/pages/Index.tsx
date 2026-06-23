import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroImg from "@/assets/hero.jpg";

const nav = [
  { id: "unternehmen", label: "Unternehmen" },
  { id: "dienstleistungen", label: "Dienstleistungen" },
  { id: "fachwissen", label: "Fachwissen" },
  { id: "kontakt", label: "Kontakt" },
];

const services = [
  {
    n: "01",
    t: "Administration",
    d: "Wir unterstützen Sie bei administrativen Aufgaben wie Korrespondenz, Offert- und Rechnungswesen, Dokumentenmanagement sowie weiteren organisatorischen Tätigkeiten im Geschäftsalltag.",
    items: [
      "Postadministration",
      "Korrespondenz",
      "Offert- und Rechnungswesen",
      "Dokumentenmanagement",
      "Terminverwaltung",
    ],
  },
  {
    n: "02",
    t: "Buchhaltung",
    d: "Wir übernehmen Ihre Finanzbuchhaltung, Debitoren- und Kreditorenbuchhaltung, den Zahlungsverkehr sowie Mehrwertsteuerabrechnungen zuverlässig, effizient und mit höchster Sorgfalt.",
    items: [
      "Finanzbuchhaltung",
      "Debitorenbuchhaltung",
      "Kreditorenbuchhaltung",
      "Mehrwertsteuerabrechnungen",
      "Digitalisierung Buchhaltung",
    ],
  },
  {
    n: "03",
    t: "Personaladministration",
    d: "Wir begleiten Ihre Personaladministration von Arbeitsverträgen und Lohnbuchhaltung bis zu Sozialversicherungen, Quellensteuerabrechnungen und Behördenmeldungen.",
    items: [
      "Arbeitsverträge",
      "Lohnbuchhaltung",
      "Quellensteuerabrechnungen",
      "Sozialversicherungen",
      "Lohnausweise",
    ],
  },
  {
    n: "04",
    t: "Jahresabschluss",
    d: "Wir erstellen Ihre Zwischen- und Jahresabschlüsse fachgerecht und begleiten Sie bei sämtlichen abschlussrelevanten Fragestellungen mit Präzision und Weitblick.",
    items: [
      "Zwischenabschlüsse",
      "Jahresabschlüsse",
      "Bilanz und Erfolgsrechnung",
      "Anhang und Revisionsunterlagen",
      "Abschlussberatung",
    ],
  },
  {
    n: "05",
    t: "Steuererklärung",
    d: "Wir unterstützen Sie bei Steuererklärungen, Veranlagungskontrollen, Einsprachen sowie steuerlichen Fragestellungen und Optimierungsmöglichkeiten.",
    items: [
      "Steuererklärungen",
      "Veranlagungskontrolle",
      "Einspracheverfahren",
      "Steueroptimierung",
      "Steuervertretung",
    ],
  },
  {
    n: "06",
    t: "Unternehmensberatung",
    d: "Wir begleiten Sie von der Firmengründung bis zu strategischen unternehmerischen Entscheidungen, strukturellen Veränderungen und weiteren unternehmerischen Fragestellungen.",
    items: [
      "Gründungsberatung",
      "Gesellschaftsgründungen",
      "Umstrukturierungen",
      "Umwandlungen",
      "Liquidationen",
    ],
  },
];

const values = [
  {
    n: "01",
    t: "Diskretion",
    d: "Vertrauliche Angelegenheiten erfordern höchste Sorgfalt und absolute Verlässlichkeit.",
  },
  {
    n: "02",
    t: "Präzision",
    d: "Sorgfältige, strukturierte und fachlich fundierte Treuhandarbeit bis ins Detail.",
  },
  {
    n: "03",
    t: "Vertrauen",
    d: "Eine langfristige Zusammenarbeit entsteht durch Klarheit, Verlässlichkeit und transparente Kommunikation.",
  },
];

const insights = [
  { n: "01", t: "Checkliste Steuererklärung", d: "Welche Unterlagen für eine vollständige Steuererklärung benötigt werden." },
  { n: "02", t: "Jahresabschluss vorbereiten", d: "Worauf Unternehmen vor dem Jahresabschluss achten sollten." },
  { n: "03", t: "Buchhaltung digitalisieren", d: "Wie digitale Prozesse die Buchhaltung effizienter und übersichtlicher machen." },
  { n: "04", t: "Lohnadministration", d: "Was bei Löhnen, Sozialversicherungen und Personalunterlagen wichtig ist." },
  { n: "05", t: "Mehrwertsteuer", d: "Wichtige Punkte zur MWST-Pflicht, Abrechnung und Fristen." },
  { n: "06", t: "Unternehmen gründen", d: "Welche administrativen und treuhänderischen Schritte bei der Gründung relevant sind." },
];

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="container-px flex items-center justify-between h-20">
          <a href="#top" className="flex flex-col leading-none">
            <span className="font-display text-xl tracking-wide">MASOON</span>
            <span className="font-mono-label text-muted-foreground mt-1">Treuhand</span>
          </a>
          <nav className="hidden lg:flex items-center gap-10">
            {nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="text-sm link-underline text-foreground/80 hover:text-foreground">
                {n.label}
              </a>
            ))}
          </nav>
          <a href="#kontakt" className="hidden lg:inline-flex font-mono-label border border-foreground px-5 py-3 hover:bg-foreground hover:text-background transition-colors duration-500">
            Kontakt aufnehmen
          </a>
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
          <div className="lg:hidden border-t border-border bg-background animate-fade-in">
            <nav className="container-px flex flex-col py-6 gap-5">
              {nav.map((n) => (
                <a key={n.id} href={`#${n.id}`} onClick={() => setMenuOpen(false)} className="text-base text-foreground/80">
                  {n.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="relative min-h-screen flex items-end overflow-hidden">
        <img
          src={heroImg}
          alt="MASOON Treuhand"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/10 to-background" />
        <div className="relative container-px w-full pb-20 md:pb-32">
          <div className="max-w-4xl animate-fade-up">
            <p className="font-mono-label text-stone mb-8">— MASOON TREUHAND</p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground">
              Treuhand <span className="text-earth">|</span> Buchhaltung <span className="text-earth">|</span> Steuern <span className="text-earth">|</span> Beratung
            </h1>
            <p className="mt-10 max-w-2xl text-lg text-stone leading-relaxed">
              Treuhandlösungen, die präzise auf Ihre unternehmerischen Anforderungen abgestimmt sind.
            </p>
            <p className="mt-6 max-w-2xl text-base text-muted-foreground leading-relaxed">
              Auf der Basis von Diskretion, Präzision und Vertrauen begleiten wir Sie mit fachlicher Klarheit und hohem Anspruch durch alle Phasen Ihres Geschäftslebens.
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-6">
              <a href="#dienstleistungen" className="font-mono-label bg-foreground text-background px-7 py-4 hover:bg-stone transition-colors duration-500">
                Dienstleistungen
              </a>
              <a href="#kontakt" className="font-mono-label link-underline text-foreground">
                Kontakt aufnehmen
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 right-6 md:right-12 font-mono-label text-stone hidden md:block">
          Schlüssel zum Erfolg
        </div>
      </section>

      {/* UNTERNEHMEN */}
      <section id="unternehmen" className="section-y container-px">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4">
            <p className="font-mono-label text-muted-foreground mb-6">— Unternehmen</p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Treuhand mit Struktur und Anspruch.
            </h2>
            <p className="mt-6 text-lg text-stone leading-relaxed">
              Wir schaffen klare Grundlagen für eine zuverlässige und langfristige Zusammenarbeit.
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 space-y-6 text-lg leading-relaxed text-stone">
            <p>
              MASOON TREUHAND begleitet Unternehmen in treuhänderischen und betriebswirtschaftlichen Fragestellungen mit fachlicher Kompetenz und hohem Qualitätsanspruch.
            </p>
            <p>
              Mit modernen digitalen Prozessen, klaren Strukturen und persönlicher Betreuung entwickeln wir effiziente Lösungen, abgestimmt auf die individuellen Anforderungen unserer Mandanten.
            </p>
            <p>
              Ob Buchhaltung, Lohnadministration, Steuern oder Unternehmensberatung, unser Fokus liegt auf einer professionellen Mandatsbetreuung mit klaren Abläufen und hoher Verlässlichkeit.
            </p>
          </div>
        </div>
      </section>

      {/* WERTE */}
      <section className="bg-secondary">
        <div className="container-px section-y">
          <div className="grid lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-5">
              <p className="font-mono-label text-muted-foreground mb-6">— Werte</p>
              <h2 className="font-display text-4xl md:text-5xl leading-tight">
                Diese Werte prägen unsere Treuhandarbeit.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 flex items-end">
              <p className="text-lg text-stone leading-relaxed">
                Wir arbeiten verbindlich, sorgfältig und mit klarem Anspruch an Qualität, damit jedes Mandat sauber und verlässlich geführt wird.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 border-t border-l border-border">
            {values.map((v) => (
              <div key={v.t} className="border-r border-b border-border p-10 bg-background">
                <span className="font-mono-label text-muted-foreground">{v.n}</span>
                <h3 className="font-display text-3xl mt-8 mb-4">{v.t}</h3>
                <p className="text-stone leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIENSTLEISTUNGEN */}
      <section id="dienstleistungen" className="section-y container-px">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5">
            <p className="font-mono-label text-muted-foreground mb-6">— Dienstleistungen</p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Treuhand mit klarer Struktur.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex items-end">
            <p className="text-lg text-stone leading-relaxed">
              Von der laufenden Administration bis zum Jahresabschluss, die Leistungen sind auf eine saubere, effiziente und nachvollziehbare Mandatsführung ausgerichtet.
            </p>
          </div>
        </div>

        <Accordion type="single" collapsible className="border-t border-border">
          {services.map((s) => (
            <AccordionItem key={s.n} value={s.n} className="border-b border-border">
              <AccordionTrigger className="py-8 hover:no-underline group">
                <div className="flex items-baseline gap-8 text-left w-full">
                  <span className="font-mono-label text-muted-foreground w-10 shrink-0">{s.n}</span>
                  <span className="font-display text-2xl md:text-3xl">{s.t}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-10">
                <div className="grid md:grid-cols-12 gap-8 pl-0 md:pl-[72px]">
                  <p className="md:col-span-7 text-stone leading-relaxed text-base">{s.d}</p>
                  <ul className="md:col-span-5 space-y-2">
                    {s.items.map((it) => (
                      <li key={it} className="flex gap-3 text-stone">
                        <span className="text-earth">—</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* FACHWISSEN */}
      <section id="fachwissen" className="bg-secondary">
        <div className="container-px section-y">
          <div className="grid lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-5">
              <p className="font-mono-label text-muted-foreground mb-6">— Fachwissen</p>
              <h2 className="font-display text-4xl md:text-5xl leading-tight">
                Einblicke aus unserer täglichen Arbeit.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 flex items-end">
              <p className="text-lg text-stone leading-relaxed">
                Wir zeigen ausgewählte Fachthemen verständlich und praxisnah, mit Fokus auf klare Entscheidungen und sichere Abläufe im Geschäftsalltag.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 border-t border-l border-border">
            {insights.map((p) => (
              <article key={p.n} className="border-r border-b border-border p-10 bg-background group">
                <div className="flex items-start justify-between mb-10">
                  <span className="font-mono-label text-muted-foreground">{p.n}</span>
                  <span className="h-px w-10 bg-foreground/40 mt-3 group-hover:w-16 transition-all duration-500" />
                </div>
                <h3 className="font-display text-2xl mb-4 leading-snug">{p.t}</h3>
                <p className="text-sm text-stone leading-relaxed mb-8">{p.d}</p>
                <span className="font-mono-label link-underline">— Mehr erfahren</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* KONTAKT */}
      <section id="kontakt" className="section-y container-px">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="font-mono-label text-muted-foreground mb-6">— Kontakt</p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight mb-8 whitespace-pre-line">
              {"Sprechen wir\nüber Ihr Anliegen."}
            </h2>
            <p className="text-lg text-stone leading-relaxed mb-12 max-w-md">
              Wir nehmen uns Zeit für Ihre Anfrage und klären gemeinsam, welche Unterstützung für Ihr Unternehmen sinnvoll ist.
            </p>

            <div className="space-y-8">
              <div>
                <p className="font-mono-label text-muted-foreground mb-3">Kontakt</p>
                <p className="text-foreground leading-relaxed">
                  MASOON TREUHAND<br />
                  Täschmattstrasse 19<br />
                  6015 Luzern
                </p>
                <div className="mt-4 space-y-1">
                  <p><a href="mailto:info@masoontreuhand.ch" className="link-underline">info@masoontreuhand.ch</a></p>
                  <p><a href="tel:+41799663636" className="link-underline">+41 79 966 36 36</a></p>
                  <p className="text-muted-foreground">www.masoontreuhand.ch</p>
                </div>
              </div>
              <div>
                <p className="font-mono-label text-muted-foreground mb-3">Öffnungszeiten</p>
                <div className="grid grid-cols-[max-content_1fr] gap-x-8 gap-y-1 text-foreground">
                  <span>Montag–Freitag</span><span>08.00–12.00 | 13.00–17.00 Uhr</span>
                  <span>Samstag–Sonntag</span><span>geschlossen</span>
                </div>
              </div>
            </div>
          </div>

          <form
            className="lg:col-span-6 lg:col-start-7 bg-secondary p-10 md:p-14"
            onSubmit={(e) => e.preventDefault()}
          >
            <p className="font-display text-2xl mb-3">Kontaktformular</p>
            <p className="text-stone mb-10 leading-relaxed">
              Bitte füllen Sie das folgende Kontaktformular aus. Wir melden uns zeitnah bei Ihnen.
            </p>
            <div className="space-y-8">
              {[
                { id: "nachname", label: "Nachname", type: "text" },
                { id: "vorname", label: "Vorname", type: "text" },
                { id: "email", label: "E-Mail", type: "email" },
                { id: "tel", label: "Telefon", type: "tel" },
              ].map((f) => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="font-mono-label text-muted-foreground block mb-3">
                    {f.label}
                  </label>
                  <input
                    id={f.id}
                    type={f.type}
                    className="w-full border-0 border-b border-border bg-transparent py-3 focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>
              ))}
              <div>
                <label htmlFor="msg" className="font-mono-label text-muted-foreground block mb-3">
                  Nachricht
                </label>
                <textarea
                  id="msg"
                  rows={4}
                  className="w-full border-0 border-b border-border bg-transparent py-3 focus:outline-none focus:border-foreground transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="font-mono-label bg-foreground text-background px-8 py-4 hover:bg-stone transition-colors duration-500 w-full md:w-auto"
              >
                Nachricht senden
              </button>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Mit dem Absenden bestätigen Sie, dass wir Sie zur Bearbeitung Ihrer Anfrage kontaktieren dürfen.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-foreground text-background">
        <div className="container-px py-20">
          <div className="grid md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-5">
              <p className="font-display text-3xl">MASOON TREUHAND</p>
              <p className="font-mono-label text-background/60 mt-3">Schlüssel zum Erfolg</p>
            </div>
            <div className="md:col-span-3 md:col-start-7">
              <p className="font-mono-label text-background/50 mb-5">Navigation</p>
              <ul className="space-y-3">
                {nav.map((n) => (
                  <li key={n.id}>
                    <a href={`#${n.id}`} className="text-background/80 hover:text-background">
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-3">
              <p className="font-mono-label text-background/50 mb-5">Kontakt</p>
              <ul className="space-y-2 text-background/80">
                <li>MASOON TREUHAND</li>
                <li>Täschmattstrasse 19</li>
                <li>6015 Luzern</li>
                <li>info@masoontreuhand.ch</li>
                <li>+41 79 966 36 36</li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-background/15 flex flex-col md:flex-row justify-between gap-4 text-xs text-background/60">
            <p>2026 MASOON TREUHAND | Alle Rechte vorbehalten.</p>
            <p className="flex gap-6">
              <Link to="/impressum" className="hover:text-background">Impressum</Link>
              <Link to="/datenschutz" className="hover:text-background">Datenschutz</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
