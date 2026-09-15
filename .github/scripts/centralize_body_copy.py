from pathlib import Path
import re

FILES = [
    Path('assets/global.css'),
    Path('assets/unified-design.css'),
    Path('assets/unified-design-base-20260907.css'),
    Path('assets/article-detail.css'),
    Path('assets/contact.css'),
    Path('assets/dienstleistungen.css'),
    Path('assets/index-CZfMKxM_.css'),
]

TYPO_PROPS = {
    'font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing', 'color',
    'font-style', 'font-synthesis', 'font-variation-settings', 'font-optical-sizing',
    'font-kerning', 'font-variant-ligatures', 'font-feature-settings', 'text-rendering',
    '-webkit-font-smoothing', '-moz-osx-font-smoothing', '-webkit-text-stroke',
}

EXCLUDED_TOKENS = (
    '.section-label', '.article-meta', '.article-card-date', '.form-status',
    '.contact-split__form-label', '.details-action', '.home-action-button',
    '.home-values__all-services', '.services-contact-button', '.home-paths__action',
    '.site-nav', '.site-footer', '.card-number', '.service-number',
    'button', 'input', 'textarea', 'label', ' h1', ' h2', ' h3', ' h4', ' h5', ' h6',
)

KNOWN_BODY_CLASSES = (
    '.mt-body-copy', '.home-hero__services', '.contact-split__intro',
)

PROP_PATTERN = re.compile(
    r'(?im)(?P<prefix>(?:^|[;\n\r])\s*)(?P<prop>-?[a-zA-Z][\w-]*)\s*:\s*(?P<value>[^;{}]*)(?P<semi>;?)'
)
LEAF_PATTERN = re.compile(r'([^{}]+)\{([^{}]*)\}', re.S)


def clean_selector_text(selector: str) -> str:
    return re.sub(r'/\*.*?\*/', '', selector, flags=re.S).strip()


def is_body_part(part: str) -> bool:
    s = clean_selector_text(part)
    if not s:
        return False
    if any(token in s for token in EXCLUDED_TOKENS):
        return False
    if re.search(r'(^|[\s>+~])p(?=[\s>+~.#:\[]|$)', s):
        return True
    if re.search(r'(^|[\s>+~])li(?=[\s>+~.#:\[]|$)', s):
        return True
    if any(cls in s for cls in KNOWN_BODY_CLASSES):
        return True
    if re.search(r'(^|[\s>+~])\.prose(?=[\s>+~.#:\[]|$)', s):
        return True
    return False


def strip_typography_from_body_rules(text: str):
    removed = 0

    def repl(match):
        nonlocal removed
        selector = match.group(1)
        body = match.group(2)
        selector_clean = clean_selector_text(selector)
        if selector_clean.startswith('@'):
            return match.group(0)
        parts = [part.strip() for part in selector_clean.split(',') if part.strip()]
        if not parts or not all(is_body_part(part) for part in parts):
            return match.group(0)

        def decl_repl(dm):
            nonlocal removed
            prop = dm.group('prop').lower()
            if prop in TYPO_PROPS:
                removed += 1
                return ''
            return dm.group(0)

        new_body = PROP_PATTERN.sub(decl_repl, body)
        new_body = re.sub(r';\s*;', ';', new_body)
        new_body = re.sub(r'^\s*;\s*', '', new_body)
        new_body = re.sub(r'\s+;', ';', new_body)
        if not re.sub(r'[;\s]', '', new_body):
            return ''
        return selector + '{' + new_body + '}'

    previous = None
    while previous != text:
        previous = text
        text = LEAF_PATTERN.sub(repl, text)
    return text, removed


def update_global(text: str) -> str:
    text = text.replace('--body-size:15px;', '--body-size:14px;')
    text = re.sub(
        r'\n?/\* Einheitlicher Fliesstext auf allen Seiten \*/.*?\n\}',
        '',
        text,
        count=1,
        flags=re.S,
    )
    canonical = '''

/* Einheitlicher Fliesstext auf allen Seiten */
html body.site-light-page main p:not(.section-label):not(.article-meta):not(.article-card-date):not(.form-status),
html body.site-light-page main li,
html body.site-light-page main .home-hero__services,
html body.site-light-page main .contact-split__intro{
  font-family:var(--font-inter),Arial,sans-serif!important;
  font-size:14px!important;
  font-weight:300!important;
  line-height:1.65!important;
  letter-spacing:0!important;
  color:#484a4f!important;
}
'''
    return text.rstrip() + canonical


def main():
    total_removed = 0
    for path in FILES:
        if not path.exists():
            continue
        text = path.read_text(encoding='utf-8')
        text, removed = strip_typography_from_body_rules(text)
        total_removed += removed
        if path.name == 'global.css':
            text = update_global(text)
        path.write_text(text, encoding='utf-8')
        print(f'{path}: removed {removed} old body-copy typography declarations')

    print(f'total removed declarations: {total_removed}')
    if total_removed == 0:
        raise SystemExit('No old body-copy typography declarations found; aborting.')


if __name__ == '__main__':
    main()
