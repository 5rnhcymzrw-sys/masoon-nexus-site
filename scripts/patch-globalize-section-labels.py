from pathlib import Path
p=Path('scripts/globalize-section-labels.py')
s=p.read_text(encoding='utf-8')
old='''def color_blocks(text):
    return [m.group(0) for m in re.finditer(r'[^{}]*\\.section-label[^{}]*\\{[^{}]*\\}', text, re.S) if re.search(r'\\bcolor\\s*:', m.group(0))]
'''
new='''def color_blocks(text):
    hits=[]
    for m in re.finditer(r'([^{}]*)\\{([^{}]*)\\}', text, re.S):
        selector, body = m.group(1), m.group(2)
        selector = re.sub(r':not\\([^)]*\\)', '', selector)
        if '.section-label' in selector and re.search(r'\\bcolor\\s*:', body):
            hits.append(m.group(0))
    return hits
'''
assert old in s
s=s.replace(old,new,1)
p.write_text(s,encoding='utf-8')
