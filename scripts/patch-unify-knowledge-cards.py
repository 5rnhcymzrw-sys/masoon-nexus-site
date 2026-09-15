from pathlib import Path

p = Path('scripts/unify-knowledge-cards.py')
s = p.read_text(encoding='utf-8')
s = s.replace("end_marker = '/* Abschlusskästen – globale Grundkomponente */'", "end_marker = '/* Grosse Abschlusskästen: einzige globale Komponente */'")
needle = "g = g[:gs] + shared + g[ge:]\n"
assert needle in s

extra_global = r'''# Verbleibende alte Fachwissen-Kartenregeln ausserhalb des ersetzten Blocks entfernen.
legacy_transition = """/* Startseite Fachwissen: finale globale Übergangsgeschwindigkeit */
html body.page-home.site-light-page main.home section.home-paths .home-paths__grid>a{
  transition:transform .49s ease,border-color .49s ease,box-shadow .49s ease,background-color .49s ease!important;
}

"""
if legacy_transition in g:
    g = g.replace(legacy_transition, '', 1)

g = g.replace('.home-paths__grid strong,\n.services-section .service-card h2{', '.services-section .service-card h2{')
g = g.replace('.home-paths__grid i{display:none!important;}\n', '')
g = g.replace('.knowledge-section .article-card h2{min-height:0!important;margin:0!important;font-family:"PT Serif",Georgia,serif!important;font-size:24px!important;font-weight:700!important;line-height:1.15!important;letter-spacing:0!important;text-transform:none!important;max-width:none!important;}\n', '')
g = g.replace('html body main .article-table-wrap table,\nhtml body main .home-paths__grid>a strong::after{', 'html body main .article-table-wrap table{')
g = g.replace('html body.site-light-page .article-card,\nhtml body.site-light-page .services-main .services-section .services-grid>.service-card,', 'html body.site-light-page .services-main .services-section .services-grid>.service-card,')
g = g.replace('body.site-light-page .home-paths__grid,\nbody.site-light-page .articles-grid,\nbody.site-light-page .services-grid{', 'body.site-light-page .services-grid{')
g = g.replace('body.site-light-page .home-paths__grid strong::after{\n  background:var(--short-line-color)!important;\n}\n', '')
old_short = 'html body .home-values__item h3::after,\nhtml body .home-paths__grid strong::after,\nhtml body .knowledge-section .article-card h2::after{'
g = g.replace(old_short, 'html body .home-values__item h3::after{')
g = g.replace('html body .home-values__item h3,\nhtml body .knowledge-section .article-card h2{', 'html body .home-values__item h3{')
g = g.replace('html body .home-values__item p,\nhtml body .knowledge-section .article-card>p:not(.article-meta){', 'html body .home-values__item p{')
g = g.replace('html body .home-paths__grid strong+span{\n  margin-top:var(--short-line-gap)!important;\n}\n', '')
g = g.replace('  body.site-light-page .home-values__items,\nbody.site-light-page .home-paths__grid,\nbody.site-light-page .articles-grid,\nbody.site-light-page .services-grid{', '  body.site-light-page .home-values__items,\nbody.site-light-page .services-grid{')
g = g.replace('@media(max-width:800px){\n  html body.site-light-page .articles-grid{grid-template-columns:1fr!important;}\n}', '@media(max-width:800px){\n  html body.site-light-page .articles-grid{grid-template-columns:1fr!important;gap:16px!important;}\n}', 1)

assert 'home-path-date' not in g
assert 'home-path-copy' not in g
assert 'home-paths__grid>a' not in g
assert 'home-paths__grid strong' not in g
assert 'knowledge-section .article-card' not in g
assert 'knowledge-section .articles-grid>.article-card' not in g

# Das alte gebaute Basis-CSS darf keine Fachwissen-Kartenoptik mehr enthalten.
base_css = Path('assets/index-CZfMKxM_.css')
b = base_css.read_text(encoding='utf-8')
replacements = [
    ('.home-paths__grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:28px;display:grid;}', ''),
    ('.home-paths__grid a{min-height:280px;box-shadow:none;-webkit-backdrop-filter:none;backdrop-filter:none;border:0;border-radius:0;padding:34px 38px;transition:none;position:relative;}', ''),
    ('.home-paths__grid a:hover{transform:none;}', ''),
    ('.home-paths__grid span{color:var(--stone);margin-bottom:46px;}', ''),
    ('.home-paths__grid strong{max-width:260px;font-family:var(--font-bitter), Georgia, serif;}', ''),
    ('.home-paths__grid i{color:var(--stone);font-size:18px;font-style:normal;position:absolute;bottom:28px;right:34px;}', ''),
    ('.service-card h2,\n.article-card h2{font-family:var(--font-bitter), Georgia, serif;margin:0 0 18px;}', '.service-card h2{font-family:var(--font-bitter), Georgia, serif;margin:0 0 18px;}'),
    ('.service-card p,\n.article-card>p:not(.article-meta){margin:0;}', '.service-card p{margin:0;}'),
    ('.articles-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:28px;display:grid;}', ''),
    ('.article-card{background:var(--sand);flex-direction:column;min-height:390px;padding:36px 42px;display:flex;}', ''),
    ('.article-card:nth-child(3n/**/+2){background:#dedbd4;}', ''),
    ('.article-card:nth-child(3n){background:var(--greige);}', ''),
    ('.article-card>p:not(.article-meta){flex:1;}', ''),
    ('.article-card a{border-bottom:1px solid var(--ink);letter-spacing:.1em;text-transform:uppercase;align-self:flex-start;margin-top:28px;padding-bottom:4px;font-size:10px;}', ''),
    ('.article-card h2{min-height:110px;letter-spacing:-.02em!important;font-family:Georgia,Times New Roman,serif!important;font-size:25px!important;font-weight:700!important;line-height:1.1!important;}', ''),
    ('.services-grid,\n.articles-grid{grid-template-columns:repeat(2,minmax(0,1fr));}', '.services-grid{grid-template-columns:repeat(2,minmax(0,1fr));}'),
    ('.services-grid,\n.articles-grid{grid-template-columns:1fr;}', '.services-grid{grid-template-columns:1fr;}'),
    ('.home-paths__grid{grid-template-columns:1fr;}', ''),
    ('.home-paths__grid a{border:0;min-height:170px;}', ''),
    ('.home-paths__grid a{padding:28px 24px;}', ''),
    ('.home-paths__grid strong,\n.service-card h2,\n.article-card h2{font-family:var(--font-cormorant), Georgia, serif;letter-spacing:-.02em;font-size:31px;font-weight:700;line-height:1.1;}', '.service-card h2{font-family:var(--font-cormorant), Georgia, serif;letter-spacing:-.02em;font-size:31px;font-weight:700;line-height:1.1;}'),
    ('.home-paths__grid strong,\n.services-section .service-card h2{font-family:Georgia,Times New Roman,serif;font-size:25px;}', '.services-section .service-card h2{font-family:Georgia,Times New Roman,serif;font-size:25px;}'),
]
for old, new in replacements:
    b = b.replace(old, new)
assert '.home-paths__grid' not in b
assert '.articles-grid' not in b
assert '.article-card' not in b
base_css.write_text(b, encoding='utf-8')

# Cache-Buster für die beiden produktiven Seiten, die diese Komponente verwenden.
for page in (Path('index.html'), Path('fachwissen/index.html')):
    t = page.read_text(encoding='utf-8')
    t = t.replace('index-CZfMKxM_.css?v=action-letterspacing-1-1-clean-20260913-1', 'index-CZfMKxM_.css?v=knowledge-cards-global-20260915-1')
    t = t.replace('global.css?v=image-loading-20260915-1', 'global.css?v=knowledge-cards-global-20260915-1')
    t = t.replace('unified-design.css?v=large-box-global-20260915-1', 'unified-design.css?v=knowledge-cards-global-20260915-1')
    page.write_text(t, encoding='utf-8')
'''

s = s.replace(needle, needle + extra_global, 1)

unified_anchor = "assert 'page-knowledge.site-light-page main .knowledge-section#knowledge-articles .articles-grid>.article-card' not in u\n"
assert unified_anchor in s
extra_unified = r'''# Veraltete Link-Typografie der früher sichtbaren Kartenaktion entfernen.
link_start = u.find('html body main .article-card>a{')
if link_start >= 0:
    link_end = u.index('html body main .home-action-button,', link_start)
    u = u[:link_start] + u[link_end:]
assert 'html body main .article-card>a{' not in u
'''
s = s.replace(unified_anchor, extra_unified + unified_anchor, 1)

p.write_text(s, encoding='utf-8')
