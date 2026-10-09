import os
import io
import base64
from PIL import Image

def clean_and_export():
    timeless_og_src = '/home/admin/.gemini/antigravity-ide/brain/786acf3b-77e9-40d1-99b1-f753a5954b6a/timeless_og_card_1791490208162.jpg'
    favicon_src = '/home/admin/.gemini/antigravity-ide/brain/786acf3b-77e9-40d1-99b1-f753a5954b6a/site_favicon_mark_1791489946564.jpg'

    public_root = 'public'
    public_img_dir = os.path.join(public_root, 'assets', 'images')
    mocks_root = 'specs/001-personal-brand-website/mocks'
    mocks_img_dir = os.path.join(mocks_root, 'assets', 'images')

    for d in [public_root, public_img_dir, mocks_root, mocks_img_dir]:
        os.makedirs(d, exist_ok=True)

    # 1. Export Open Graph Card (1200x630 PNG)
    print("Exporting Open Graph Card...")
    og_img = Image.open(timeless_og_src).convert('RGB')
    orig_w, orig_h = og_img.size
    target_w, target_h = 1200, 630
    target_aspect = target_w / target_h
    orig_aspect = orig_w / orig_h

    if orig_aspect > target_aspect:
        new_w = int(orig_h * target_aspect)
        offset_x = (orig_w - new_w) // 2
        crop_box = (offset_x, 0, offset_x + new_w, orig_h)
    else:
        new_h = int(orig_w / target_aspect)
        offset_y = (orig_h - new_h) // 2
        crop_box = (0, offset_y, orig_w, offset_y + new_h)

    og_1200 = og_img.crop(crop_box).resize((target_w, target_h), Image.Resampling.LANCZOS)
    for out_dir in [public_img_dir, mocks_img_dir]:
        og_png_path = os.path.join(out_dir, 'og-card.png')
        og_1200.save(og_png_path, 'PNG', optimize=True)
        print(f"Saved: {og_png_path}")

    # 2. Export Favicon Suite
    print("Exporting Favicon Suite...")
    fav_img = Image.open(favicon_src).convert('RGB')

    # Standard resolutions
    fav_16 = fav_img.resize((16, 16), Image.Resampling.LANCZOS)
    fav_32 = fav_img.resize((32, 32), Image.Resampling.LANCZOS)
    fav_48 = fav_img.resize((48, 48), Image.Resampling.LANCZOS)
    fav_64 = fav_img.resize((64, 64), Image.Resampling.LANCZOS)
    fav_180 = fav_img.resize((180, 180), Image.Resampling.LANCZOS)
    fav_512 = fav_img.resize((512, 512), Image.Resampling.LANCZOS)

    # Save PNG favicons at root of public and mocks
    for root_dir in [public_root, mocks_root]:
        fav_16.save(os.path.join(root_dir, 'favicon-16x16.png'), 'PNG', optimize=True)
        fav_32.save(os.path.join(root_dir, 'favicon-32x32.png'), 'PNG', optimize=True)
        fav_64.save(os.path.join(root_dir, 'favicon.png'), 'PNG', optimize=True)
        fav_180.save(os.path.join(root_dir, 'apple-touch-icon.png'), 'PNG', optimize=True)
        # Multi-size ICO
        fav_48.save(os.path.join(root_dir, 'favicon.ico'), format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])

    # 3. Generate high-fidelity vector-compatible SVG Favicon with exact approved KL mark
    # We embed the 512x512 lossless PNG into SVG so it is 100% pixel-perfect identical to the approved image
    buf = io.BytesIO()
    fav_512.save(buf, format='PNG', optimize=True)
    b64_png = base64.b64encode(buf.getvalue()).decode('ascii')

    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <clipPath id="tileRadius">
      <rect x="0" y="0" width="512" height="512" rx="48" ry="48"/>
    </clipPath>
  </defs>
  <!-- Approved Kirill Lebedev KL Monogram Icon -->
  <g clip-path="url(#tileRadius)">
    <image width="512" height="512" href="data:image/png;base64,{b64_png}"/>
  </g>
</svg>
'''
    for root_dir in [public_root, mocks_root]:
        svg_path = os.path.join(root_dir, 'favicon.svg')
        with open(svg_path, 'w', encoding='utf-8') as f:
            f.write(svg_content)
        print(f"Saved: {svg_path} (exact match with image)")

    # 4. Clean up unused / obsolete assets in images directories
    unneeded_files = [
        'portrait-forbes.webp',
        'portrait-scholar.webp',
        'portrait.jpg',
        'portrait-light.jpg',
        'avatar.png',
        'avatar-light.png',
        'og-card.jpg',
        'og-card.webp',
        'favicon-16x16.png',
        'favicon-32x32.png',
        'favicon-48x48.png',
        'favicon-512x512.png',
        'favicon.ico',
        'favicon.png',
        'favicon.svg',
        'apple-touch-icon.png',
    ]

    for img_dir in [public_img_dir, mocks_img_dir]:
        print(f"\nCleaning unneeded files from {img_dir}:")
        for fname in unneeded_files:
            fpath = os.path.join(img_dir, fname)
            if os.path.exists(fpath):
                os.remove(fpath)
                print(f"  Removed obsolete file: {fpath}")

    # Remove temporary scripts if needed
    old_script = 'scripts/export_social_assets.py'
    if os.path.exists(old_script):
        os.remove(old_script)

    print("\nCleanup and asset synchronization completed successfully!")

if __name__ == '__main__':
    clean_and_export()
