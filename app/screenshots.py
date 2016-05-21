from selenium import webdriver
from depot.manager import DepotManager
depot = DepotManager.get()
driver = webdriver.PhantomJS()
driver.set_window_size(1024, 768) # set the window size that you need 
driver.get('https://github.com')
driver.save_screenshot('github.png')