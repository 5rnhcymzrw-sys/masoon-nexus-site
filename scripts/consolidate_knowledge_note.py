from pathlib import Path
p=Path('assets/unified-design.css')
s=p.read_text(encoding='utf-8')
start=s.index('/* Fachwissen Hauptseite: Titelabstand im Einordnungskasten wie bei Unternehmen */')
end=s.index('/* Rechteseiten und bestehende Spezialtexte bleiben unverändert */', start)
new='''/* Fachwissen Hauptseite: Einordnungskasten */
html body.site-light-page .knowledge-section>.knowledge-note{
  box-sizing:border-box!important;
  width:min(calc(100vw - var(--page-gutter)),var(--content-width))!important;
  height:463px!important;
  min-height:463px!important;
  max-height:463px!important;
  margin-left:auto!important;
  margin-right:auto!important;
  padding:var(--section-y) 72px!important;
  grid-template-columns:.7fr 1.3fr!important;
  gap:80px!important;
}
html body.site-light-page .knowledge-section>.knowledge-note>div>h2{
  color:#171715!important;
  margin-bottom:0!important;
  padding-bottom:0!important;
}
html body.site-light-page .knowledge-section>.knowledge-note>div>h2+p,
html body.site-light-page .knowledge-section>.knowledge-note>div>p:not(.section-label){
  margin:30px 0 0!important;
  padding-top:0!important;
}
@media(max-width:800px){
  html body.site-light-page .knowledge-section>.knowledge-note{
    width:min(calc(100vw - var(--page-gutter-mobile)),var(--content-width))!important;
    padding:62px 26px!important;
    grid-template-columns:1fr!important;
    gap:52px!important;
  }
}

'''
p.write_text(s[:start]+new+s[end:],encoding='utf-8')
