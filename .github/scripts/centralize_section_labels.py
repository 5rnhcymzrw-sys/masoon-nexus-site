from pathlib import Path
import re

RULE = re.compile(r'(?P<selector>[^{}]+)\{(?P<body>[^{}]*)\}', re.S)

BASE_PROPS = (
    'font', 'font-family', 'font-size', 'font-weight', 'line-height',
    'letter-spacing', 'font-style', 'font-synthesis', 'font-variant',
    'font-stretch', 'word-spacing', 'text-transform', 'text-decoration',
    'text-shadow', '-webkit-text-stroke', '-webkit-font-smoothing',
    '-moz-osx-font-smoothing', 'text-rendering', 'display', 'align-items', 'gap'
)


def split_selectors(selector):
    parts = []
    start = 0
    paren = bracket = 0
    quote = None
    escape = False
    for i, ch in enumerate(selector):
        if escape:
            escape = False
            continue
        if ch == '\\':
            escape = True
            continue
        if quote:
            if ch == quote:
                quote = None
            continue
        if ch in ('"', "'"):
            quote = ch
        elif ch == '(':
            paren += 1
        elif ch == ')':
            paren = max(0, paren - 1)
        elif ch == '[':
            bracket += 1
        elif ch == ']':
            bracket = max(0, bracket - 1)
        elif ch == ',' and paren == 0 and bracket == 0:
            parts.append(selector[start:i])
            start = i + 1
    parts.append(selector[start:])
    return parts


def targets_label(selector):
    # Ignore exclusions such as p:not(.section-label).
    cleaned = re.sub(r':not\([^)]*\.section-label[^)]*\)', '', selector, flags=re.I)
    return re.search(r'\.section-label(?:\b|:|\.|\[)', cleaned, re.I) is not None


def is_label_pseudo(selector):
    return targets_label(selector) and re.search(r'::(?:before|after|marker)\b|:(?:before|after)\b', selector, re.I) is not None


def strip_props(body, props):
    out = body
    removed = 0
    for prop in props:
        pattern = re.compile(r'(?i)(?:(?<=;)|^)\s*' + re.escape(prop) + r'\s*:[^;{}]*;?')
        out, n = pattern.subn('', out)
        removed += n
    out = re.sub(r';\s*;', ';', out)
    return out, removed


def transform(css):
    changed = 0

    def repl(match):
        nonlocal changed
        selector = match.group('selector')
        body = match.group('body')
        parts = split_selectors(selector)
        target = [p for p in parts if targets_label(p)]
        if not target:
            return match.group(0)

        other = [p for p in parts if not targets_label(p)]
        blocks = []
        if other:
            blocks.append(','.join(other) + '{' + body + '}')

        pseudo = [p for p in target if is_label_pseudo(p)]
        base = [p for p in target if not is_label_pseudo(p)]

        if base:
            stripped, n = strip_props(body, BASE_PROPS)
            changed += n
            if stripped.strip():
                blocks.append(','.join(base) + '{' + stripped + '}')

        # All old section-label pseudo-element decoration is obsolete.
        if pseudo:
            changed += 1

        return ''.join(blocks)

    return RULE.sub(repl, css), changed


files = sorted(Path('assets').glob('*.css'))
counts = {}
for path in files:
    css = path.read_text(encoding='utf-8')
    new_css, n = transform(css)
    if n:
        counts[str(path)] = n
        path.write_text(new_css.rstrip() + '\n', encoding='utf-8')

# Insert one canonical section-label visual rule in global.css.
p = Path('assets/global.css')
s = p.read_text(encoding='utf-8')
marker = '/* Einheitliche kleine Bereichstitel */'
if marker in s:
    raise SystemExit('canonical section-label rule already exists')
needle = '\nhtml body.page-home.site-light-page main.home section.home-hero h1.global-title,'
if s.count(needle) != 1:
    raise SystemExit(f'global insertion point expected once, found {s.count(needle)}')
canonical = '''\n/* Einheitliche kleine Bereichstitel */
html body.site-light-page main .section-label,
html body.site-light-page main p.section-label{
  font-family:var(--font-inter),Arial,sans-serif!important;
  font-size:11px!important;
  font-style:normal!important;
  font-weight:500!important;
  line-height:1.4!important;
  letter-spacing:1.1px!important;
  text-transform:uppercase!important;
  font-synthesis:none!important;
  display:flex!important;
  align-items:center!important;
  gap:16px!important;
}
html body.site-light-page main .section-label::before{
  content:""!important;
  display:block!important;
  width:30px!important;
  flex:0 0 30px!important;
  height:1px!important;
  background:currentColor!important;
  border:0!important;
}
html body.site-light-page main .section-label::after{
  content:none!important;
  display:none!important;
}
'''
s = s.replace(needle, canonical + needle, 1)
p.write_text(s.rstrip() + '\n', encoding='utf-8')

# Verification: no non-global CSS may own visual section-label typography/decorations.
prop_check = re.compile(r'(?i)(?:^|;)\s*(?:' + '|'.join(re.escape(x) for x in BASE_PROPS) + r')\s*:')
for path in files:
    css = path.read_text(encoding='utf-8')
    for m in RULE.finditer(css):
        parts = split_selectors(m.group('selector'))
        for part in parts:
            if not targets_label(part):
                continue
            if is_label_pseudo(part):
                if path.name != 'global.css':
                    raise SystemExit(f'old section-label pseudo rule remains in {path}: {part[-140:]}')
                continue
            if path.name != 'global.css' and prop_check.search(m.group('body')):
                raise SystemExit(f'old section-label visual rule remains in {path}: {part[-140:]}')

s = Path('assets/global.css').read_text(encoding='utf-8')
required = [
    '/* Einheitliche kleine Bereichstitel */',
    'font-size:11px!important',
    'font-weight:500!important',
    'line-height:1.4!important',
    'letter-spacing:1.1px!important',
    'width:30px!important',
    'height:1px!important',
    'background:currentColor!important',
]
for item in required:
    if item not in s:
        raise SystemExit(f'global canonical section-label value missing: {item}')

print('section labels centralized')
for name, count in counts.items():
    print(f'{name}: {count} obsolete label declarations/rules removed')
