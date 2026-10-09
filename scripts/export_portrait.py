import os
from PIL import Image

def process_and_export():
    output_dirs = [
        'public/assets/images',
        'specs/001-personal-brand-website/mocks/assets/images'
    ]
    for d in output_dirs:
        os.makedirs(d, exist_ok=True)

    dark_portrait_src = '/home/admin/.gemini/antigravity-ide/brain/6c83ce29-4c8b-4e33-a77a-c0c3b1222aef/executive_dark_portrait_1791419109217.jpg'
    light_portrait_src = '/home/admin/.gemini/antigravity-ide/brain/6c83ce29-4c8b-4e33-a77a-c0c3b1222aef/executive_light_portrait_1791419140954.jpg'
    dark_avatar_src = '/home/admin/.gemini/antigravity-ide/brain/6c83ce29-4c8b-4e33-a77a-c0c3b1222aef/executive_avatar_dark_1791419170434.jpg'
    light_avatar_src = '/home/admin/.gemini/antigravity-ide/brain/6c83ce29-4c8b-4e33-a77a-c0c3b1222aef/executive_avatar_light_1791419199574.jpg'

    for out_dir in output_dirs:
        # 1. Dark Mode Hero Portrait (3:4)
        if os.path.exists(dark_portrait_src):
            p_dark = Image.open(dark_portrait_src)
            p_dark.save(os.path.join(out_dir, 'portrait-dark.webp'), 'WEBP', quality=95, method=6)
            p_dark.save(os.path.join(out_dir, 'portrait.webp'), 'WEBP', quality=95, method=6)
            p_dark.save(os.path.join(out_dir, 'portrait.jpg'), 'JPEG', quality=95)

        # 2. Light Mode Hero Portrait (3:4)
        if os.path.exists(light_portrait_src):
            p_light = Image.open(light_portrait_src)
            p_light.save(os.path.join(out_dir, 'portrait-light.webp'), 'WEBP', quality=95, method=6)
            p_light.save(os.path.join(out_dir, 'portrait-light.jpg'), 'JPEG', quality=95)

        # 3. Dark Mode Avatar (1:1)
        if os.path.exists(dark_avatar_src):
            a_dark = Image.open(dark_avatar_src)
            a_dark_512 = a_dark.resize((512, 512), Image.Resampling.LANCZOS)
            a_dark_512.save(os.path.join(out_dir, 'avatar-dark.webp'), 'WEBP', quality=95, method=6)
            a_dark_512.save(os.path.join(out_dir, 'avatar.webp'), 'WEBP', quality=95, method=6)
            a_dark_512.save(os.path.join(out_dir, 'avatar.png'), 'PNG', optimize=True)
            a_dark.resize((128, 128), Image.Resampling.LANCZOS).save(os.path.join(out_dir, 'avatar-sm.webp'), 'WEBP', quality=90)

        # 4. Light Mode Avatar (1:1)
        if os.path.exists(light_avatar_src):
            a_light = Image.open(light_avatar_src)
            a_light_512 = a_light.resize((512, 512), Image.Resampling.LANCZOS)
            a_light_512.save(os.path.join(out_dir, 'avatar-light.webp'), 'WEBP', quality=95, method=6)
            a_light_512.save(os.path.join(out_dir, 'avatar-light.png'), 'PNG', optimize=True)
            a_light.resize((128, 128), Image.Resampling.LANCZOS).save(os.path.join(out_dir, 'avatar-light-sm.webp'), 'WEBP', quality=90)

        # Clean any unneeded files
        ref_file = os.path.join(out_dir, 'portrait-reference.webp')
        if os.path.exists(ref_file):
            os.remove(ref_file)

    print('Successfully exported all new AI portraits and avatars across public and mocks directories.')

if __name__ == '__main__':
    process_and_export()
