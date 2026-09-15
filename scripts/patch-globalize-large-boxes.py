from pathlib import Path
p=Path('scripts/globalize-large-boxes.py')
s=p.read_text(encoding='utf-8')
old="b = u.index('html body.page-home.site-light-page main.home>section.home-values', a)"
new="b = u.index('/* Seitenspezifische Regeln, aus dem HTML konsolidiert. */', a)"
assert old in s
s=s.replace(old,new,1)
p.write_text(s,encoding='utf-8')
