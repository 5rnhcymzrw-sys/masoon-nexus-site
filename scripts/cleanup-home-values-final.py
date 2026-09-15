from pathlib import Path
p=Path('assets/unified-design.css')
s=p.read_text(encoding='utf-8')
old='''html body.page-home.site-light-page:has(main.home) main.home>section.home-values .home-values__items>.home-values__item.home-values__item.home-values__item{\n  background:linear-gradient(to right in oklab,rgba(243,232,212,.06) 0%,rgba(232,229,223,.06) 36%,rgba(199,203,211,.06) 68%,rgba(141,150,168,.06) 100%)!important;\n  background-origin:border-box!important;\n  background-size:calc(300% + 44px) 100%!important;\n  background-position:left top!important;\n  background-repeat:no-repeat!important;\n  -webkit-backdrop-filter:blur(32px)!important;\n  backdrop-filter:blur(32px)!important;\n}\nhtml body.page-home.site-light-page:has(main.home) main.home>section.home-values .home-values__items>.home-values__item.home-values__item.home-values__item:nth-child(3n+2){\n  background-position:center top!important;\n}\nhtml body.page-home.site-light-page:has(main.home) main.home>section.home-values .home-values__items>.home-values__item.home-values__item.home-values__item:nth-child(3n){\n  background-position:right top!important;\n}\n'''
assert old in s
s=s.replace(old,'',1)
old_mobile='''@media(max-width:800px){\n  html body.page-home.site-light-page:has(main.home) main.home>section.home-values .home-values__items>.home-values__item.home-values__item.home-values__item{background-size:100% 100%!important;}\n}\n'''
assert old_mobile in s
s=s.replace(old_mobile,'',1)
s=s.replace('.home-values__item.home-values__item.home-values__item.home-values__item','.home-values__item')
assert '.home-values__item.home-values__item' not in s
p.write_text(s,encoding='utf-8')
