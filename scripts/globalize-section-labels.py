from pathlib import Path
import re

# Eine einzige verbindliche Bereichstitel-Regel in global.css.
p = Path('assets/global.css')
s = p.read_text(encoding='utf-8')
old = '''html body.site-light-page main .section-label,
html body.site-light-page main p.section-label{
  font-family:var(--button-font)!important;
  font-size:var(--button-size)!important;
  font-style:normal!important;
  font-weight:var(--button-weight)!important;
  line-height:var(--button-line-height)!important;
  letter-spacing:var(--button-letter-spacing)!important;
  text-transform:var(--button-text-transform)!important;
  font-synthesis:none!important;
  display:flex!important;
  align-items:center!important;
  gap:16px!important;
}
'''
new = '''html body.site-light-page main .section-label,
html body.site-light-page main p.section-label{
  font-family:var(--button-font)!important;
  font-size:var(--button-size)!important;
  font-style:normal!important;
  font-weight:var(--button-weight)!important;
  line-height:var(--button-line-height)!important;
  letter-spacing:var(--button-letter-spacing)!important;
  text-transform:var(--button-text-transform)!important;
  font-synthesis:none!important;
  color:#777777!important;
  vertical-align:baseline!important;
  display:flex!important;
  align-items:center!important;
  gap:16px!important;
}
'''
assert old in s, 'Globale section-label Grundregel nicht gefunden'
s = s.replace(old, new, 1)
p.write_text(s, encoding='utf-8')

# Seitenspezifische Farbüberschreibungen entfernen, Layoutwerte bleiben bestehen.
p = Path('assets/contact.css')
s = p.read_text(encoding='utf-8')
old = '''.contact-split__info .section-label{
  position: relative !important;
  width: max-content !important;
  margin: 0 0 30px !important;
  color: #868279 !important;
}
'''
new = '''.contact-split__info .section-label{
  position: relative !important;
  width: max-content !important;
  margin: 0 0 30px !important;
}
'''
assert old in s, 'Kontakt Bereichstitel-Farbe nicht gefunden'
s = s.replace(old, new, 1)
p.write_text(s, encoding='utf-8')

p = Path('assets/dienstleistungen.css')
s = p.read_text(encoding='utf-8')
old = '''/* Dienstleistungen Hauptseite: kleine Bereichstitel wie Unternehmen */
html body.site-light-page .services-main .services-section>.section-heading>.section-label,
html body.site-light-page .services-main>.services-closing>.section-label{
  color:#868279!important;
}

'''
assert old in s, 'Dienstleistungen Bereichstitel-Farbblock nicht gefunden'
s = s.replace(old, '', 1)
p.write_text(s, encoding='utf-8')

p = Path('assets/unified-design.css')
s = p.read_text(encoding='utf-8')
old = '''/* Bereichstitel: verbindliche Typografie von EINORDNUNG */
html body main .section-label{
  color:#777777!important;
  vertical-align:baseline!important;
}'''
assert old in s, 'Alte allgemeine Bereichstitel-Regel in unified nicht gefunden'
s = s.replace(old, '', 1)
old = '''/* Unternehmen: kleine Bereichstitel farblich vereinheitlichen */

html body.site-light-page .home-values .section-heading > .section-label{
  color:#868279!important;
}

'''
assert old in s, 'Home-values Bereichstitel-Farbblock nicht gefunden'
s = s.replace(old, '', 1)
p.write_text(s, encoding='utf-8')

# Fachwissen Inline-Sonderfarbe entfernen; übriger Inline-Block bleibt vorerst unverändert.
p = Path('fachwissen/index.html')
s = p.read_text(encoding='utf-8')
old = '''    html body.page-knowledge.site-light-page main .knowledge-section#knowledge-articles > .section-heading > .section-label{
      color:#868279!important;
    }
'''
assert old in s, 'Fachwissen Inline-Bereichstitel-Farbe nicht gefunden'
s = s.replace(old, '', 1)
p.write_text(s, encoding='utf-8')

# Alte Bereichstitel-Farben auch aus dem ursprünglichen Basis-Bundle entfernen.
p = Path('assets/index-CZfMKxM_.css')
s = p.read_text(encoding='utf-8')
for old in [
    '.section-label{color:var(--stone);}',
    '.home-values .section-label{color:var(--stone);}',
    '.home-contact-band .section-label{color:var(--stone);}',
    '.section--intro>.section-heading .section-label{color:var(--stone);}',
]:
    assert old in s, f'Basis-Bundle Regel nicht gefunden: {old}'
    s = s.replace(old, '', 1)
p.write_text(s, encoding='utf-8')

# Cache-Busting für die betroffenen Stylesheets auf den produktiven Seiten.
production = [Path('index.html')]
for folder in ['unternehmen','dienstleistungen','fachwissen','kontakt','disclaimer','impressum','datenschutz']:
    root = Path(folder)
    if root.exists():
        production.extend(root.rglob('index.html'))
for html in sorted(set(production)):
    s = html.read_text(encoding='utf-8')
    s = re.sub(r'global\.css\?v=[^"\']+', 'global.css?v=section-label-global-20260915-1', s)
    s = re.sub(r'unified-design\.css\?v=[^"\']+', 'unified-design.css?v=section-label-global-20260915-1', s)
    s = re.sub(r'contact\.css\?v=[^"\']+', 'contact.css?v=section-label-global-20260915-1', s)
    s = re.sub(r'dienstleistungen\.css\?v=[^"\']+', 'dienstleistungen.css?v=section-label-global-20260915-1', s)
    html.write_text(s, encoding='utf-8')

# Verifikation: ausser global.css darf keine gepflegte CSS/Inline-Regel mehr section-label + color enthalten.
def color_blocks(text):
    return [m.group(0) for m in re.finditer(r'[^{}]*\.section-label[^{}]*\{[^{}]*\}', text, re.S) if re.search(r'\bcolor\s*:', m.group(0))]

managed = [Path('assets/contact.css'), Path('assets/dienstleistungen.css'), Path('assets/unified-design.css'), Path('assets/article-detail.css')]
for file in managed:
    hits = color_blocks(file.read_text(encoding='utf-8'))
    assert not hits, f'Verbleibende section-label FarbregeI in {file}: {hits[:2]}'

bundle = Path('assets/index-CZfMKxM_.css').read_text(encoding='utf-8')
assert not color_blocks(bundle), 'Basis-Bundle enthält weiterhin eine section-label FarbregeI'

for html in sorted(set(production)):
    text = html.read_text(encoding='utf-8')
    for style in re.findall(r'<style[^>]*>(.*?)</style>', text, re.S | re.I):
        hits = color_blocks(style)
        assert not hits, f'Inline section-label FarbregeI in {html}: {hits[:2]}'

global_text = Path('assets/global.css').read_text(encoding='utf-8')
hits = color_blocks(global_text)
assert len(hits) == 1, f'global.css soll genau eine section-label FarbregeI enthalten, gefunden: {len(hits)}'
assert 'color:#777777!important;' in hits[0]
print('OK: genau eine verbindliche Bereichstitel-FarbregeI in global.css')
