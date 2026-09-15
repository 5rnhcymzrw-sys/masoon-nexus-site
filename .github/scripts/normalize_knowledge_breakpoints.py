from pathlib import Path
p=Path('assets/unified-design.css')
s=p.read_text(encoding='utf-8')
old="""@media(min-width:561px) and (max-width:1050px){
  html body.page-knowledge.site-light-page main .knowledge-section#knowledge-articles .articles-grid>.article-card{
    background-size:calc(200% + 16px) 100%!important;
    background-position:left top!important;
  }
  html body.page-knowledge.site-light-page main .knowledge-section#knowledge-articles .articles-grid>.article-card:nth-child(2n){
    background-position:right top!important;
  }
}
@media(min-width:801px) and (max-width:1050px){
  html body.page-knowledge.site-light-page main .knowledge-section#knowledge-articles .articles-grid>.article-card{
    background-size:calc(200% + 22px) 100%!important;
  }
}"""
new="""@media(min-width:561px) and (max-width:800px){
  html body.page-knowledge.site-light-page main .knowledge-section#knowledge-articles .articles-grid>.article-card{
    background-size:calc(200% + 16px) 100%!important;
    background-position:left top!important;
  }
  html body.page-knowledge.site-light-page main .knowledge-section#knowledge-articles .articles-grid>.article-card:nth-child(2n){
    background-position:right top!important;
  }
}
@media(min-width:801px) and (max-width:1050px){
  html body.page-knowledge.site-light-page main .knowledge-section#knowledge-articles .articles-grid>.article-card{
    background-size:calc(200% + 22px) 100%!important;
    background-position:left top!important;
  }
  html body.page-knowledge.site-light-page main .knowledge-section#knowledge-articles .articles-grid>.article-card:nth-child(2n){
    background-position:right top!important;
  }
}"""
assert old in s
p.write_text(s.replace(old,new,1),encoding='utf-8')
