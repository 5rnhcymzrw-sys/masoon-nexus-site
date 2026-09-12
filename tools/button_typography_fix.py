from pathlib import Path
import re

CACHE = 'button-typography-exact-20260912-2'

changed = set()

def replace_exact(path, old, new, expected=1):
    p = Path(path)
    text = p.read_text()
    count = text.count(old)
    if count != expected:
        raise SystemExit(f'{path}: expected {expected} occurrence(s), found {count}: {old[:140]!r}')
    p.write_text(text.replace(old, new, expected))
    changed.add(p)

# Repair two old unterminated comments so the existing action rules are active.
base = 'assets/unified-design-base-20260907.css'
replace_exact(
    base,
    '}/* Kleine Metadaten und Textaktionen: Typografie wie die Kopfzeilen-Navigation,\nhtml body main .contact-split__form-label,',
    '}/* Kleine Metadaten und Textaktionen: Typografie wie die Kopfzeilen-Navigation. */\nhtml body main .contact-split__form-label,'
)
replace_exact(
    base,
    '}/* Kleine Metadaten,\nhtml body main .contact-split__form-label.contact-split__form-label.contact-split__form-label.contact-split__form-label.contact-split__form-label.contact-split__form-label,',
    '}/* Kleine Metadaten und Aktionsbeschriftungen */\nhtml body main .contact-split__form-label.contact-split__form-label.contact-split__form-label.contact-split__form-label.contact-split__form-label.contact-split__form-label,'
)

# Older shared action rule: exact section-label typography.
replace_exact(
    base,
    '''html body main .details-action,\nhtml body main .home-values__all-services,\nhtml body main .article-card>a{\n  font-family:var(--font-inter),Arial,sans-serif!important;\n  font-size:11px!important;\n  font-weight:500!important;\n  line-height:1.65!important;\n  letter-spacing:1.1px!important;\n  text-transform:uppercase!important;\n  color:#777777!important;\n}''',
    '''html body main .details-action,\nhtml body main .home-values__all-services,\nhtml body main .article-card>a{\n  font-family:var(--font-inter),Arial,sans-serif!important;\n  font-size:11px!important;\n  font-style:normal!important;\n  font-weight:500!important;\n  line-height:1.4!important;\n  letter-spacing:1.1px!important;\n  text-transform:uppercase!important;\n  text-decoration:none!important;\n  color:#777777!important;\n}'''
)
replace_exact(
    base,
    '''html body.site-light-page .knowledge-section .articles-grid>.article-card>.details-action{\n  font-family:var(--font-inter),Arial,sans-serif!important;\n  font-size:11px!important;\n  font-weight:500!important;\n  line-height:1.65!important;\n  letter-spacing:1.1px!important;\n  text-transform:uppercase!important;\n  color:#777777!important;\n}''',
    '''html body.site-light-page .knowledge-section .articles-grid>.article-card>.details-action{\n  font-family:var(--font-inter),Arial,sans-serif!important;\n  font-size:11px!important;\n  font-style:normal!important;\n  font-weight:500!important;\n  line-height:1.4!important;\n  letter-spacing:1.1px!important;\n  text-transform:uppercase!important;\n  text-decoration:none!important;\n  color:#777777!important;\n}'''
)

# Keep the high-specificity shared rule as typography owner, but let existing page state rules own colour.
old_shared_hi = '''html body main .home-action-button.home-action-button.home-action-button.home-action-button.home-action-button.home-action-button,\nhtml body main .home-values__all-services.home-values__all-services.home-values__all-services.home-values__all-services.home-values__all-services.home-values__all-services,\nhtml body main .details-action.details-action.details-action.details-action.details-action.details-action,\nhtml body main .article-action.article-action.article-action.article-action.article-action.article-action,\nhtml body main .article-card.article-card.article-card.article-card.article-card.article-card>a,\nhtml body main .services-contact-button.services-contact-button.services-contact-button.services-contact-button.services-contact-button.services-contact-button{\n  font-family:var(--font-inter),Arial,sans-serif!important;\n  font-size:11px!important;\n  font-style:normal!important;\n  font-weight:500!important;\n  font-variant:normal!important;\n  font-stretch:normal!important;\n  line-height:1.4!important;\n  letter-spacing:1.1px!important;\n  word-spacing:normal!important;\n  text-transform:uppercase!important;\n  text-decoration:none!important;\n  text-shadow:none!important;\n  -webkit-text-stroke:0!important;\n  color:#777777!important;\n  opacity:1!important;\n}'''
new_shared_hi = old_shared_hi.replace('  color:#777777!important;\n', '')
replace_exact(base, old_shared_hi, new_shared_hi)

# Existing Mehr/Beitrag shared rule: leave colour to the existing normal/state rules.
replace_exact(
    base,
    '''  -webkit-text-stroke:0!important;\n  color:#777777!important;\n  opacity:1!important;\n  transform:translateY(-3px)!important;\n}\nhtml body.site-light-page main .knowledge-section .article-card .article-action{''',
    '''  -webkit-text-stroke:0!important;\n  opacity:1!important;\n  transform:translateY(-3px)!important;\n}\nhtml body.site-light-page main .knowledge-section .article-card .article-action{'''
)

# Contact submit text exact; symbol tracking stays neutral.
contact = 'assets/contact.css'
replace_exact(contact, 'font-family: var(--font-inter) !important;\n  font-size: 11px !important;\n  font-weight: 500 !important;\n  line-height: 1.65 !important;\n  letter-spacing:1.1px!important;\n  text-transform: uppercase !important;',
                    'font-family: var(--font-inter),Arial,sans-serif !important;\n  font-size: 11px !important;\n  font-style: normal !important;\n  font-weight: 500 !important;\n  line-height: 1.4 !important;\n  letter-spacing:1.1px!important;\n  text-transform: uppercase !important;', expected=1)
replace_exact(contact, 'letter-spacing:1.1px!important;\n}\n\n.contact-split__form .form-status', 'letter-spacing:0!important;\n}\n\n.contact-split__form .form-status', expected=1)

# Page-specific existing button rules.
unified = 'assets/unified-design.css'
replace_exact(unified, 'font-family:var(--font-inter)!important;font-size:11px!important;font-weight:500!important;line-height:1.65!important;letter-spacing:1.1px!important;text-transform:uppercase!important;',
                       'font-family:var(--font-inter),Arial,sans-serif!important;font-size:11px!important;font-style:normal!important;font-weight:500!important;line-height:1.4!important;letter-spacing:1.1px!important;text-transform:uppercase!important;', expected=2)
replace_exact(unified, 'html body.page-home .home-action-button span{display:inline-block!important;margin-left:10px!important;font-size:20px!important;font-weight:300!important;line-height:.7!important;letter-spacing:1.1px!important;vertical-align:-2px!important;}',
                       'html body.page-home .home-action-button span{display:inline-block!important;margin-left:10px!important;font-size:20px!important;font-weight:300!important;line-height:.7!important;letter-spacing:0!important;vertical-align:-2px!important;}')
replace_exact(unified, 'font-size:11px!important;font-weight:500!important;line-height:1.65!important;letter-spacing:1.1px!important;text-transform:uppercase!important;}',
                       'font-size:11px!important;font-style:normal!important;font-weight:500!important;line-height:1.4!important;letter-spacing:1.1px!important;text-transform:uppercase!important;}', expected=3)
replace_exact(unified, 'html body.page-home.site-light-page main.home section.home-paths>p .home-action-button>span,\nhtml body.page-home.site-light-page main.home section.home-contact-band .home-action-button>span{\n  display:inline-block!important;margin-left:10px!important;font-size:20px!important;font-weight:300!important;line-height:.7!important;\n  letter-spacing:1.1px!important;transform:translateY(-1px)!important;vertical-align:baseline!important;}',
                       'html body.page-home.site-light-page main.home section.home-paths>p .home-action-button>span,\nhtml body.page-home.site-light-page main.home section.home-contact-band .home-action-button>span{\n  display:inline-block!important;margin-left:10px!important;font-size:20px!important;font-weight:300!important;line-height:.7!important;\n  letter-spacing:0!important;transform:translateY(-1px)!important;vertical-align:baseline!important;}')
replace_exact(unified,
'''html body.page-home.site-light-page main.home section.home-paths>p .home-action-button,\nhtml body.page-home.site-light-page main.home section.home-paths>p .home-action-button:hover,\nhtml body.page-home.site-light-page main.home section.home-paths>p .home-action-button:focus-visible{\n  color:#4f4e4b!important;\n}''',
'''html body.page-home.site-light-page main.home section.home-paths>p .home-action-button:hover,\nhtml body.page-home.site-light-page main.home section.home-paths>p .home-action-button:focus-visible{\n  color:#4f4e4b!important;\n}''')
replace_exact(unified, 'letter-spacing:.14em!important;\n  text-transform:uppercase!important;\n  opacity:0!important;', 'letter-spacing:1.1px!important;\n  text-transform:uppercase!important;\n  opacity:0!important;', expected=1)

# Services closing button and symbols.
replace_exact(unified, 'html body.page-services.site-light-page .services-closing__links .services-contact-button{display:inline-flex!important;align-items:center!important;justify-content:space-between!important;box-sizing:border-box!important;width:220px!important;height:48px!important;margin:2px 0 0!important;padding:0 18px!important;border:0!important;border-radius:0!important;background:#0b0b0b!important;box-shadow:0 12px 20px rgba(0,0,0,.16)!important;color:#777777!important;text-decoration:none!important;font-family:var(--font-inter)!important;font-size:11px!important;font-weight:500!important;line-height:1.65!important;letter-spacing:1.1px!important;text-transform:uppercase!important}',
                       'html body.page-services.site-light-page .services-closing__links .services-contact-button{display:inline-flex!important;align-items:center!important;justify-content:space-between!important;box-sizing:border-box!important;width:220px!important;height:48px!important;margin:2px 0 0!important;padding:0 18px!important;border:0!important;border-radius:0!important;background:#0b0b0b!important;box-shadow:0 12px 20px rgba(0,0,0,.16)!important;color:#777777!important;text-decoration:none!important;font-family:var(--font-inter),Arial,sans-serif!important;font-size:11px!important;font-style:normal!important;font-weight:500!important;line-height:1.4!important;letter-spacing:1.1px!important;text-transform:uppercase!important}')
replace_exact(unified, 'html body.page-services.site-light-page .services-closing__links .services-contact-button span{font-size:17px!important;font-weight:300!important;line-height:1!important;letter-spacing:1.1px!important}',
                       'html body.page-services.site-light-page .services-closing__links .services-contact-button span{font-size:17px!important;font-weight:300!important;line-height:1!important;letter-spacing:0!important}')
replace_exact(unified, 'html body.page-services.site-light-page main.services-main .services-contact-button>span{\n  display:inline-block!important;margin-left:10px!important;font-size:20px!important;font-weight:300!important;line-height:.7!important;\n  letter-spacing:1.1px!important;transform:translateY(-1px)!important;vertical-align:baseline!important\n}',
                       'html body.page-services.site-light-page main.services-main .services-contact-button>span{\n  display:inline-block!important;margin-left:10px!important;font-size:20px!important;font-weight:300!important;line-height:.7!important;\n  letter-spacing:0!important;transform:translateY(-1px)!important;vertical-align:baseline!important\n}')

# Contact submit symbol and normal/interactive colour states.
replace_exact(unified, 'html body.page-contact.site-light-page main .contact-split__form button[type="submit"]>span{\n  display:inline-block!important;margin-left:10px!important;font-size:20px!important;font-weight:300!important;\n  line-height:.7!important;letter-spacing:1.1px!important;transform:translateY(-1px)!important;vertical-align:baseline!important;}',
                       'html body.page-contact.site-light-page main .contact-split__form button[type="submit"]>span{\n  display:inline-block!important;margin-left:10px!important;font-size:20px!important;font-weight:300!important;\n  line-height:.7!important;letter-spacing:0!important;transform:translateY(-1px)!important;vertical-align:baseline!important;}')
replace_exact(unified,
'''html body.page-contact.site-light-page main .contact-split__form button[type="submit"],\nhtml body.page-contact.site-light-page main .contact-split__form button[type="submit"]:hover,\nhtml body.page-contact.site-light-page main .contact-split__form button[type="submit"]:focus,\nhtml body.page-contact.site-light-page main .contact-split__form button[type="submit"]:focus-visible,\nhtml body.page-contact.site-light-page main .contact-split__form button[type="submit"]:active{\n  color:#4f4e4b!important;\n  background:transparent!important;\n  box-shadow:none!important;\n  filter:none!important;\n  transform:none!important;\n  transition:none!important;\n}''',
'''html body.page-contact.site-light-page main .contact-split__form button[type="submit"]{\n  color:#777777!important;\n  background:transparent!important;\n  box-shadow:none!important;\n  filter:none!important;\n  transform:none!important;\n  transition:none!important;\n}\nhtml body.page-contact.site-light-page main .contact-split__form button[type="submit"]:hover,\nhtml body.page-contact.site-light-page main .contact-split__form button[type="submit"]:focus,\nhtml body.page-contact.site-light-page main .contact-split__form button[type="submit"]:focus-visible,\nhtml body.page-contact.site-light-page main .contact-split__form button[type="submit"]:active{\n  color:#4f4e4b!important;\n  background:transparent!important;\n  box-shadow:none!important;\n  filter:none!important;\n  transform:none!important;\n  transition:none!important;\n}''')

# Dienstleistungen: normal/open Mehr anzeigen grey; hover darker.
dl = 'assets/dienstleistungen.css'
replace_exact(dl,
'''.services-section .service-card .details-action,\n.services-section .service-card:hover .details-action,\n.services-section .service-card[open] .details-action{display:inline-block!important;color:#4f4e4b!important;opacity:1!important;visibility:visible!important;}''',
'''.services-section .service-card .details-action,\n.services-section .service-card[open] .details-action{display:inline-block!important;color:#777777!important;opacity:1!important;visibility:visible!important;}\n.services-section .service-card:hover .details-action{display:inline-block!important;color:#4f4e4b!important;opacity:1!important;visibility:visible!important;}''')

# Verify target values and repaired comments.
for path, needles in {
    base: ['/* Kleine Metadaten und Textaktionen: Typografie wie die Kopfzeilen-Navigation. */',
           '/* Kleine Metadaten und Aktionsbeschriftungen */',
           'line-height:1.4!important;\n  letter-spacing:1.1px!important;'],
    contact: ['line-height: 1.4 !important;', 'letter-spacing:0!important;'],
    unified: ['font-size:11px!important;font-style:normal!important;font-weight:500!important;line-height:1.4!important;letter-spacing:1.1px!important;text-transform:uppercase!important;',
              'letter-spacing:0!important;', 'color:#777777!important;', 'color:#4f4e4b!important;'],
    dl: ['.services-section .service-card[open] .details-action{display:inline-block!important;color:#777777!important;',
         '.services-section .service-card:hover .details-action{display:inline-block!important;color:#4f4e4b!important;'],
}.items():
    text = Path(path).read_text()
    for needle in needles:
        if needle not in text:
            raise SystemExit(f'{path}: verification missing {needle!r}')

# Cache-bust base import and directly linked changed stylesheets.
u = Path(unified)
text = u.read_text()
new = re.sub(r"(@import url\('\./unified-design-base-20260907\.css\?v=)[^']+", r'\1' + CACHE, text, count=1)
if new == text:
    raise SystemExit('Could not update unified-design base import cache token')
u.write_text(new)
changed.add(u)

changed_names = {p.name for p in changed}
html_changed = 0
for page in [p for p in sorted(Path('.').rglob('*.html')) if '.git' not in p.parts]:
    h = page.read_text(errors='ignore')
    nh = h
    for name in changed_names:
        nh = re.sub(r'((?:\.\./)*assets/' + re.escape(name) + r'\?v=)[^"\']+', r'\1' + CACHE, nh)
    if nh != h:
        page.write_text(nh)
        html_changed += 1

# Remove temporary helpers in the same final commit.
for temp in [
    '.github/workflows/safe-button-typography.yml',
    '.github/workflows/exact-button-typography.yml',
    '.github/workflows/revert-bad-button-normalize.yml',
    '.github/workflows/run-button-typography-fix.yml',
    'tools/button_typography_fix.py',
]:
    p = Path(temp)
    if p.exists():
        p.unlink()

print('Changed CSS:', ', '.join(str(p) for p in sorted(changed)))
print('HTML cache tokens updated:', html_changed)
