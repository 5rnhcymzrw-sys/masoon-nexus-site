from pathlib import Path
import re

# ---------- global.css ----------
p = Path('assets/global.css')
s = p.read_text(encoding='utf-8')

# knowledge-note darf nicht mehr von der allgemeinen Kartenoberfläche gestaltet werden.
s = s.replace('html body.site-light-page .article-card,\nhtml body.site-light-page .knowledge-note,\nhtml body.site-light-page .services-main .services-section .services-grid>.service-card,',
              'html body.site-light-page .article-card,\nhtml body.site-light-page .services-main .services-section .services-grid>.service-card,', 1)

# Alte seitenbezogene Grössenregeln aus global.css entfernen.
a = s.index('/* Dienstleistungen: Abschlusskasten-Grösse an Fachwissen angepasst */')
b = s.index('/* Einheitliche Seitenabstände */', a)
s = s[:a] + s[b:]

old_component = '''/* Abschlusskästen – globale Grundkomponente */
/* Nur die vier grossen Abschlusskästen: ohne Farbverlauf und Weichzeichnung. */
html body.site-light-page main .knowledge-section>.knowledge-note,
html body.site-light-page main.services-main>.services-closing,
html body.site-light-page main.page-main>.company-collaboration-box,
html body.site-light-page main.home>.home-contact-band{
  background-image:none!important;
 border-color:transparent!important;
border-image:var(--mt-gradient-frame) 1!important;
  box-shadow:none!important;
  filter:none!important;
  backdrop-filter:none!important;
  -webkit-backdrop-filter:none!important;
}
'''
assert old_component in s
new_component = '''/* Grosse Abschlusskästen: einzige globale Komponente */
html body.site-light-page main :is(.knowledge-note,.services-closing,.company-collaboration-box,.home-contact-band){
  box-sizing:border-box!important;
  width:min(calc(100vw - var(--page-gutter)),var(--content-width))!important;
  height:463px!important;
  min-height:463px!important;
  max-height:463px!important;
  margin-left:auto!important;
  margin-right:auto!important;
  padding:var(--section-y) 72px!important;
  display:grid!important;
  grid-template-columns:.7fr 1.3fr!important;
  gap:80px!important;
  position:relative!important;
  background:transparent!important;
  background-color:transparent!important;
  background-image:none!important;
  border:var(--mt-gradient-frame-width) solid transparent!important;
  border-image:var(--mt-gradient-frame) 1!important;
  border-radius:0!important;
  box-shadow:none!important;
  filter:none!important;
  backdrop-filter:none!important;
  -webkit-backdrop-filter:none!important;
}
html body.site-light-page main :is(.knowledge-note,.services-closing,.company-collaboration-box,.home-contact-band)>div{
  grid-column:2!important;
  min-width:0!important;
  min-height:0!important;
}
html body.site-light-page main :is(.knowledge-note,.services-closing,.company-collaboration-box,.home-contact-band)>.section-label{
  position:absolute!important;
  top:50%!important;
  left:72px!important;
  margin:0!important;
  padding:0!important;
  height:15.4px!important;
  transform:translateY(-50%)!important;
}
@media(max-width:800px){
  html body.site-light-page main :is(.knowledge-note,.services-closing,.company-collaboration-box,.home-contact-band){
    width:min(calc(100vw - var(--page-gutter-mobile)),var(--content-width))!important;
    height:auto!important;
    min-height:0!important;
    max-height:none!important;
    padding:62px 26px!important;
    grid-template-columns:1fr!important;
    gap:52px!important;
  }
  html body.site-light-page main :is(.knowledge-note,.services-closing,.company-collaboration-box,.home-contact-band)>div{
    grid-column:1!important;
  }
  html body.site-light-page main :is(.knowledge-note,.services-closing,.company-collaboration-box,.home-contact-band)>.section-label{
    position:static!important;
    height:auto!important;
    transform:none!important;
  }
}
'''
s = s.replace(old_component, new_component, 1)

# Box-Klassen aus der allgemeinen transparenten Seitenhintergrundregel entfernen.
s = s.replace('body.site-light-page .home-paths::before,\nbody.site-light-page .home-contact-band,\nbody.site-light-page .services-closing{',
              'body.site-light-page .home-paths::before{', 1)

# Alte zweite globale Abschlusskasten-Generation am Dateiende entfernen.
marker = '/* Abschlusskästen – gemeinsame Positionierung global */'
assert marker in s
s = s[:s.index(marker)].rstrip() + '\n'

p.write_text(s, encoding='utf-8')

# ---------- unified-design.css ----------
p = Path('assets/unified-design.css')
u = p.read_text(encoding='utf-8')

# Fachwissen Einordnung: nur Seitenabstand und Inhaltsabstände bleiben.
a = u.index('/* Fachwissen Hauptseite: Einordnungskasten */')
b = u.index('/* Gemeinsame Rechteseiten und Spezialtexte */', a)
replacement = '''/* Fachwissen Hauptseite: Einordnung */
html body.site-light-page .knowledge-section>.knowledge-note{
  margin-top:118px!important;
}
html body.site-light-page .knowledge-section>.knowledge-note>div>h2{
  color:#171715!important;
  margin-bottom:0!important;
  padding-bottom:0!important;
}
html body.site-light-page .knowledge-section>.knowledge-note>div>h2+p,
html body.site-light-page .knowledge-section>.knowledge-note>div>p:not(.section-label){
  margin:30px 0 0!important;
  padding-top:0!important;
}
@media(max-width:800px){
  html body.site-light-page .knowledge-section>.knowledge-note{
    margin-top:var(--section-y-mobile)!important;
  }
}

'''
u = u[:a] + replacement + u[b:]

# Grosse Kästen aus der gemischten Rahmenregel entfernen.
for line in [
    'html body.site-light-page main.home>.home-contact-band,\n',
    'html body.site-light-page main.services-main>.services-closing,\n',
    'html body.site-light-page main .knowledge-note,\n',
]:
    u = u.replace(line, '', 1)

# Alte Kontaktband-Hintergrund-/Pseudoebenen entfernen.
a = u.index('/* Kontaktbereich: kein Verlauf über die volle Browserbreite; Rahmen und Inhalt bleiben unverändert */')
b = u.index('/* Fachwissen: grossflächigen Seitenverlauf entfernen */', a)
u = u[:a] + u[b:]

# Alte Kontaktband-Labelposition entfernen; globale Grosskasten-Komponente übernimmt sie.
a = u.index('/* Startseite Kontakt: Position des Bereichslabels */')
b = u.index('html body.page-home.site-light-page main.home>section.home-values', a)
u = u[:a] + u[b:]

# Zweiten alten Label-Desktopblock entfernen.
old = '''@media(min-width:801px){
  html body.page-home.site-light-page main.home>section.home-contact-band>p.section-label{
    top:calc(50% + 1px)!important;
  }
}

'''
u = u.replace(old, '', 1)

# home-contact-band aus der Startseiten-Labelstrukturregel entfernen.
u = u.replace('html body.page-home .home>.home-values .section-heading>.section-label,\nhtml body.page-home .home>.home-paths .home-paths__heading>.section-label,\nhtml body.page-home .home>.home-contact-band>.section-label{position:relative!important;width:max-content!important;padding:0!important;}',
              'html body.page-home .home>.home-values .section-heading>.section-label,\nhtml body.page-home .home>.home-paths .home-paths__heading>.section-label{position:relative!important;width:max-content!important;padding:0!important;}', 1)

# Alte Kontaktband-Optik und Paddinggeneration entfernen; nur Seitenmargen bleiben.
old = '''html body.page-home.site-light-page main.home>section.home-contact-band{
  background:transparent!important;
  -webkit-backdrop-filter:none!important;
  backdrop-filter:none!important;
  border:var(--mt-gradient-frame-width) solid transparent!important;
  border-image:var(--mt-gradient-frame) 1!important;
}

@media(min-width:801px){
  html body.page-home.site-light-page main.home>section.home-contact-band{
    padding:var(--section-y) 72px!important;
  }
}
@media(max-width:800px){
  html body.page-home.site-light-page main.home>section.home-contact-band{
    padding:62px 26px var(--section-y)!important;
  }
}

'''
assert old in u
u = u.replace(old, '''@media(min-width:801px){
  html body.page-home.site-light-page main.home>section.home-contact-band{
    margin:118px auto var(--section-y)!important;
  }
}
@media(max-width:800px){
  html body.page-home.site-light-page main.home>section.home-contact-band{
    margin:var(--section-y-mobile) auto var(--section-y)!important;
  }
}

''', 1)

# company-collaboration-box: nur Seitenabstände und Inhalt bleiben.
a = u.index('html body.page-company.site-light-page main.page-main>.company-collaboration-box{')
b = u.index('html body.page-company.site-light-page main.page-main>.company-legal-section{padding-bottom:0!important}', a)
company = '''html body.page-company.site-light-page main.page-main>.company-collaboration-box{
  margin-top:118px!important;
  margin-bottom:var(--section-y)!important;
}
html body.page-company.site-light-page .company-collaboration-box h2{margin:0!important}
html body.page-company.site-light-page .company-collaboration-box>div>p{margin:30px 0 0!important}
@media(max-width:800px){
  html body.page-company.site-light-page main.page-main>.company-collaboration-box{
    margin-top:var(--section-y-mobile)!important;
    margin-bottom:var(--section-y-mobile)!important;
  }
}

'''
u = u[:a] + company + u[b:]

# Drei alte Grosskasten-Optikblöcke nahe Dateiende entfernen.
a = u.index('/* Nur Startseite-Kontakt und Fachwissen-Einordnung: ohne Farbverlauf und Weichzeichnung. */')
b = u.index('/* Fachwissen-Kacheln: Verlauf und Hover */', a)
u = u[:a] + u[b:]

# Letzten farbigen Einordnungskasten vollständig entfernen.
old = '''html body.page-knowledge.site-light-page main .knowledge-section#knowledge-articles>.knowledge-note{
  background:linear-gradient(to right in oklab,rgba(243,232,212,.06) 0%,rgba(232,229,223,.06) 36%,rgba(199,203,211,.06) 68%,rgba(141,150,168,.06) 100%)!important;
  background-origin:border-box!important;
  background-size:100% 100%!important;
  background-repeat:no-repeat!important;
  -webkit-backdrop-filter:blur(32px)!important;
  backdrop-filter:blur(32px)!important;
}'''
assert old in u
u = u.replace(old, '', 1)

p.write_text(u, encoding='utf-8')

# ---------- dienstleistungen.css ----------
p = Path('assets/dienstleistungen.css')
d = p.read_text(encoding='utf-8')

old = '''.services-closing{
  width:min(100% - var(--page-gutter),var(--content-width));
  margin:0 auto;
  padding:var(--section-y) 0;
}
'''
assert old in d
d = d.replace(old, '.services-closing{margin:0 auto;}\n', 1)
old = '''  .services-closing{
    width:min(100% - var(--page-gutter-mobile),var(--content-width));
    padding:var(--section-y-mobile) 0;
  }
'''
assert old in d
d = d.replace(old, '', 1)

container = 'html body.page-services.site-light-page .services-main>.services-closing{box-sizing:border-box!important;height:463px!important;min-height:463px!important;max-height:463px!important;display:grid!important;grid-template-columns:.7fr 1.3fr!important;gap:80px!important;background:transparent!important;background-color:transparent!important;background-image:none!important;border:1px solid var(--mt-line)!important;box-shadow:none!important}'
assert container in d
d = d.replace(container, '', 1)
old = '@media(min-width:801px){html body.page-services.site-light-page .services-main>.services-closing{margin-top:118px!important;margin-bottom:var(--section-y)!important;padding:var(--section-y) 72px!important}}'
assert old in d
d = d.replace(old, '@media(min-width:801px){html body.page-services.site-light-page .services-main>.services-closing{margin-top:118px!important;margin-bottom:var(--section-y)!important}}', 1)
old = '@media(max-width:800px){html body.page-services.site-light-page .services-main>.services-closing{width:min(100% - var(--page-gutter-mobile),var(--content-width))!important;margin-top:var(--section-y-mobile)!important;margin-bottom:var(--section-y-mobile)!important;padding:62px 26px!important;grid-template-columns:1fr!important;gap:52px!important}}'
assert old in d
d = d.replace(old, '@media(max-width:800px){html body.page-services.site-light-page .services-main>.services-closing{margin-top:var(--section-y-mobile)!important;margin-bottom:var(--section-y-mobile)!important}}', 1)
old = '''html body.page-services.site-light-page main.services-main > .services-closing{
  border:var(--mt-gradient-frame-width) solid transparent!important;
  border-image:var(--mt-gradient-frame) 1!important;
}
'''
assert old in d
d = d.replace(old, '', 1)
p.write_text(d, encoding='utf-8')

# ---------- altes Basis-Bundle ----------
p = Path('assets/index-CZfMKxM_.css')
b = p.read_text(encoding='utf-8')
replacements = {
    '.home-contact-band{background-color:var(--greige);background-image:var(--surface-gradient);padding:90px max(32px,50vw - 660px);}':'',
    '.knowledge-note{background-color:var(--greige);background-image:var(--surface-gradient);grid-template-columns:.7fr 1.3fr;gap:80px;margin-top:118px;padding:78px 72px;display:grid;}':'.knowledge-note{margin-top:118px;}',
    '.home-contact-band{padding:72px 18px;}':'',
    '.knowledge-note{margin-top:var(--section-y-mobile);padding:62px 46px;}.knowledge-note{grid-template-columns:1fr;gap:52px;}':'.knowledge-note{margin-top:var(--section-y-mobile);}',
    '.knowledge-note{padding:46px 26px;}':'',
    '.home-contact-band{padding-top:118px;}':'',
    '.home-contact-band{padding-top:var(--section-y-mobile);}':'',
}
for old,new in replacements.items():
    assert old in b, f'Basis-Bundle Fragment fehlt: {old}'
    b = b.replace(old,new,1)
p.write_text(b, encoding='utf-8')

# ---------- Cache busting ----------
production=[Path('index.html')]
for folder in ['unternehmen','dienstleistungen','fachwissen','kontakt','disclaimer','impressum','datenschutz']:
    root=Path(folder)
    if root.exists(): production.extend(root.rglob('index.html'))
for html in sorted(set(production)):
    text=html.read_text(encoding='utf-8')
    text=re.sub(r'global\.css\?v=[^"\']+','global.css?v=large-box-global-20260915-1',text)
    text=re.sub(r'unified-design\.css\?v=[^"\']+','unified-design.css?v=large-box-global-20260915-1',text)
    text=re.sub(r'dienstleistungen\.css\?v=[^"\']+','dienstleistungen.css?v=large-box-global-20260915-1',text)
    html.write_text(text,encoding='utf-8')

# ---------- Verifikation ----------
targets=('knowledge-note','services-closing','company-collaboration-box','home-contact-band')
prohibited=('background:','background-color:','background-image:','border:','border-color:','border-image:','box-shadow:','filter:','backdrop-filter:','-webkit-backdrop-filter:','height:','min-height:','max-height:','padding:','display:','grid-template-columns:','gap:','box-sizing:')
for file in [Path('assets/unified-design.css'),Path('assets/dienstleistungen.css'),Path('assets/contact.css'),Path('assets/article-detail.css')]:
    text=file.read_text(encoding='utf-8')
    for m in re.finditer(r'([^{}]+)\{([^{}]*)\}',text,re.S):
        selector,body=m.group(1),m.group(2)
        # Nur Containerblöcke prüfen, nicht h2/p/Links innerhalb der Kästen.
        if any(t in selector for t in targets) and not any(x in selector for x in [' h2','>h2','>div',' p','>p','.section-label','.services-closing__inner','.services-closing__links','.services-contact-button','.home-action-button','::before','::after']):
            bad=[prop for prop in prohibited if prop in body]
            assert not bad, f'{file}: alte Containerregel {selector.strip()} enthält {bad}'

bundle=Path('assets/index-CZfMKxM_.css').read_text(encoding='utf-8')
for fragment in ['.home-contact-band{background','.knowledge-note{background','.home-contact-band{padding','.knowledge-note{padding']:
    assert fragment not in bundle, f'Altregel im Basis-Bundle: {fragment}'

g=Path('assets/global.css').read_text(encoding='utf-8')
assert g.count('/* Grosse Abschlusskästen: einzige globale Komponente */')==1
assert 'main :is(.knowledge-note,.services-closing,.company-collaboration-box,.home-contact-band)' in g
print('OK: eine globale Grosskasten-Komponente, keine seitenspezifische Kastenoptik')
