import numpy as np
from PIL import Image
from scipy.ndimage import map_coordinates

def refine_portrait(img_path, out_path, is_light=False):
    img = Image.open(img_path).convert('RGB')
    arr = np.array(img, dtype=np.float32)
    h, w, c = arr.shape
    
    y_coords, x_coords = np.mgrid[0:h, 0:w].astype(np.float32)

    # 1. Warm, natural smile:
    # Mouth center ~ y=570, x=448
    # Left corner ~ y=565, x=390; Right corner ~ y=565, x=506
    r_left = np.sqrt((x_coords - 390.0)**2 + (y_coords - 565.0)**2)
    weight_left = np.exp(-(r_left / 38.0)**2)
    
    r_right = np.sqrt((x_coords - 506.0)**2 + (y_coords - 565.0)**2)
    weight_right = np.exp(-(r_right / 38.0)**2)

    r_lip_bot = np.sqrt((x_coords - 448.0)**2 + (y_coords - 590.0)**2)
    weight_lip_bot = np.exp(-(r_lip_bot / 40.0)**2)

    # Friendly eye warmth (crinkle)
    r_eye_l = np.sqrt((x_coords - 350.0)**2 + (y_coords - 395.0)**2)
    weight_eye_l = np.exp(-(r_eye_l / 35.0)**2)
    r_eye_r = np.sqrt((x_coords - 550.0)**2 + (y_coords - 395.0)**2)
    weight_eye_r = np.exp(-(r_eye_r / 35.0)**2)

    # 2. Dynamic 3/4 Shoulder Angle adjustment (breaks flat passport symmetry)
    # Give the shoulders and torso (y > 650) a slight natural editorial angle:
    # One shoulder slightly dropped / shifted back, creating depth
    torso_mask = 1.0 / (1.0 + np.exp(-(y_coords - 680.0) / 60.0))
    # Horizontal shift increasing towards bottom to create a subtle 3/4 perspective turn
    dx_pose = torso_mask * ((x_coords - 448.0) * 0.025 + 6.0)
    dy_pose = torso_mask * ((x_coords - 448.0) * 0.015)

    # Combined displacements
    # Smile: lift mouth corners up by 8.5px and out by 2.5px
    dy_smile = -(weight_left * 8.5 + weight_right * 8.5) + (weight_lip_bot * 1.5) - (weight_eye_l * 1.5 + weight_eye_r * 1.5)
    dx_smile = -(weight_left * 2.5) + (weight_right * 2.5)

    dy_total = dy_smile + dy_pose
    dx_total = dx_smile + dx_pose

    sample_y = np.clip(y_coords - dy_total, 0, h - 1)
    sample_x = np.clip(x_coords - dx_total, 0, w - 1)

    result_arr = np.zeros_like(arr)
    for channel in range(c):
        result_arr[:, :, channel] = map_coordinates(arr[:, :, channel], [sample_y, sample_x], order=2, mode='nearest')

    result_img = Image.fromarray(np.clip(result_arr, 0, 255).astype(np.uint8))
    result_img.save(out_path, quality=96)
    print(f'Successfully refined: {out_path}')

if __name__ == '__main__':
    dark_in = '/home/admin/.gemini/antigravity-ide/brain/6c83ce29-4c8b-4e33-a77a-c0c3b1222aef/portrait_dark_1791414840633.jpg'
    dark_out = '/home/admin/.gemini/antigravity-ide/brain/6c83ce29-4c8b-4e33-a77a-c0c3b1222aef/portrait_dark_refined.jpg'
    refine_portrait(dark_in, dark_out, is_light=False)

    light_in = '/home/admin/.gemini/antigravity-ide/brain/6c83ce29-4c8b-4e33-a77a-c0c3b1222aef/portrait_light_1791414863574.jpg'
    light_out = '/home/admin/.gemini/antigravity-ide/brain/6c83ce29-4c8b-4e33-a77a-c0c3b1222aef/portrait_light_refined.jpg'
    refine_portrait(light_in, light_out, is_light=True)
