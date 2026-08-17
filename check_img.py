from PIL import Image
for i in ['dryfruit.jpg.png', 'pinkladdu.png', 'milletkheer..png', 'coconutladdu.png', 'panjirithali.png']:
    img = Image.open(f'public/images/{i}')
    w, h = img.size
    kind = "landscape" if w > h else "portrait" if h > w else "square"
    print(f"{i}: {w}x{h} ({kind})")
