import { useState } from "react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/preview/a12.png.asset.json";
import unternehmenImg from "@/assets/preview/01.png.asset.json";
import insight1 from "@/assets/preview/a01.jpg.asset.json";
import insight2 from "@/assets/preview/a02.png.asset.json";
import insight3 from "@/assets/preview/a06.png.asset.json";
import insight4 from "@/assets/preview/a08.png.asset.json";
import insight5 from "@/assets/preview/a01.png.asset.json";
import insight6 from "@/assets/preview/a12.png.asset.json";

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
  { n: "01", t: "Diskretion", d: "Vertrauliche Angelegenheiten erfordern höchste Sorgfalt und absolute Verlässlichkeit." },
  { n: "02", t: "Präzision", d: "Sorgfältige, strukturierte und fachlich fundierte Treuhandarbeit bis ins Detail." },
  { n: "03", t: "Vertrauen", d: "Eine langfristige Zusammenarbeit entsteht durch Klarheit, Verlässlichkeit und transparente Kommunikation." },
];

const insights = [
  { n: "01", t: "Checkliste Steuererklärung", d: "Welche Unterlagen für eine vollständige Steuererklärung benötigt werden.", img: insight1.url },
  { n: "02", t: "Jahresabschluss vorbereiten", d: "Worauf Unternehmen vor dem Jahresabschluss achten sollten.", img: insight2.url },
  { n: "03", t: "Buchhaltung digitalisieren", d: "Wie digitale Prozesse die Buchhaltung effizienter und übersichtlicher machen.", img: insight3.url },
  { n: "04", t: "Lohnadministration", d: "Was bei Löhnen, Sozialversicherungen und Personalunterlagen wichtig ist.", img: insight4.url },
  { n: "05", t: "Mehrwertsteuer", d: "Wichtige Punkte zur MWST-Pflicht, Abrechnung und Fristen.", img: insight5.url },
  { n: "06", t: "Unternehmen gründen", d: "Welche administrativen und treuhänderischen Schritte bei der Gründung relevant sind.", img: insight6.url },
];

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openService, setOpenService] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-foreground text-background border-b border-accent/40">
        <div className="container-px flex items-center justify-between h-16 md:h-[72px]">
          <a href="#top" className="font-nav text-background text-[0.72rem] md:text-[0.78rem] tracking-[0.1em]">
            MASOON TREUHAND
          </a>
          <nav className="hidden lg:flex items-center font-nav text-background/85 tracking-[0.1em] text-[0.72rem]">
            {nav.map((n, i) => (
              <span key={n.id} className="flex items-center">
                <a href={`#${n.id}`} className="px-4 hover:text-background transition-colors">
                  {n.label}
                </a>
                {i < nav.length - 1 && <span className="text-background/55">|</span>}
              </span>
            ))}
          </nav>
          <button
            aria-label="Menu"
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={`h-px w-6 bg-background transition-transform ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-background transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`h-px w-6 bg-background transition-transform ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden border-t border-accent/40 bg-foreground">
            <nav className="container-px flex flex-col py-6 gap-5 font-nav tracking-[0.1em]">
              {nav.map((n) => (
                <a key={n.id} href={`#${n.id}`} onClick={() => setMenuOpen(false)} className="text-background/85">
                  {n.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="bg-background pt-28 md:pt-32 pb-14 md:pb-20 overflow-hidden">
        <div className="container-px grid lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-20 items-end min-h-[calc(100vh-9rem)]">
          <div className="max-w-[720px] pb-4 md:pb-8">
            <p className="font-display text-[1.55rem] md:text-[1.75rem] leading-tight font-semibold tracking-[0.01em]">MASOON TREUHAND</p>
            <p className="font-nav text-foreground/85 tracking-[0.08em] text-[0.72rem] md:text-[0.78rem] mt-4">
              TREUHAND <span className="text-foreground/40 mx-2">|</span> BUCHHALTUNG <span className="text-foreground/40 mx-2">|</span> STEUERN <span className="text-foreground/40 mx-2">|</span> BERATUNG
            </p>
            <h1 className="font-display text-[1.28rem] md:text-[1.5rem] lg:text-[1.7rem] leading-[1.38] text-foreground mt-16 md:mt-20 font-normal tracking-normal">
              Treuhandlösungen <span className="text-foreground/40 mx-1">|</span> die präzise auf Ihre unternehmerischen Anforderungen abgestimmt sind.
            </h1>
            <p className="mt-7 text-base md:text-[1.04rem] text-stone leading-[1.75]">
              Auf der Basis von Diskretion <span className="text-foreground/40 mx-1">|</span> Präzision <span className="text-foreground/40 mx-1">|</span> Vertrauen begleiten wir Sie mit fachlicher Klarheit und hohem Anspruch durch alle Phasen Ihres Geschäftslebens.
            </p>
          </div>
          <div className="w-full">
            <img
              src={heroImg.url}
              alt="MASOON Treuhand"
              className="w-full h-[54vh] min-h-[390px] max-h-[620px] object-cover"
              width={1122}
              height={990}
            />
          </div>
        </div>
      </section>

      {/* UNTERNEHMEN */}
      <section id="unternehmen" className="section-y container-px">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7 space-y-6">
            <p className="font-mono-label text-muted-foreground">— Unternehmen</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl leading-tight">
              Treuhand mit Struktur und Anspruch.
            </h2>
            <p className="text-base md:text-lg text-stone leading-relaxed">
              Wir schaffen klare Grundlagen für eine zuverlässige und langfristige Zusammenarbeit.
            </p>
            <div className="space-y-5 text-base leading-relaxed text-stone pt-4">
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
          <div className="lg:col-span-5">
            <img src={unternehmenImg.url} alt="MASOON Treuhand Unternehmen" className="w-full h-auto object-cover" />
          </div>
        </div>
      </section>

      {/* WERTE */}
      <section className="container-px section-y border-t border-border">
        <div className="max-w-3xl mb-14">
          <p className="font-mono-label text-muted-foreground mb-5">— Werte</p>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl leading-tight mb-6">
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
      </section>

      {/* DIENSTLEISTUNGEN */}
      <section id="dienstleistungen" className="section-y container-px border-t border-border">
        <div className="max-w-3xl mb-14">
          <p className="font-mono-label text-muted-foreground mb-5">— Dienstleistungen</p>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl leading-tight mb-6">
            Treuhand mit klarer Struktur.
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
                <h3 className="font-display text-xl md:text-2xl mt-5 mb-4">{s.t}</h3>
                <p className="text-sm md:text-base text-stone leading-relaxed">{s.d}</p>
                {open && (
                  <ul className="mt-5 space-y-2 text-sm text-stone">
                    {s.items.map((it) => (
                      <li key={it} className="flex gap-3">
                        <span className="text-foreground/40">—</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <button
                  type="button"
                  onClick={() => setOpenService(open ? null : s.n)}
                  className="font-mono-label link-underline self-start mt-6 text-foreground"
                >
                  {open ? "— Weniger anzeigen" : "— Mehr anzeigen"}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* FACHWISSEN */}
      <section id="fachwissen" className="section-y container-px border-t border-border">
        <div className="max-w-3xl mb-14">
          <p className="font-mono-label text-muted-foreground mb-5">— Fachwissen</p>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl leading-tight mb-6">
            Einblicke aus unserer täglichen Arbeit.
          </h2>
          <p className="text-base md:text-lg text-stone leading-relaxed">
            Wir zeigen ausgewählte Fachthemen verständlich und praxisnah, mit Fokus auf klare Entscheidungen und sichere Abläufe im Geschäftsalltag.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
          {insights.map((p) => (
            <article key={p.n} className="flex flex-col group">
              <span className="font-mono-label text-muted-foreground mb-4">{p.n}</span>
              <div className="aspect-[4/3] w-full overflow-hidden mb-5 bg-secondary">
                <img src={p.img} alt={p.t} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              </div>
              <h3 className="font-display text-lg md:text-xl mb-3 leading-snug">{p.t}</h3>
              <p className="text-sm text-stone leading-relaxed mb-5">{p.d}</p>
              <a href="#" className="font-mono-label link-underline self-start">— Mehr erfahren</a>
            </article>
          ))}
        </div>
      </section>

      {/* KONTAKT */}
      <section id="kontakt" className="section-y container-px border-t border-border">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="font-mono-label text-muted-foreground mb-5">— Kontakt</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl leading-tight mb-6">
              Sprechen wir über Ihr Anliegen.
            </h2>
            <p className="text-base md:text-lg text-stone leading-relaxed max-w-md">
              Wir nehmen uns Zeit für Ihre Anfrage und klären gemeinsam, welche Unterstützung für Ihr Unternehmen sinnvoll ist.
            </p>
          </div>

          <form
            className="lg:col-span-7 space-y-7"
            onSubmit={(e) => e.preventDefault()}
          >
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
                  className="w-full border-0 border-b border-border bg-transparent py-2 focus:outline-none focus:border-foreground transition-colors"
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
                className="w-full border-0 border-b border-border bg-transparent py-2 focus:outline-none focus:border-foreground transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="font-mono-label bg-foreground text-background px-8 py-4 hover:bg-stone transition-colors duration-500"
            >
              Nachricht senden
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
          <div className="grid md:grid-cols-12 gap-10 mb-14">
            <div className="md:col-span-4">
              <p className="font-nav text-base tracking-[0.2em]">MASOON TREUHAND</p>
              <p className="font-mono-label text-background/60 mt-3">Schlüssel zum Erfolg</p>
            </div>
            <div className="md:col-span-4">
              <p className="font-mono-label text-background/60 mb-4">Kontakt</p>
              <ul className="space-y-1 text-sm text-background/85">
                <li>MASOON TREUHAND</li>
                <li>Täschmattstrasse 19</li>
                <li>6015 Luzern</li>
                <li className="pt-2">www.masoontreuhand.ch</li>
                <li><a href="mailto:info@masoontreuhand.ch" className="hover:text-background">info@masoontreuhand.ch</a></li>
                <li><a href="tel:+41799663636" className="hover:text-background">+41 79 966 36 36</a></li>
              </ul>
            </div>
            <div className="md:col-span-4">
              <p className="font-mono-label text-background/60 mb-4">Öffnungszeiten</p>
              <ul className="space-y-1 text-sm text-background/85">
                <li>Montag–Freitag 08.00–12.00 <span className="text-background/50">|</span> 13.00–17.00 Uhr</li>
                <li>Samstag–Sonntag geschlossen</li>
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
