from pathlib import Path
import re

TARGET = re.compile(r'(?:\.article-body\s*(?:>\s*)?h2|\.prose\s*(?:>\s*)?h2)', re.I)
RULE = re.compile(r'(?P<selector>[^{}]+(?:\.article-body\s*(?:>\s*)?h2|\.prose\s*(?:>\s*)?h2)[^{}]*)\{(?P<body>[^{}]*)\}', re.I)
TYPO_PROPS = (
    'font', 'font-family', 'font-size', 'font-weight', 'line-height',
    'letter-spacing', 'font-style', 'font-synthesis', '-webkit-text-stroke',
    'text-transform', 'text-shadow', '-webkit-font-smoothing',
    '-moz-osx-font-smoothing', 'text-rendering', '-webkit-text-fill-color'
)
PROP = re.compile(
    r'(?i)(?P<prefix>^|;)\s*(?:' + '|'.join(re.escape(x) for x in TYPO_PROPS) + r')\s*:[^;{}]*(?=;|$)'
)


def strip_target_typography(css):
    changed = 0
    def repl(match):
        nonlocal changed
        selector = match.group('selector')
        body = match.group('body')
        if not TARGET.search(selector):
            return match.group(0)
        new_body, n = PROP.subn(lambda m: m.group('prefix'), body)
        if n:
            changed += n
            new_body = re.sub(r';\s*;', ';', new_body)
            if new_body.strip() == ';':
                new_body = ''
        return selector + '{' + new_body + '}'
    return RULE.sub(repl, css), changed


files = sorted(Path('assets').glob('*.css'))
counts = {}
for path in files:
    css = path.read_text(encoding='utf-8')
    css2, n = strip_target_typography(css)
    if n:
        counts[str(path)] = n
        path.write_text(css2.rstrip() + '\n', encoding='utf-8')

# Verify no local typography remains on these subheading selectors before adding the canonical rule.
for path in files:
    css = path.read_text(encoding='utf-8')
    for m in RULE.finditer(css):
        selector = m.group('selector')
        body = m.group('body')
        if TARGET.search(selector) and PROP.search(body):
            raise SystemExit(f'old subheading typography remains in {path}: {selector[-160:]}')

# Add exactly one central rule to global.css.
p = Path('assets/global.css')
s = p.read_text(encoding='utf-8')
marker = '/* Einheitliche Zwischentitel auf allen Seiten */'
if marker in s:
    raise SystemExit('canonical subheading rule already exists')
needle = '\n.home-values__item h3,'
if s.count(needle) != 1:
    raise SystemExit(f'global insertion point expected once, found {s.count(needle)}')
canonical = '''\n/* Einheitliche Zwischentitel auf allen Seiten */
html body.site-light-page main .article-body h2,
html body.site-light-page main .prose h2{
  font-family:"PT Serif",Georgia,serif!important;
  font-size:22px!important;
  font-weight:700!important;
  line-height:1.12!important;
  letter-spacing:0!important;
  font-synthesis:none!important;
}
'''
s = s.replace(needle, canonical + needle, 1)
p.write_text(s.rstrip() + '\n', encoding='utf-8')

print('subheadings centralized')
for name, count in counts.items():
    print(f'{name}: removed {count} old typography declarations')
