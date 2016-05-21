from selenium import webdriver
from depot.manager import DepotManager
from PIL import Image





depot = DepotManager.get()
driver = webdriver.PhantomJS()
driver.set_window_size(1024, 768) # set the window size that you need 
driver.get('http://stackoverflow.com/')
ele = driver.find_element_by_id('hlogo')

loc1 = ele.location 
size1 = ele.size 

driver.save_screenshot('stackoverflow.png')

image2 = Image.open('stackoverflow.png')

left = loc1['x']
top = loc1['y']
right = loc1['x'] + size1['width']
bottom1 = loc1['y'] + size1['height']

image2 = image2.crop((left,top,right,bottom1))
image2.save('updated.png')

driver.quit()

