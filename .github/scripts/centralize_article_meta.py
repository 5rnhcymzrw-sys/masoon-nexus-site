from pathlib import Path
import subprocess

BASELINE = '3428b4e7750539e6d4fae57a380d1f059229ea90'

canonical = '''/* Einheitliche Fachbeitrag Metatitel */
html body.site-light-page main :is(.article-card-date,.article-overline-label){
  font-family:var(--font-inter),Arial,sans-serif!important;
  font-size:11px!important;
  font-weight:500!important;
  line-height:15.4px!important;
  letter-spacing:1.1px!important;
  text-transform:uppercase!important;
  font-style:normal!important;
  font-synthesis:none!important;
  color:#777777!important;
  opacity:1!important;
  -webkit-font-smoothing:antialiased!important;
  -moz-osx-font-smoothing:grayscale!important;
  text-rendering:geometricPrecision!important;
}
html body.site-light-page main .article-overline-label::before,
html body.site-light-page main .article-overline-label::after{
  content:none!important;
  display:none!important;
}

'''

# Repair global.css from the exact pre-cleanup version, then add only the canonical meta-title rule.
source = subprocess.check_output(['git','show',f'{BASELINE}:assets/global.css'], text=True)
if '/* Einheitliche Fachbeitrag Metatitel */' in source:
    raise SystemExit('baseline unexpectedly already contains meta-title rule')
needle = 'html body.page-home.site-light-page main.home section.home-hero h1.global-title,'
if source.count(needle) != 1:
    raise SystemExit(f'global insertion point expected once, found {source.count(needle)}')
source = source.replace(needle, canonical + needle, 1)
Path('assets/global.css').write_text(source.rstrip()+'\n', encoding='utf-8')

# On article detail pages, keep only the layout margin; color and opacity now come from global.css.
p = Path('assets/article-detail.css')
s = p.read_text(encoding='utf-8')
old = 'html body.site-light-page main.article-main .article-overline .section-label{margin:0!important;color:#484a4f!important;opacity:1!important}'
new = 'html body.site-light-page main.article-main .article-overline .section-label{margin:0!important}'
if s.count(old) != 1:
    raise SystemExit(f'article-detail local meta appearance rule expected once, found {s.count(old)}')
s = s.replace(old, new, 1)
p.write_text(s, encoding='utf-8')

# Verify the repaired global rules that must not have been damaged.
g = Path('assets/global.css').read_text(encoding='utf-8')
required = [
    '/* Einheitliche Fachbeitrag Metatitel */',
    'font-size:11px!important',
    'font-weight:500!important',
    'line-height:15.4px!important',
    'letter-spacing:1.1px!important',
    'color:#777777!important',
    'html body main p:not(.section-label):not(.article-meta):not(.article-card-date)',
    'html body main :is(#mt-nav-typography,.mt-nav-typography)',
]
for item in required:
    if item not in g:
        raise SystemExit('global verification failed: '+item)

if 'color:#484a4f!important' in Path('assets/article-detail.css').read_text(encoding='utf-8').split('article-shell',1)[0]:
    raise SystemExit('article overline color still locally defined')

print('article meta titles centralized safely')
