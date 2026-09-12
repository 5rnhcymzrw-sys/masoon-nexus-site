from pathlib import Path

src_path = Path('tools/button_typography_fix.py')
src = src_path.read_text()

old = "replace_exact(unified, 'font-size:11px!important;font-weight:500!important;line-height:1.65!important;letter-spacing:1.1px!important;text-transform:uppercase!important;}',\n                       'font-size:11px!important;font-style:normal!important;font-weight:500!important;line-height:1.4!important;letter-spacing:1.1px!important;text-transform:uppercase!important;}', expected=3)"
new = "replace_exact(unified, 'font-size:11px!important;font-weight:500!important;line-height:1.65!important;letter-spacing:1.1px!important;text-transform:uppercase!important;}',\n                       'font-size:11px!important;font-style:normal!important;font-weight:500!important;line-height:1.4!important;letter-spacing:1.1px!important;text-transform:uppercase!important;}', expected=1)"
if src.count(old) != 1:
    raise SystemExit('Could not adjust expected count in base fix script')
src = src.replace(old, new, 1)

marker = "# Home path/contact symbols.\n"
extra = r'''# More-specific services CTA block.
replace_exact(unified,
''' + "'''" + r'''html body.page-services.site-light-page main.services-main .services-contact-button{
  position:relative!important;z-index:0!important;display:inline-flex!important;align-items:center!important;justify-content:flex-start!important;
  box-sizing:border-box!important;width:auto!important;height:auto!important;margin:2px 0 0 20px!important;padding:0!important;
  border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;
  color:#777777!important;text-decoration:none!important;font-family:var(--font-inter),Arial,sans-serif!important;
  font-size:11px!important;font-weight:500!important;line-height:1.65!important;letter-spacing:1.1px!important;text-transform:uppercase!important
}''' + "'''" + r''',
''' + "'''" + r'''html body.page-services.site-light-page main.services-main .services-contact-button{
  position:relative!important;z-index:0!important;display:inline-flex!important;align-items:center!important;justify-content:flex-start!important;
  box-sizing:border-box!important;width:auto!important;height:auto!important;margin:2px 0 0 20px!important;padding:0!important;
  border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;
  color:#777777!important;text-decoration:none!important;font-family:var(--font-inter),Arial,sans-serif!important;
  font-size:11px!important;font-style:normal!important;font-weight:500!important;line-height:1.4!important;letter-spacing:1.1px!important;text-transform:uppercase!important
}''' + "'''" + r''')

# More-specific contact submit block.
replace_exact(unified,
''' + "'''" + r'''html body.page-contact.site-light-page main .contact-split__form button[type="submit"]{
  position:relative!important;z-index:0!important;display:inline-flex!important;align-items:center!important;justify-content:flex-start!important;
  box-sizing:border-box!important;width:auto!important;height:auto!important;margin:16px 0 0 20px!important;padding:0!important;
  border:0!important;border-radius:0!important;background-color:transparent!important;
  text-decoration:none!important;
  font-family:var(--font-inter),Arial,sans-serif!important;font-size:11px!important;font-weight:500!important;
  line-height:1.65!important;letter-spacing:1.1px!important;text-transform:uppercase!important;}''' + "'''" + r''',
''' + "'''" + r'''html body.page-contact.site-light-page main .contact-split__form button[type="submit"]{
  position:relative!important;z-index:0!important;display:inline-flex!important;align-items:center!important;justify-content:flex-start!important;
  box-sizing:border-box!important;width:auto!important;height:auto!important;margin:16px 0 0 20px!important;padding:0!important;
  border:0!important;border-radius:0!important;background-color:transparent!important;
  text-decoration:none!important;
  font-family:var(--font-inter),Arial,sans-serif!important;font-size:11px!important;font-style:normal!important;font-weight:500!important;
  line-height:1.4!important;letter-spacing:1.1px!important;text-transform:uppercase!important;}''' + "'''" + r''')

'''
if src.count(marker) != 1:
    raise SystemExit('Could not find insertion marker in base fix script')
src = src.replace(marker, extra + marker, 1)

# Ensure the original cleanup also removes this v2 helper.
old_temp = "    'tools/button_typography_fix.py',\n]:"
new_temp = "    'tools/button_typography_fix.py',\n    'tools/button_typography_fix_v2.py',\n]:"
if src.count(old_temp) != 1:
    raise SystemExit('Could not extend helper cleanup list')
src = src.replace(old_temp, new_temp, 1)

exec(compile(src, 'button_typography_fix_runtime.py', 'exec'))
