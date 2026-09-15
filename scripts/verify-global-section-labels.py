from pathlib import Path
import re
files=['assets/contact.css','assets/dienstleistungen.css','assets/unified-design.css','assets/article-detail.css','assets/index-CZfMKxM_.css']
for f in files:
    s=Path(f).read_text(encoding='utf-8')
    for m in re.finditer(r'([^{}]*)\{([^{}]*)\}',s,re.S):
        sel=re.sub(r':not\([^)]*\)','',m.group(1))
        if '.section-label' in sel and re.search(r'\bcolor\s*:',m.group(2)):
            raise SystemExit(f'Verbleibende FarbregeI in {f}: {m.group(0)[:300]}')
print('OK: keine seitenspezifische section-label Farbe mehr')
