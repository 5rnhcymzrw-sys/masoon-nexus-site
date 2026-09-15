from pathlib import Path
import re

RULE = re.compile(r'(?P<selector>[^{}]+)\{(?P<body>[^{}]*)\}', re.S)
TARGET = re.compile(r'(?:\.article-card-date\b|\.article-overline-label\b)', re.I)
TYPO_PROPS = (
    'font', 'font-family', 'font-size', 'font-weight', 'line-height',
    'letter-spacing', 'font-style', 'font-synthesis', 'text-transform',
    'color', 'opacity', '-webkit-font-smoothing', '-moz-osx-font-smoothing',
    'text-rendering', '-webkit-text-stroke', 'text-shadow'
)


def split_selectors(selector):
    parts=[]; start=0; paren=bracket=0; quote=None; esc=False
    for i,ch in enumerate(selector):
        if esc: esc=False; continue
        if ch=='\\': esc=True; continue
        if quote:
            if ch==quote: quote=None
            continue
        if ch in ('"', "'"): quote=ch
        elif ch=='(': paren+=1
        elif ch==')': paren=max(0,paren-1)
        elif ch=='[': bracket+=1
        elif ch==']': bracket=max(0,bracket-1)
        elif ch==',' and paren==0 and bracket==0:
            parts.append(selector[start:i]); start=i+1
    parts.append(selector[start:]); return parts


def strip_props(body):
    out=body; removed=0
    for prop in TYPO_PROPS:
        pat=re.compile(r'(?i)(?:(?<=;)|^)\s*'+re.escape(prop)+r'\s*:[^;{}]*;?')
        out,n=pat.subn('',out); removed+=n
    out=re.sub(r';\s*;', ';', out)
    return out, removed


def transform(css):
    changed=0
    def repl(m):
        nonlocal changed
        selector=m.group('selector'); body=m.group('body')
        parts=split_selectors(selector)
        targets=[p for p in parts if TARGET.search(p)]
        if not targets: return m.group(0)
        others=[p for p in parts if not TARGET.search(p)]
        stripped,n=strip_props(body); changed+=n
        blocks=[]
        if others: blocks.append(','.join(others)+'{'+body+'}')
        if stripped.strip(): blocks.append(','.join(targets)+'{'+stripped+'}')
        return ''.join(blocks)
    return RULE.sub(repl, css), changed

# Remove local typography/color ownership from all CSS files.
counts={}
for path in sorted(Path('assets').glob('*.css')):
    css=path.read_text(encoding='utf-8')
    new,n=transform(css)
    if n:
        counts[str(path)]=n
        path.write_text(new.rstrip()+'\n',encoding='utf-8')

# Remove only the local color override from Fachwissen inline style; keep all layout values.
p=Path('fachwissen/index.html')
s=p.read_text(encoding='utf-8')
s2,n=re.subn(
    r'(\.article-card-date\{[^{}]*?)\s*color:#999999!important;([^{}]*\})',
    r'\1\2', s, count=1, flags=re.S
)
if n != 1:
    raise SystemExit(f'fachwissen/index.html article-card-date color override expected once, found {n}')
p.write_text(s2,encoding='utf-8')

# Add the single canonical rule to global.css using the current Fachwissen-card values.
p=Path('assets/global.css')
s=p.read_text(encoding='utf-8')
marker='/* Einheitliche Fachbeitrag Metatitel */'
if marker in s:
    raise SystemExit('canonical article meta rule already exists')
needle='\n/* Einheitliche kleine Bereichstitel */'
if s.count(needle)!=1:
    raise SystemExit(f'global insertion point expected once, found {s.count(needle)}')
canonical='''\n/* Einheitliche Fachbeitrag Metatitel */
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
s=s.replace(needle,canonical+needle,1)
p.write_text(s.rstrip()+'\n',encoding='utf-8')

# Verify canonical values exist.
g=Path('assets/global.css').read_text(encoding='utf-8')
for item in ['font-size:11px!important','font-weight:500!important','line-height:15.4px!important','letter-spacing:1.1px!important','color:#777777!important']:
    if item not in g: raise SystemExit('missing canonical value: '+item)

print('article meta titles centralized')
for name,count in counts.items(): print(name,count)
