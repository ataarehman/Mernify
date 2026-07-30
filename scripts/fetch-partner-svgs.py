import re
import urllib.request
from pathlib import Path

out = Path(r'F:\mern.org\mernify\public\portfolio\logos')
UA = {'User-Agent': 'Mozilla/5.0'}


def save_svg(url, pattern, filename):
    req = urllib.request.Request(url, headers=UA)
    html = urllib.request.urlopen(req, timeout=40).read().decode('utf-8', errors='ignore')
    match = re.search(pattern, html, re.S | re.I)
    if not match:
        print(filename, 'NOT FOUND')
        return False
    svg = re.sub(r'<script.*?</script>', '', match.group(0), flags=re.S | re.I)
    (out / filename).write_text(svg, encoding='utf-8')
    print(filename, 'bytes', len(svg))
    return True


save_svg(
    'https://goodbooksplus.com/',
    r'<svg[^>]*viewBox="0 0 1996\.37 390\.2".*?</svg>',
    'goodbooks-plus.svg',
)
save_svg(
    'https://medbillultra.com/',
    r'<svg[^>]*viewBox="0 0 761\.7 334\.3".*?</svg>',
    'medbill-ultra.svg',
)
