import sys
from PIL import Image
# for multiple files
'''for i in range(100,102):
    if (i<10):
        s='0'+str(i)
    else:
        s=str(i)'''
#end multiple files
#change image name 
print("C")
images = [Image.open(x) for x in ['./uploads/1.jpg', './uploads/1.jpg']]
widths, heights = zip(*(i.size for i in images))
print("H")
total_width = sum(widths)
max_height = max(heights)
print("U")
new_im = Image.new('RGB', (total_width, max_height))
print("T")
x_offset = 0
for im in images:
  new_im.paste(im, (x_offset,0))
  x_offset += im.size[0]
print("I")
new_im.save('./pytorch-CycleGAN-and-pix2pix/datasets/faces/test/hel.jpg')
print("YA")
