from pathlib import Path
u=Path('assets/unified-design.css')
d=Path('assets/dienstleistungen.css')
s=u.read_text(encoding='utf-8')
start=s.index('/* dienstleistungen/index.html */')
end=s.index('/* disclaimer/index.html */', start)
block=s[start:end]
block=block.replace('width:min(100% - 36px,1227px)!important','width:min(100% - var(--page-gutter-mobile),var(--content-width))!important')
block=block.replace('padding:126px 72px!important','padding:var(--section-y) 72px!important')
s=s[:start]+s[end:]
open_block='''/* Dienstleistungen: alle geöffneten Kästen mit einheitlicher, angepasster Höhe. */
@media(min-width:801px){
  html body.page-services.site-light-page .services-main .services-section .services-grid>.service-card[open]{
    height:621px!important;
    min-height:621px!important;
    max-height:621px!important;
    overflow:hidden!important;
  }
}

'''
assert open_block in s
s=s.replace(open_block,'',1)
old_selector='''html body.page-home.site-light-page main.home > section.home-contact-band.home-contact-band,
html body.page-knowledge.site-light-page main.page-main .knowledge-section#knowledge-articles > .knowledge-note,
html body.page-services.site-light-page main.services-main > .services-closing,
html body.page-company.site-light-page main.page-main > .company-collaboration-box {'''
new_selector='''html body.page-home.site-light-page main.home > section.home-contact-band.home-contact-band,
html body.page-knowledge.site-light-page main.page-main .knowledge-section#knowledge-articles > .knowledge-note,
html body.page-company.site-light-page main.page-main > .company-collaboration-box {'''
assert old_selector in s
s=s.replace(old_selector,new_selector,1)
assert 'page-services' not in s
u.write_text(s,encoding='utf-8')
service_final='''\n/* Dienstleistungen: finale Seitenwerte */
@media(min-width:801px){
  html body.page-services.site-light-page .services-main .services-section .services-grid>.service-card[open]{
    height:621px!important;
    min-height:621px!important;
    max-height:621px!important;
    overflow:hidden!important;
  }
}
html body.page-services.site-light-page main.services-main > .services-closing{
  border:var(--mt-gradient-frame-width) solid transparent!important;
  border-image:var(--mt-gradient-frame) 1!important;
}
'''
ds=d.read_text(encoding='utf-8').rstrip()+"\n\n"+block.strip()+"\n"+service_final
d.write_text(ds,encoding='utf-8')
