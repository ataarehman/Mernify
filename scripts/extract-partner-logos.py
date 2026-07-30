"""Crop brand marks from portfolio screenshots for the partners marquee."""
from pathlib import Path
from PIL import Image

base = Path(r'F:\mern.org\mernify\public\portfolio')
out = base / 'logos'
out.mkdir(exist_ok=True)

# Approximate header logo crops from 1440x900 case-study screenshots
crops = {
    'spaceworx.png': ('spaceworx/home-desktop.png', (12, 36, 300, 100)),
    'metro-electric.png': ('metro-electric/home-desktop.png', (55, 52, 250, 125)),
    'mrzzm.png': ('mrzzm/home-desktop.png', (18, 14, 170, 72)),
    'medbill-ultra.png': ('medbill-ultra/home-desktop.png', (28, 22, 300, 100)),
    'goodbooks-plus.png': ('goodbooks-plus/home-desktop.png', (24, 22, 310, 100)),
    'tailorize.png': ('tailorize/home-desktop.png', (30, 22, 260, 105)),
}

for name, (src, box) in crops.items():
    im = Image.open(base / src).convert('RGBA')
    crop = im.crop(box)
    crop.save(out / name)
    print(f'{name}: {crop.size}')

print('done')
