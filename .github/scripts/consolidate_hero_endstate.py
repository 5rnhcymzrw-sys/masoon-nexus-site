from pathlib import Path
p=Path('assets/unified-design.css')
s=p.read_text(encoding='utf-8')

s=s.replace('min-height:calc(100svh - var(--header-height))!important;','min-height:calc(100svh - (var(--header-height) + var(--accent-bar-height)))!important;',1)
s=s.replace('height:min(32.625vw,calc((100svh - var(--header-height))*.68),600px);','height:clamp(420px,32.625vw,600px);',1)
s=s.replace('z-index:2;\n}\nhtml body.page-home.site-light-page main.home section.home-hero .home-hero__copy{','z-index:3;\n}\nhtml body.page-home.site-light-page main.home section.home-hero .home-hero__copy{',1)

old='''html body.page-home.site-light-page main.home section.home-hero .home-hero__copy::before{\n  content:"";\n  display:block;\n  position:absolute;\n  inset:16px -28px 16px -220px;\n  z-index:2;\n  background:rgba(255,255,255,.16);\n  border-radius:0;\n  pointer-events:none;\n}\nhtml body.page-home.site-light-page main.home section.home-hero .home-hero__copy::before{\n  background:#fff!important;\n  box-shadow:none!important;\n}\n@media(min-width:801px){\n  html body.page-home.site-light-page main.home section.home-hero .home-hero__copy::before{\n    left:-81.6px;\n    right:auto;\n    width:calc(min(640px,calc(100vw - var(--page-gutter))) + 29.6px);\n  }\n}\n'''
new='''html body.page-home.site-light-page main.home section.home-hero .home-hero__copy::before{\n  content:"";\n  display:block;\n  position:absolute;\n  top:-20px;\n  right:-28px;\n  bottom:-20px;\n  left:-220px;\n  z-index:2;\n  box-sizing:border-box;\n  background:#fff!important;\n  border:var(--mt-gradient-frame-width) solid transparent;\n  border-image:var(--mt-gradient-frame) 1;\n  border-radius:0;\n  box-shadow:none!important;\n  pointer-events:none;\n}\n@media(min-width:801px){\n  html body.page-home.site-light-page main.home section.home-hero .home-hero__copy::before{\n    top:-4px;\n    right:auto;\n    bottom:-4px;\n    left:-81.6px;\n    width:calc(min(640px,calc(100vw - var(--page-gutter))) + 29.6px);\n  }\n}\n'''
assert old in s
s=s.replace(old,new,1)

old2='''@media(min-width:801px){\n  html body.page-home.site-light-page main.home{padding-top:116px!important;}\n  html body.page-home.site-light-page main.home section.home-hero{\n    min-height:calc(100svh - 116px)!important;\n  }\n}\n'''
new2='''@media(min-width:801px){\n  html body.page-home.site-light-page main.home{\n    padding-top:calc(var(--header-height) + var(--accent-bar-height))!important;\n  }\n}\n'''
assert old2 in s
s=s.replace(old2,new2,1)

old3='''html body.page-home.site-light-page main.home section.home-hero .home-hero__gradient-panel,\nhtml body.page-home.site-light-page main.home section.home-hero .home-hero__text-surface{\n  visibility:hidden!important;\n}\nhtml body.page-home.site-light-page main.home section.home-hero .home-hero__copy::before{\n  top:-4px;\n  bottom:-4px;\n  box-sizing:border-box;\n  border:var(--mt-gradient-frame-width) solid transparent;\n  border-image:var(--mt-gradient-frame) 1;\n}\n@media(max-width:800px){\n  html body.page-home.site-light-page main.home section.home-hero .home-hero__copy::before{\n    top:-20px;\n    bottom:-20px;\n  }\n}\n\n\nhtml body.page-home.site-light-page main.home section.home-hero .home-hero__portrait,\nhtml body.page-home.site-light-page main.home section.home-hero .home-hero__portrait-image{\n  opacity:1!important;visibility:visible!important;animation:none!important;transition:none!important;\n}\n@media(min-width:801px){\n  html body.page-home.site-light-page main.home section.home-hero .home-hero__portrait{\n    height:clamp(420px,32.625vw,600px)!important;\n  }\n}\n'''
new3='''html body.page-home.site-light-page main.home section.home-hero .home-hero__portrait,\nhtml body.page-home.site-light-page main.home section.home-hero .home-hero__portrait-image{\n  opacity:1!important;visibility:visible!important;animation:none!important;transition:none!important;\n}\n'''
assert old3 in s
s=s.replace(old3,new3,1)

old4='''html body.page-home.site-light-page main.home section.home-hero .home-hero__content{\n  z-index:3;\n}\n'''
assert old4 in s
s=s.replace(old4,'',1)

assert 'padding-top:116px' not in s
assert '100svh - 116px' not in s
p.write_text(s,encoding='utf-8')
