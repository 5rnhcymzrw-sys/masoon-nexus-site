from pathlib import Path
p=Path('assets/unified-design.css')
s=p.read_text(encoding='utf-8')

start=s.index('/* datenschutz/index.html */')
end=s.index('/* unternehmen/index.html */', start)
legal='''/* Rechteseiten: gemeinsame Kartenkomponente */
html body:is(.page-privacy,.page-disclaimer,.page-imprint) .disclaimer-card{
  width:100%!important;
  height:auto!important;
  max-height:none!important;
  padding:67.5px 72px 53.5px!important;
  display:grid!important;
  grid-template-columns:.7fr 1.3fr!important;
  gap:80px!important;
  align-items:baseline!important;
  box-sizing:border-box!important;
  background:transparent!important;
  background-color:transparent!important;
  background-image:none!important;
  border:var(--mt-gradient-frame-width) solid transparent!important;
  border-image:var(--mt-gradient-frame) 1!important;
  border-radius:0!important;
  box-shadow:none!important;
}
html body.page-privacy .disclaimer-card{min-height:463.25px!important;}
html body.page-disclaimer .disclaimer-card{min-height:0!important;}
html body.page-imprint .disclaimer-card{min-height:821px!important;}
html body:is(.page-privacy,.page-disclaimer,.page-imprint) .disclaimer-card h1{
  margin:0!important;
  align-self:baseline!important;
}
html body:is(.page-privacy,.page-disclaimer,.page-imprint) .disclaimer-card .prose{
  margin:0!important;
  align-self:baseline!important;
  position:relative;
  top:-14px;
  transform:none!important;
}
html body:is(.page-privacy,.page-disclaimer,.page-imprint) .disclaimer-card .prose p{margin-bottom:12px!important;}
html body:is(.page-privacy,.page-imprint) .disclaimer-card .prose h2{
  display:block!important;
  color:#171715!important;
  margin-bottom:7px!important;
}
html body:is(.page-privacy,.page-imprint) .disclaimer-card .prose h2:first-child{margin-top:0!important;}
@media(min-width:801px){
  html body.page-disclaimer .page-main .legal-page{
    min-height:calc(100svh - 188px)!important;
    box-sizing:border-box!important;
  }
}
@media(max-width:800px){
  html body:is(.page-privacy,.page-disclaimer,.page-imprint) .disclaimer-card{
    min-height:0!important;
    padding:62px 26px!important;
    grid-template-columns:1fr!important;
    gap:34px!important;
  }
}

'''
s=s[:start]+legal+s[end:]
old='''html body.page-home.site-light-page:has(main.home) main.home>section.home-contact-band.home-contact-band{\n  background:linear-gradient(to right in oklab,rgba(243,232,212,.06) 0%,rgba(232,229,223,.06) 36%,rgba(199,203,211,.06) 68%,rgba(141,150,168,.06) 100%)!important;\n  -webkit-backdrop-filter:blur(32px)!important;\n  backdrop-filter:blur(32px)!important;\n}\n'''
if old in s:
    s=s.replace(old,'',1)
for old_sel,new_sel in [
    ('.home-values.home-values','.home-values'),
    ('.home-paths.home-paths','.home-paths'),
    ('.home-contact-band.home-contact-band','.home-contact-band'),
    ('.section-label.section-label','.section-label'),
]:
    s=s.replace(old_sel,new_sel)
s=s.replace('''border-image: linear-gradient(\n    110deg,\n    #f3e8d4 0%,\n    #e8e5df 38%,\n    #c7cbd3 66%,\n    #8d96a8 100%\n  ) 1 !important;''','''border-image:var(--mt-gradient-frame) 1!important;''')
s=s.replace('padding:62px 26px 126px!important;','padding:62px 26px var(--section-y)!important;')
assert '.home-values.home-values' not in s
assert '.home-paths.home-paths' not in s
assert '.home-contact-band.home-contact-band' not in s
assert '.section-label.section-label' not in s
p.write_text(s,encoding='utf-8')
