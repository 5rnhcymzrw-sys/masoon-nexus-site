import { useEffect, useState } from "react";
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
    items: ["Postadministration", "Korrespondenz", "Offert- und Rechnungswesen", "Dokumentenmanagement", "Terminverwaltung"],
  },
  {
    n: "02",
    t: "Buchhaltung",
    d: "Wir übernehmen Ihre Finanzbuchhaltung, Debitoren- und Kreditorenbuchhaltung, den Zahlungsverkehr sowie Mehrwertsteuerabrechnungen zuverlässig, effizient und mit höchster Sorgfalt.",
    items: ["Finanzbuchhaltung", "Debitorenbuchhaltung", "Kreditorenbuchhaltung", "Mehrwertsteuerabrechnungen", "Digitalisierung Buchhaltung"],
  },
  {
    n: "03",
    t: "Personaladministration",
    d: "Wir begleiten Ihre Personaladministration von Arbeitsverträgen und Lohnbuchhaltung bis zu Sozialversicherungen, Quellensteuerabrechnungen und Behördenmeldungen.",
    items: ["Arbeitsverträge", "Lohnbuchhaltung", "Quellensteuerabrechnungen", "Sozialversicherungen", "Lohnausweise"],
  },
  {
    n: "04",
    t: "Jahresabschluss",
    d: "Wir erstellen Ihre Zwischen- und Jahresabschlüsse fachgerecht und begleiten Sie bei sämtlichen abschlussrelevanten Fragestellungen mit Präzision und Weitblick.",
    items: ["Zwischenabschlüsse", "Jahresabschlüsse", "Bilanz und Erfolgsrechnung", "Anhang und Revisionsunterlagen", "Abschlussberatung"],
  },
  {
    n: "05",
    t: "Steuererklärung",
    d: "Wir unterstützen Sie bei Steuererklärungen, Veranlagungskontrollen, Einsprachen sowie steuerlichen Fragestellungen und Optimierungsmöglichkeiten.",
    items: ["Steuererklärungen", "Veranlagungskontrolle", "Einspracheverfahren", "Steueroptimierung", "Steuervertretung"],
  },
  {
    n: "06",
    t: "Unternehmensberatung",
    d: "Wir begleiten Sie von der Firmengründung bis zu strategischen unternehmerischen Entscheidungen, strukturellen Veränderungen und weiteren unternehmerischen Fragestellungen.",
    items: ["Gründungsberatung", "Gesellschaftsgründungen", "Umstrukturierungen", "Umwandlungen", "Liquidationen"],
  },
];

const values = [
  { t: "Diskretion", d: "Vertrauliche Angelegenheiten erfordern höchste Sorgfalt und absolute Verlässlichkeit." },
  { t: "Präzision", d: "Sorgfältige, strukturierte und fachlich fundierte Treuhandarbeit bis ins Detail." },
  { t: "Vertrauen", d: "Eine langfristige Zusammenarbeit basiert auf Verlässlichkeit, Klarheit und persönlicher Verantwortung." },
];

const insights = [
  { tag: "Steuern", t: "Checkliste Steuererklärung", d: "Übersicht der wichtigsten Unterlagen und Belege, die Sie für Ihre Steuererklärung im Kanton Luzern bereithalten sollten." },
  { tag: "Vorsorge", t: "Sozialversicherungen", d: "AHV, IV, EO, ALV, BVG und UVG — die Grundlagen des Schweizer Sozialversicherungssystems verständlich erklärt." },
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
          <a href="#top" className="flex items-center gap-3 leading-none" aria-label="MASOON TREUHAND">
            <span className="flex flex-col">
              <span className="font-display text-base tracking-[0.18em]">MASOON</span>
              <span className="font-mono-label text-muted-foreground mt-1 text-[0.6rem]">Treuhand</span>
            </span>
          </a>
          <nav className="hidden lg:flex items-center gap-10">
            {nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="text-sm link-underline text-foreground/80 hover:text-foreground">
                {n.label}
              </a>
            ))}
          </nav>
          <a href="#kontakt" className="hidden lg:inline-flex font-mono-label border border-foreground px-5 py-3 hover:bg-foreground hover:text-background transition-colors duration-500">
            Termin anfragen
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
          alt="Luzern Landschaft im Morgenlicht"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/10 to-background" />
        <div className="relative container-px w-full pb-20 md:pb-32">
          <div className="max-w-4xl animate-fade-up">
            <p className="font-mono-label text-stone mb-8">Treuhand &middot; Luzern</p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.02] text-foreground">
              Treuhand <span className="text-earth">|</span> Buchhaltung <span className="text-earth">|</span> Steuern <span className="text-earth">|</span> Beratung
            </h1>
            <p className="mt-10 max-w-xl text-lg text-muted-foreground leading-relaxed">
              MASOON TREUHAND begleitet KMU, Selbstständige und Privatpersonen in Luzern und Umgebung —
              mit Diskretion, Präzision und unternehmerischem Weitblick.
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
              Treuhand mit fachlicher Kompetenz und Qualitätsanspruch.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 space-y-6 text-lg leading-relaxed text-stone">
            <p>
              MASOON TREUHAND begleitet Unternehmen in treuhänderischen und unternehmerischen
              Fragestellungen mit fachlicher Kompetenz und einem hohen Qualitätsanspruch.
            </p>
            <p>
              Mit modernen digitalen Prozessen, klaren Strukturen und persönlicher Betreuung
              entwickeln wir effiziente Lösungen, abgestimmt auf die individuellen Anforderungen
              unserer Kundschaft.
            </p>
            <p>
              Ob Buchhaltung, Lohnadministration, Steuern oder Unternehmensberatung — unser Fokus
              liegt auf einer zuverlässigen, professionellen und langfristigen Zusammenarbeit.
            </p>
            <div className="pt-8 grid grid-cols-3 gap-6 border-t border-border">
              {[
                ["KMU", "Kleinst- und Kleinunternehmen"],
                ["Selbstständige", "Einzelfirmen und Freischaffende"],
                ["Privat", "Privatpersonen und Familien"],
              ].map(([t, d]) => (
                <div key={t}>
                  <p className="font-display text-2xl mt-6">{t}</p>
                  <p className="text-sm text-muted-foreground mt-2">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DIENSTLEISTUNGEN */}
      <section id="dienstleistungen" className="bg-secondary">
        <div className="container-px section-y">
          <div className="grid lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-5">
              <p className="font-mono-label text-muted-foreground mb-6">— Dienstleistungen</p>
              <h2 className="font-display text-4xl md:text-5xl leading-tight">
                Sechs Kompetenzen.<br />Ein verlässlicher Partner.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 flex items-end">
              <p className="text-lg text-stone leading-relaxed">
                Vom täglichen Buchungsgeschäft bis zur strategischen Beratung — wir
                betreuen Mandate ganzheitlich und in enger Abstimmung.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 border-t border-l border-border">
            {services.map((s) => (
              <article
                key={s.n}
                className="border-r border-b border-border p-10 group bg-background hover:bg-earth-light transition-colors duration-700"
              >
                <div className="flex items-start justify-between mb-10">
                  <span className="font-mono-label text-muted-foreground">{s.n}</span>
                  <span className="h-px w-10 bg-foreground/40 mt-3 group-hover:w-16 transition-all duration-500" />
                </div>
                <h3 className="font-display text-2xl mb-4">{s.t}</h3>
                <p className="text-sm text-stone leading-relaxed mb-6">{s.d}</p>
                <ul className="space-y-2 text-sm text-foreground/80 border-t border-border pt-5">
                  {s.items.map((it) => (
                    <li key={it} className="flex gap-3">
                      <span className="text-muted-foreground">—</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* WERTE */}
      <section className="bg-foreground text-background">
        <div className="container-px section-y">
          <p className="font-mono-label text-background/60 mb-6">— Werte</p>
          <h2 className="font-display text-4xl md:text-5xl mb-16 max-w-2xl">
            Drei Prinzipien, die unsere Arbeit prägen.
          </h2>
          <div className="grid md:grid-cols-3 gap-px bg-background/10">
            {values.map((v, i) => (
              <div key={v.t} className="bg-foreground p-10">
                <span className="font-mono-label text-background/50">0{i + 1}</span>
                <h3 className="font-display text-3xl mt-8 mb-4 text-background">{v.t}</h3>
                <p className="text-background/70 leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FACHWISSEN */}
      <section id="fachwissen" className="section-y container-px">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <p className="font-mono-label text-muted-foreground mb-6">— Fachwissen</p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight max-w-2xl">
              Checklisten und Grundlagen für unsere Mandantschaft.
            </h2>
          </div>
          <a href="#kontakt" className="font-mono-label link-underline">Auf Anfrage</a>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {insights.map((p) => (
            <article key={p.t} className="group cursor-pointer border border-border p-10 hover:bg-earth-light transition-colors duration-700">
              <p className="font-mono-label text-earth mb-3">{p.tag}</p>
              <h3 className="font-display text-2xl mb-3 leading-snug">{p.t}</h3>
              <p className="text-sm text-stone leading-relaxed">{p.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* KONTAKT */}
      <section id="kontakt" className="bg-secondary">
        <div className="container-px section-y">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5">
              <p className="font-mono-label text-muted-foreground mb-6">— Kontakt</p>
              <h2 className="font-display text-4xl md:text-5xl leading-tight mb-10">
                Sprechen wir<br />über Ihr Anliegen.
              </h2>
              <p className="text-lg text-stone leading-relaxed mb-12 max-w-md">
                Ein unverbindliches Erstgespräch klärt, wie wir Sie am besten unterstützen können.
                Wir antworten in der Regel innert eines Werktages.
              </p>

              <div className="space-y-8">
                <div>
                  <p className="font-mono-label text-muted-foreground mb-2">Adresse</p>
                  <p className="text-foreground">MASOON TREUHAND<br />Täschmattstrasse 19<br />6015 Luzern</p>
                </div>
                <div>
                  <p className="font-mono-label text-muted-foreground mb-2">E-Mail</p>
                  <a href="mailto:info@masoontreuhand.ch" className="link-underline">info@masoontreuhand.ch</a>
                </div>
                <div>
                  <p className="font-mono-label text-muted-foreground mb-2">Telefon</p>
                  <a href="tel:+41799663636" className="link-underline">+41 79 966 36 36</a>
                </div>
                <div>
                  <p className="font-mono-label text-muted-foreground mb-2">Web</p>
                  <p>www.masoontreuhand.ch</p>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="font-mono-label text-muted-foreground mb-3">Öffnungszeiten</p>
                  <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-foreground">
                    <span>Montag – Freitag</span>
                    <span className="text-stone">08.00 – 12.00 Uhr · 13.30 – 17.00 Uhr</span>
                    <span>Samstag – Sonntag</span>
                    <span className="text-stone">geschlossen</span>
                  </div>
                </div>
              </div>
            </div>

            <form
              className="lg:col-span-6 lg:col-start-7 bg-background p-10 md:p-14 shadow-elegant"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="space-y-8">
                {[
                  { id: "name", label: "Name", type: "text" },
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
                <p className="text-xs text-muted-foreground">
                  Mit dem Absenden bestätigen Sie, dass wir Sie zur Bearbeitung Ihrer Anfrage kontaktieren dürfen.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-foreground text-background">
        <div className="container-px py-20">
          <div className="grid md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-5">
              <p className="font-display text-2xl tracking-[0.18em]">MASOON TREUHAND</p>
              <p className="font-mono-label text-background/60 mt-3">Schlüssel zum Erfolg</p>
              <p className="mt-8 text-background/70 max-w-sm leading-relaxed">
                Treuhand, Buchhaltung und Unternehmensberatung in Luzern und Umgebung.
                Treuhandbüro mit Sitz in Emmenbrücke.
              </p>
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
              <ul className="space-y-3 text-background/80">
                <li>Emmenbrücke, Luzern</li>
                <li>info@masoontreuhand.ch</li>
                <li>+41 00 000 00 00</li>
                <li>www.masoontreuhand.ch</li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-background/15 flex flex-col md:flex-row justify-between gap-4 text-xs text-background/50">
            <p>© {new Date().getFullYear()} MASOON TREUHAND. Alle Rechte vorbehalten.</p>
            <p>Treuhand Luzern · Buchhaltung Luzern · Steuererklärung Luzern · KMU Beratung</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
