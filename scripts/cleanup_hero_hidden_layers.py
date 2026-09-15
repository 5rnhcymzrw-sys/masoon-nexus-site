from pathlib import Path
p=Path('assets/unified-design.css')
s=p.read_text(encoding='utf-8')
s=s.replace('width:calc(100% - 36px)!important;','width:calc(100% - var(--page-gutter-mobile))!important;',1)
s=s.replace('calc(max(32px,(100vw - 1227px)/2) + min(26vw - 16.64px,319.02px))','calc(max(32px,(100vw - var(--content-width))/2) + min(26vw - 16.64px,319.02px))')
s=s.replace('calc(min(640px,calc(100vw - 64px)) + 29.6px)','calc(min(640px,calc(100vw - var(--page-gutter))) + 29.6px)')
# Remove the obsolete gradient-panel implementation. The element is globally hidden later.
start=s.index('html body.page-home.site-light-page main.home section.home-hero .home-hero__gradient-panel{display:none}')
end=s.index('html body.page-home.site-light-page main.home section.home-hero .home-hero__copy{\n  position:relative;', start)
s=s[:start]+s[end:]
# Remove obsolete text-surface implementation. It is globally hidden later.
start=s.index('html body.page-home.site-light-page main.home section.home-hero .home-hero__text-surface{')
end=s.index('html body.page-home.site-light-page main.home section.home-hero .home-hero__copy::before{\n  background:#fff!important;', start)
s=s[:start]+s[end:]
# Remove the later desktop block that only controlled the now-hidden gradient-panel/text-surface.
needle='''@media(min-width:801px){
  html body.page-home.site-light-page main.home section.home-hero{
    --hero-background-edge:calc(max(32px,(100vw - var(--content-width))/2) + min(26vw - 16.64px,319.02px));
  }
  html body.page-home.site-light-page main.home section.home-hero .home-hero__gradient-panel{
    clip-path:inset(0 calc(100% - var(--hero-background-edge)) 0 0);
  }
  html body.page-home.site-light-page main.home section.home-hero .home-hero__text-surface{
    width:var(--hero-background-edge);
  }
  html body.page-home.site-light-page main.home section.home-hero .home-hero__text-surface::after{
    content:"";position:absolute;inset:12% 0;
    background:rgba(255,255,255,.16);pointer-events:none;
  }
}

'''
assert needle in s
s=s.replace(needle,'',1)
# Keep the final visibility rule as the single source of truth for the unused DOM layers.
assert 'home-hero__gradient-panel,\nhtml body.page-home.site-light-page main.home section.home-hero .home-hero__text-surface{\n  visibility:hidden!important;' in s
p.write_text(s,encoding='utf-8')
