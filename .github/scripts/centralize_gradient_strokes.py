from pathlib import Path
import re

FRAME = 'linear-gradient(110deg,#f3e8d4 0%,#e8e5df 38%,#c7cbd3 66%,#8d96a8 100%)'
LINE = 'linear-gradient(90deg,#f3e8d4 0%,#e8e5df 38%,#c7cbd3 66%,#8d96a8 100%)'

files = sorted(Path('assets').glob('*.css'))
counts = {}

for path in files:
    css = path.read_text(encoding='utf-8')
    original = css

    # Canonical frame gradient: only border-image uses.
    css = css.replace(f'border-image:{FRAME} 1!important', 'border-image:var(--mt-gradient-frame) 1!important')
    css = css.replace(f'border-image:{FRAME} 1', 'border-image:var(--mt-gradient-frame) 1')

    # Canonical horizontal gradient lines: background-image + explicit 1px thickness.
    rule_re = re.compile(r'(?P<sel>[^{}]+)\{(?P<body>[^{}]*)\}', re.S)
    def rewrite_rule(m):
        sel, body = m.group('sel'), m.group('body')
        b = body

        if 'border-image:var(--mt-gradient-frame) 1' in b:
            b = b.replace('border:1px solid transparent!important', 'border:var(--mt-gradient-frame-width) solid transparent!important')
            b = b.replace('border:1px solid transparent', 'border:var(--mt-gradient-frame-width) solid transparent')
            b = b.replace('border-width:1px!important', 'border-width:var(--mt-gradient-frame-width)!important')
            b = b.replace('border-width:1px', 'border-width:var(--mt-gradient-frame-width)')

        if LINE in b:
            # Longhand line construction.
            if 'background-size:100% 1px' in b:
                b = b.replace(f'background-image:{LINE}!important', 'background-image:var(--mt-gradient-line)!important')
                b = b.replace(f'background-image:{LINE}', 'background-image:var(--mt-gradient-line)')
                b = b.replace('background-size:100% 1px!important', 'background-size:100% var(--mt-gradient-line-width)!important')
                b = b.replace('background-size:100% 1px', 'background-size:100% var(--mt-gradient-line-width)')

            # Shorthand line construction.
            b = b.replace(f'background:{LINE} left top/100% 1px no-repeat!important', 'background:var(--mt-gradient-line) left top/100% var(--mt-gradient-line-width) no-repeat!important')
            b = b.replace(f'background:{LINE} left top/100% 1px no-repeat', 'background:var(--mt-gradient-line) left top/100% var(--mt-gradient-line-width) no-repeat')

            # Pseudo-element lines using explicit height.
            if f'background:{LINE}' in b or 'background:var(--mt-gradient-line)' in b:
                b = b.replace(f'background:{LINE}!important', 'background:var(--mt-gradient-line)!important')
                b = b.replace(f'background:{LINE}', 'background:var(--mt-gradient-line)')
                b = b.replace('height:1px!important', 'height:var(--mt-gradient-line-width)!important')
                b = b.replace('height:1px', 'height:var(--mt-gradient-line-width)')

        return sel + '{' + b + '}'

    css = rule_re.sub(rewrite_rule, css)

    # Add the canonical values once to the existing :root in global.css.
    if path.name == 'global.css':
        if '--mt-gradient-frame:' not in css:
            old = ':root{'
            insert = (':root{--mt-gradient-frame:' + FRAME + ';'
                      '--mt-gradient-line:' + LINE + ';'
                      '--mt-gradient-frame-width:1px;'
                      '--mt-gradient-line-width:1px;')
            if css.count(old) != 1:
                raise SystemExit(f'global.css: expected exactly one :root block, found {css.count(old)}')
            css = css.replace(old, insert, 1)

    if css != original:
        counts[str(path)] = 1
        path.write_text(css, encoding='utf-8')

# Verification: article reference must use the global variables and retain 1px canonical values globally.
article = Path('assets/article-detail.css').read_text(encoding='utf-8')
required = [
    'border:var(--mt-gradient-frame-width) solid transparent!important',
    'border-image:var(--mt-gradient-frame) 1!important',
    'background-image:var(--mt-gradient-line)!important',
    'background-size:100% var(--mt-gradient-line-width)!important',
]
for item in required:
    if item not in article:
        raise SystemExit(f'article-detail.css missing expected global gradient reference: {item}')

global_css = Path('assets/global.css').read_text(encoding='utf-8')
for item in [
    '--mt-gradient-frame:' + FRAME,
    '--mt-gradient-line:' + LINE,
    '--mt-gradient-frame-width:1px',
    '--mt-gradient-line-width:1px',
]:
    if item not in global_css:
        raise SystemExit(f'global.css missing canonical gradient value: {item}')

print('gradient strokes centralized')
for name in counts:
    print(name)
