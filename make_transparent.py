from PIL import Image
img = Image.open('public/index-node-map.jpg').convert('RGBA')
for y in range(img.height):
    for x in range(img.width):
        r, g, b, a = img.getpixel((x, y))
        if r > 220 and g > 220 and b > 220:
            img.putpixel((x, y), (255, 255, 255, 0))
        elif abs(r - g) < 20 and abs(r - b) < 20 and r > 200:
            img.putpixel((x, y), (255, 255, 255, 0))
img.save('public/index-node-map-transparent.png')
print('saved')
