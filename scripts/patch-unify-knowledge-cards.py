from pathlib import Path

p = Path('scripts/unify-knowledge-cards.py')
s = p.read_text(encoding='utf-8')
needle = "g = g[:gs] + shared + g[ge:]\n"
assert needle in s
legacy = """/* Startseite Fachwissen: finale globale Übergangsgeschwindigkeit */
html body.page-home.site-light-page main.home section.home-paths .home-paths__grid>a{
  transition:transform .49s ease,border-color .49s ease,box-shadow .49s ease,background-color .49s ease!important;
}

"""
insertion = needle + "legacy_transition = " + repr(legacy) + "\nif legacy_transition in g:\n    g = g.replace(legacy_transition, '', 1)\n"
s = s.replace(needle, insertion, 1)
p.write_text(s, encoding='utf-8')
