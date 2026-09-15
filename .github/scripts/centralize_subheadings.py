from pathlib import Path
import re
import subprocess

BASELINE = '9c0728400a87d1b8d0ff7c420f1ce914ed066d92'
TARGET = re.compile(r'(?:\.article-body\s*(?:>\s*)?h2|\.prose\s*(?:>\s*)?h2)', re.I)
RULE = re.compile(r'(?P<selector>[^{}]+)\{(?P<body>[^{}]*)\}', re.S)
TYPO_PROPS = (
    'font', 'font-family', 'font-size', 'font-weight', 'line-height',
    'letter-spacing', 'font-style', 'font-synthesis', '-webkit-text-stroke',
    'text-transform', 'text-shadow', '-webkit-font-smoothing',
    '-moz-osx-font-smoothing', 'text-rendering', '-webkit-text-fill-color'
)
PROP_CHECK = re.compile(
    r'(?i)(?:^|;)\s*(?:' + '|'.join(re.escape(x) for x in TYPO_PROPS) + r')\s*:'
)


def baseline_text(path):
    return subprocess.check_output(
        ['git', 'show', f'{BASELINE}:{path.as_posix()}'], text=True
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


def strip_body(body):
    removed = 0
    out = body
    for prop in TYPO_PROPS:
        pattern = re.compile(
            r'(?i)(?:(?<=;)|^)\s*' + re.escape(prop) + r'\s*:[^;{}]*;?'
        )
        out, n = pattern.subn('', out)
        removed += n
    return out, removed


def clean_rule_text(selector, body):
    # Preserve layout rules exactly except harmless whitespace around an emptied body.
    if not body.strip():
        return ''
    return selector + '{' + body + '}'


def transform(css):
    removed_total = 0

    def repl(match):
        nonlocal removed_total
        selector = match.group('selector')
        body = match.group('body')
        parts = split_selectors(selector)
        target_parts = [p for p in parts if TARGET.search(p)]
        if not target_parts:
            return match.group(0)

        stripped, removed = strip_body(body)
        if not removed:
            return match.group(0)
        removed_total += removed

        other_parts = [p for p in parts if not TARGET.search(p)]
        blocks = []
        if other_parts:
            blocks.append(','.join(other_parts) + '{' + body + '}')
        target_selector = ','.join(target_parts)
        target_rule = clean_rule_text(target_selector, stripped)
        if target_rule:
            blocks.append(target_rule)
        return ''.join(blocks)

    return RULE.sub(repl, css), removed_total


files = sorted(Path('assets').glob('*.css'))
counts = {}
for path in files:
    source = baseline_text(path)
    transformed, n = transform(source)
    if n:
        counts[str(path)] = n
    path.write_text(transformed.rstrip() + '\n', encoding='utf-8')

# Verify that all local target rules are free of typography before adding the canonical rule.
for path in files:
    css = path.read_text(encoding='utf-8')
    for m in RULE.finditer(css):
        selector = m.group('selector')
        if not TARGET.search(selector):
            continue
        for part in split_selectors(selector):
            if TARGET.search(part) and PROP_CHECK.search(m.group('body')):
                raise SystemExit(f'old subheading typography remains in {path}: {part[-160:]}')

# Add one central rule in global.css using the exact Testseite values.
p = Path('assets/global.css')
s = p.read_text(encoding='utf-8')
marker = '/* Einheitliche Zwischentitel auf allen Seiten */'
if marker in s:
    raise SystemExit('canonical subheading rule unexpectedly exists in baseline')
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

print('subheadings centralized safely')
for name, count in counts.items():
    print(f'{name}: removed {count} old target typography declarations')
