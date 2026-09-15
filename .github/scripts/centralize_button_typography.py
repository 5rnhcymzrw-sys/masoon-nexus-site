from pathlib import Path
import re

RULE = re.compile(r'(?P<selector>[^{}]+)\{(?P<body>[^{}]*)\}', re.S)
STYLE = re.compile(r'(<style\b[^>]*>)(?P<css>.*?)(</style>)', re.I | re.S)

TARGET_CLASSES = (
    'button',
    'home-action-button',
    'home-values__all-services',
    'services-contact-button',
    'details-action',
    'article-action',
    'home-paths__action',
)

TYPO_PROPS = (
    'font', 'font-family', 'font-size', 'font-style', 'font-weight',
    'line-height', 'letter-spacing', 'text-transform', 'font-synthesis',
    'font-variant', 'font-stretch', 'word-spacing',
)


def split_selectors(selector):
    parts=[]; start=0; paren=bracket=0; quote=None; esc=False
    for i,ch in enumerate(selector):
        if esc:
            esc=False; continue
        if ch=='\\':
            esc=True; continue
        if quote:
            if ch==quote: quote=None
            continue
        if ch in ('"', "'"):
            quote=ch
        elif ch=='(':
            paren+=1
        elif ch==')':
            paren=max(0,paren-1)
        elif ch=='[':
            bracket+=1
        elif ch==']':
            bracket=max(0,bracket-1)
        elif ch==',' and paren==0 and bracket==0:
            parts.append(selector[start:i]); start=i+1
    parts.append(selector[start:])
    return parts


def strip_pseudos_and_attrs(part):
    s = re.sub(r'\[[^\]]*\]', '', part)
    s = re.sub(r'::?[A-Za-z0-9_-]+(?:\([^)]*\))?', '', s)
    return s.strip()


def is_target(part):
    s = strip_pseudos_and_attrs(part)
    for cls in TARGET_CLASSES:
        if re.search(r'\.' + re.escape(cls) + r'(?:\.[A-Za-z0-9_-]+|#[A-Za-z0-9_-]+)*\s*$', s):
            return True
    if re.search(r'(?:^|[\s>+~])button(?:\.[A-Za-z0-9_-]+|#[A-Za-z0-9_-]+)*\s*$', s):
        return True
    if re.search(r'(?:^|[\s>+~])input\s*$', s) and re.search(r'\[type\s*=\s*["\']?(?:submit|button)["\']?\]', part, re.I):
        return True
    return False


def strip_props(body):
    out=body; removed=0
    for prop in TYPO_PROPS:
        pat=re.compile(r'(?i)(?:(?<=;)|^)\s*'+re.escape(prop)+r'\s*:[^;{}]*;?')
        out,n=pat.subn('',out); removed+=n
    out=re.sub(r';\s*;', ';', out)
    return out, removed


def transform_css(css):
    changed=0
    def repl(m):
        nonlocal changed
        selector=m.group('selector'); body=m.group('body')
        parts=split_selectors(selector)
        targets=[p for p in parts if is_target(p)]
        if not targets:
            return m.group(0)
        others=[p for p in parts if not is_target(p)]
        stripped,n=strip_props(body); changed+=n
        blocks=[]
        if others:
            blocks.append(','.join(others)+'{'+body+'}')
        if stripped.strip():
            blocks.append(','.join(targets)+'{'+stripped+'}')
        return ''.join(blocks)
    return RULE.sub(repl, css), changed

# Remove the previous canonical rule first so this script can be safely rerun.
p=Path('assets/global.css')
s=p.read_text(encoding='utf-8')
s,ncanon=re.subn(
    r'\n?/\* Einheitliche Button-Typografie \*/\nhtml body\.site-light-page main :is\([^{}]+\)\{[^{}]*\}\n?',
    '\n', s, count=1, flags=re.S
)
if ncanon not in (0,1):
    raise SystemExit(f'unexpected canonical button-rule count: {ncanon}')
p.write_text(s,encoding='utf-8')

# Clean all CSS files.
counts={}
for path in sorted(Path('assets').glob('*.css')):
    css=path.read_text(encoding='utf-8')
    new,n=transform_css(css)
    if n:
        counts[str(path)]=n
        path.write_text(new.rstrip()+'\n',encoding='utf-8')

# Clean button typography from page-local <style> blocks as well.
for path in sorted(Path('.').rglob('*.html')):
    text=path.read_text(encoding='utf-8')
    holder=[0]
    def style_repl(m):
        css,n=transform_css(m.group('css'))
        holder[0]+=n
        return m.group(1)+css+m.group(3)
    new=STYLE.sub(style_repl,text)
    if holder[0]:
        counts[str(path)]=counts.get(str(path),0)+holder[0]
        path.write_text(new,encoding='utf-8')

# Add one canonical rule to global.css using the exact section-label values.
p=Path('assets/global.css')
s=p.read_text(encoding='utf-8')
canonical='''\n/* Einheitliche Button-Typografie */
html body.site-light-page main :is(button,.button,.home-action-button,.home-values__all-services,.services-contact-button,.details-action,.article-action,.home-paths__action,input[type="submit"],input[type="button"]){
  font-family:var(--font-inter),Arial,sans-serif!important;
  font-size:11px!important;
  font-style:normal!important;
  font-weight:500!important;
  line-height:1.4!important;
  letter-spacing:1.1px!important;
  text-transform:uppercase!important;
  font-synthesis:none!important;
}
'''
needle='\n/* Einheitliche Fachbeitrag Metatitel */'
if s.count(needle)!=1:
    raise SystemExit(f'global insertion point expected once, found {s.count(needle)}')
s=s.replace(needle,canonical+needle,1)
p.write_text(s.rstrip()+'\n',encoding='utf-8')

# Verify no page-local target owns typography anymore.
prop_check=re.compile(r'(?i)(?:^|;)\s*(?:'+'|'.join(re.escape(x) for x in TYPO_PROPS)+r')\s*:')
for path in sorted(Path('assets').glob('*.css')):
    css=path.read_text(encoding='utf-8')
    for m in RULE.finditer(css):
        if not any(is_target(p) for p in split_selectors(m.group('selector'))):
            continue
        if path.name=='global.css' and 'html body.site-light-page main :is(button,.button,.home-action-button' in m.group('selector'):
            continue
        if prop_check.search(m.group('body')):
            raise SystemExit(f'old button typography remains in {path}: {m.group("selector")[-160:]}')

for path in sorted(Path('.').rglob('*.html')):
    text=path.read_text(encoding='utf-8')
    for sm in STYLE.finditer(text):
        for m in RULE.finditer(sm.group('css')):
            if any(is_target(p) for p in split_selectors(m.group('selector'))) and prop_check.search(m.group('body')):
                raise SystemExit(f'old inline button typography remains in {path}: {m.group("selector")[-160:]}')

# Verify exact section-label-equivalent values.
g=Path('assets/global.css').read_text(encoding='utf-8')
for item in [
    '/* Einheitliche Button-Typografie */',
    'html body.site-light-page main :is(button,.button,.home-action-button',
    'font-family:var(--font-inter),Arial,sans-serif!important',
    'font-size:11px!important',
    'font-style:normal!important',
    'font-weight:500!important',
    'line-height:1.4!important',
    'letter-spacing:1.1px!important',
    'text-transform:uppercase!important',
    'font-synthesis:none!important',
]:
    if item not in g:
        raise SystemExit('missing canonical button value: '+item)

print('button typography centralized')
for name,count in counts.items():
    print(f'{name}: removed {count} local typography declarations')
