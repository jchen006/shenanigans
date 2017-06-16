
class Scraper: 


  def __init__(self, name, website): 
    self.name = name
    self.website = website

  def scrapePage(self, url):
    raise NotImplementedError

  def scrapeTitle(self, html_string): 
    raise NotImplementedError
  
  def scrapeChef(self, html_string): 
    raise NotImplementedError
  
  def scrapeIngredients(self, html_string):
    raise NotImplementedError
  
  def scrapeImages(self, html_string): 
    raise NotImplementedError

  def scrapeCulture(self, html_string):
    raise NotImplementedError
  
  