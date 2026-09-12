from pathlib import Path

v2 = Path('tools/button_typography_fix_v2.py').read_text()
old = 'marker = "# Home path/contact symbols.\\n"'
new = 'marker = "# Services closing button and symbols.\\n"'
if v2.count(old) != 1:
    raise SystemExit('Could not adjust insertion marker')
v2 = v2.replace(old, new, 1)
exec(compile(v2, 'button_typography_fix_v3_runtime.py', 'exec'))
Path('tools/button_typography_fix_v3.py').unlink(missing_ok=True)
