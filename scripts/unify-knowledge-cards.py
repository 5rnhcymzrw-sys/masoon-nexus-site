from pathlib import Path

# 1. Startseite: dieselbe Kartenstruktur wie auf der Fachwissen-Hauptseite.
home = Path('index.html')
s = home.read_text(encoding='utf-8')
section = s.index('<section class="home-paths">')
start = s.index('<div class="home-paths__grid">', section)
end = s.index('<p class="home-copy-spaced">', start)
new_grid = '''<div class="home-paths__grid articles-grid"><article class="article-card"><time class="article-card-date mt-nav-typography" datetime="2026-07-01">07.2026&nbsp;&nbsp; STEUERN</time><h2>Checkliste für die Steuererklärung</h2><p class="mt-body-copy">Eine vollständige Übersicht der wichtigsten Unterlagen für eine korrekt vorbereitete Steuererklärung.</p><a aria-label="Beitrag öffnen" class="article-action mt-nav-typography" href="fachwissen/checkliste-steuererklaerung/"></a></article><article class="article-card"><time class="article-card-date mt-nav-typography" datetime="2026-05-01">05.2026&nbsp;&nbsp; GESELLSCHAFTSRECHT</time><h2>Unternehmensformen<br/>im Überblick</h2><p class="mt-body-copy">Die gängigsten Unternehmensformen der Schweiz werden anhand ihrer rechtlichen und finanziellen Merkmale miteinander verglichen.</p><a aria-label="Beitrag öffnen" class="article-action mt-nav-typography" href="fachwissen/unternehmensformen/"></a></article><article class="article-card"><time class="article-card-date mt-nav-typography" datetime="2026-03-01">03.2026&nbsp;&nbsp; BUCHFÜHRUNG</time><h2>Unwahre Buchführung: Rechtliche Bedeutung korrekter Buchhaltung</h2><p class="mt-body-copy">Eine saubere Buchhaltung ist Grundlage für Jahresabschluss, Steuern, MWST, Löhne und unternehmerische Entscheidungen.</p><a aria-label="Beitrag öffnen" class="article-action mt-nav-typography" href="fachwissen/unwahre-buchfuehrung/"></a></article></div>'''
s = s[:start] + new_grid + s[end:]
s = s.replace('assets/site.js?v=20260908-logo-stable', 'assets/site.js?v=20260915-knowledge-cards-global-1')
assert 'home-paths__category' not in s
assert 'class="home-paths__grid articles-grid"' in s
assert s.count('class="article-card"') == 3
home.write_text(s, encoding='utf-8')

# 2. Fachwissen: Inline-Karten-CSS entfernen. Die Karten kommen ab jetzt nur noch aus global.css.
knowledge = Path('fachwissen/index.html')
s = knowledge.read_text(encoding='utf-8')
style_start = s.index('  <style>\n')
style_end = s.index('  </style>\n', style_start) + len('  </style>\n')
s = s[:style_start] + s[style_end:]
s = s.replace('../assets/site.js?v=20260913-fachwissen-browser-back-1', '../assets/site.js?v=20260915-knowledge-cards-global-1')
assert '<style>' not in s
knowledge.write_text(s, encoding='utf-8')

# 3. Global: alte Startseiten-Sonderkarten komplett durch eine gemeinsame article-card-Komponente ersetzen.
global_css = Path('assets/global.css')
g = global_css.read_text(encoding='utf-8')
start_marker = '/* Fachwissen-Kacheln – zentrale globale Komponente */'
end_marker = '/* Abschlusskästen – globale Grundkomponente */'
gs = g.index(start_marker)
ge = g.index(end_marker, gs)
shared = '''/* Fachwissen-Karten: gemeinsame globale Komponente */
html body.site-light-page .articles-grid{
  display:grid!important;
  width:100%!important;
  gap:18px!important;
}
@media(min-width:1051px){
  html body.site-light-page .articles-grid{grid-template-columns:repeat(3,minmax(0,1fr))!important;}
}
@media(min-width:801px) and (max-width:1050px){
  html body.site-light-page .articles-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;}
}
@media(max-width:800px){
  html body.site-light-page .articles-grid{grid-template-columns:1fr!important;}
}
html body.site-light-page .articles-grid>.article-card{
  position:relative!important;
  cursor:pointer!important;
  box-sizing:border-box!important;
  width:100%!important;
  height:360px!important;
  min-height:360px!important;
  max-height:360px!important;
  padding:34px 42px 36px!important;
  display:flex!important;
  flex-direction:column!important;
  border:var(--mt-gradient-frame-width) solid transparent!important;
  border-image:var(--mt-gradient-frame) 1!important;
  background:#fff!important;
  background-image:none!important;
  box-shadow:none!important;
  -webkit-backdrop-filter:none!important;
  backdrop-filter:none!important;
  transition:transform .28s ease,box-shadow .28s ease!important;
}
html body.site-light-page .articles-grid>.article-card>.article-card-date{
  position:static!important;
  top:auto!important;
  left:auto!important;
  display:block!important;
  margin:0 0 38px!important;
  transform:none!important;
}
html body.site-light-page .articles-grid>.article-card>h2{
  align-self:stretch!important;
  width:100%!important;
  max-width:none!important;
  margin:0!important;
  padding:0 0 22px!important;
  font-family:"PT Serif",Georgia,serif!important;
  font-size:24px!important;
  font-style:normal!important;
  font-weight:700!important;
  line-height:1.15!important;
  letter-spacing:0!important;
  text-transform:none!important;
  color:#171715!important;
  -webkit-text-stroke:0!important;
  font-synthesis:none!important;
  transform:none!important;
  background-image:var(--mt-gradient-line)!important;
  background-repeat:no-repeat!important;
  background-position:left bottom!important;
  background-size:100% var(--mt-gradient-line-width)!important;
}
html body.site-light-page .articles-grid>.article-card>h2::after{
  content:none!important;
  display:none!important;
}
html body.site-light-page .articles-grid>.article-card>p:not(.article-meta){
  margin:22px 0 0!important;
  transform:none!important;
}
html body.site-light-page .articles-grid>.article-card>.article-action{
  display:none!important;
}
@media(hover:hover){
  html body.site-light-page .articles-grid>.article-card:hover{
    transform:translateY(-3px)!important;
    box-shadow:0 14px 32px rgba(35,35,33,.055)!important;
    background:#fff!important;
    background-image:none!important;
    border:var(--mt-gradient-frame-width) solid transparent!important;
    border-image:var(--mt-gradient-frame) 1!important;
    -webkit-backdrop-filter:none!important;
    backdrop-filter:none!important;
  }
}

'''
g = g[:gs] + shared + g[ge:]
assert 'home-path-date' not in g
assert 'home-path-copy' not in g
assert 'page-home.site-light-page main.home section.home-paths .home-paths__grid>a' not in g
assert '.knowledge-section .articles-grid>.article-card' not in g
global_css.write_text(g, encoding='utf-8')

# 4. Unified: nur noch Seitenkomposition behalten, keine zweite Fachwissen-Kartenoptik.
unified = Path('assets/unified-design.css')
u = unified.read_text(encoding='utf-8')

# Alte Kacheltitel-Regeln entfernen.
a = u.index('html body.site-light-page .knowledge-section .articles-grid>.article-card>.details-action{')
b = u.index('/* Bereichstitel: verbindliche Typografie von EINORDNUNG */', a)
u = u[:a] + u[b:]

# Alte Startseiten-Metadatenregel ist mit der neuen time-Struktur obsolet.
a = u.index('html body main .home-paths__grid span{')
b = u.index('html body main .article-card>a{', a)
u = u[:a] + u[b:]

# Fachwissen-Raster: nur Seitenbreite hier behalten; das Grid selbst ist global.
a = u.index('/* Fachwissen Hauptseite: Raster und Kartenmasse */')
b = u.index('/* Fachwissen Hauptseite: Beitragsaktion */', a)
section_width = '''/* Fachwissen Hauptseite: Bereichsbreite */
@media(min-width:801px){
  html body.site-light-page .knowledge-section{
    width:min(100% - var(--page-gutter),var(--content-width))!important;
  }
}

'''
u = u[:a] + section_width + u[b:]

# Beitragsaktion, absolute Datenpositionen und alte Linienfarben entfernen.
a = u.index('/* Fachwissen Hauptseite: Beitragsaktion */')
b = u.index('/* Nur Fachbeitragskarten dürfen beim Scrollen eingeblendet werden. */', a)
u = u[:a] + u[b:]

# article-card aus gemeinsamem Rahmenblock entfernen; die globale Komponente besitzt ihren Rahmen selbst.
u = u.replace('html body.site-light-page main .knowledge-section .articles-grid>.article-card,\nhtml body.site-light-page main .company-values-grid>.company-value-card,', 'html body.site-light-page main .company-values-grid>.company-value-card,')
u = u.replace('html body.site-light-page main .knowledge-section .articles-grid>.article-card:nth-child(3n/**/+1),\nhtml body.site-light-page main .company-values-grid>.company-value-card:nth-child(3n/**/+1){', 'html body.site-light-page main .company-values-grid>.company-value-card:nth-child(3n/**/+1){')
u = u.replace('html body.site-light-page main .knowledge-section .articles-grid>.article-card:nth-child(3n/**/+2),\nhtml body.site-light-page main .company-values-grid>.company-value-card:nth-child(3n/**/+2){', 'html body.site-light-page main .company-values-grid>.company-value-card:nth-child(3n/**/+2){')
u = u.replace('html body.site-light-page main .knowledge-section .articles-grid>.article-card:nth-child(3n/**/+3),\nhtml body.site-light-page main .company-values-grid>.company-value-card:nth-child(3n/**/+3){', 'html body.site-light-page main .company-values-grid>.company-value-card:nth-child(3n/**/+3){')

# Späte, heute durch das Inline-CSS übersteuerte Kartenstände entfernen.
a = u.index('/* Fachwissen: Beitragskästen in Dienstleistungshöhe */')
b = u.index('/* Nur Startseite-Kontakt und Fachwissen-Einordnung:', a)
u = u[:a] + u[b:]

a = u.index('/* Fachwissen-Kacheln: Verlauf und Hover */')
b = u.index('/* Fachwissen Hauptseite: seitenspezifische Endregeln */', a)
u = u[:a] + u[b:]

# Seitenspezifische Endregeln auf reine Seitenabstände reduzieren.
a = u.index('/* Fachwissen Hauptseite: seitenspezifische Endregeln */')
b = u.index('html body.page-knowledge.site-light-page:has(#knowledge-articles) main.page-main{', a)
end_rules = '''/* Fachwissen Hauptseite: seitenspezifische Endregeln */
@media(min-width:801px){
  html body.page-knowledge .page-main>.knowledge-section{padding-bottom:var(--section-y)!important;}
  html body.page-knowledge .page-main>.knowledge-section>.knowledge-note{padding-bottom:var(--section-y)!important;}
}

'''
u = u[:a] + end_rules + u[b:]

# Glasverlauf und Breakpoint-Positionen der Karten entfernen. Die Karte ist nun global weiss mit Verlaufrahmen.
a = u.index('html body.page-knowledge.site-light-page main .knowledge-section#knowledge-articles .articles-grid>.article-card{')
b = u.index('html body.page-knowledge.site-light-page main .knowledge-section#knowledge-articles>.knowledge-note{', a)
u = u[:a] + u[b:]

# Seitenspezifische Label-Farbe erhalten.
label_rule = '''\nhtml body.page-knowledge.site-light-page main .knowledge-section#knowledge-articles>.section-heading>.section-label{\n  color:#868279!important;\n}\n'''
insert_at = u.index('/* Fachwissen Hauptseite: Bereichsbreite */')
u = u[:insert_at] + label_rule + u[insert_at:]

assert 'page-knowledge.site-light-page main .knowledge-section#knowledge-articles .articles-grid>.article-card' not in u
assert 'page-knowledge.site-light-page main .knowledge-section#knowledge-articles .articles-grid > .article-card' not in u
assert '.knowledge-section .articles-grid>.article-card>h2' not in u
unified.write_text(u, encoding='utf-8')

# 5. JS: kein Fachwissen-spezifisches Style-Injection mehr; dieselbe Klicklogik für alle article-card-Instanzen.
js = Path('assets/site.js')
j = js.read_text(encoding='utf-8')
start = j.index("  if (document.body.classList.contains('page-knowledge')) {")
end = j.index('  // Die Logoausrichtung erfolgt bereits beim ersten Rendern in global.css.', start)
shared_click = '''  /* Fachwissen-Karten: gemeinsame Klicklogik auf allen Seiten. */
  document.querySelectorAll('.article-card').forEach(card => {
    const link = card.querySelector('a[href]');
    if (!link) return;
    card.style.cursor = 'pointer';
    card.setAttribute('role', 'link');
    card.tabIndex = 0;
    card.addEventListener('click', event => {
      if (event.target.closest('a')) return;
      link.click();
    });
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        link.click();
      }
    });
  });

'''
j = j[:start] + shared_click + j[end:]
assert 'lineStyle' not in j
assert "document.querySelectorAll('.article-card')" in j
js.write_text(j, encoding='utf-8')
