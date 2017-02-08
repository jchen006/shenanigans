# shenanigans
Food Stuffz 

## Scrapers
### Food Network 
```
$python scrapers/foodnetwork.py 
```

If you want to change queries, go to "TODO" and change to your own personalized query. 
Still in debugging for specific pages.

##Environment Settings


##Dependecies 
- Flask 
- pyenchant 

##Local Deployment 
```
$python app/run.py
```

##Heroku Deployment
Make sure everything is up to date on Git
```
$ git push heroku master 
```

Notes
- Get angular working 
- Add the search filter option 
- Add Bon Appetit scraper 
- Add Epicurious Scraper 
- Look into getting a recipe page working


*Need to add settings for dataset sizes 

(1) How we want to show the graph with edges part (Recipes in relation to ingredients? Highlighting the ingredients path)
(2) What other graphs do we want to show? 

- Machine Learning Labels of Recipes and percentage it might be a certain cuisine 
For instance Korean Short Rib Taco a percentage bar of 70% korean and 30% mexican 
- suggested types of ingredients to go with other ingredients pairing percentages 


(3) How we want to label each recipe and ingredient aka what categories are we going to label them by. Also is ingredient going to be a feature when we run machine learning? 
(4) How are we going to dynamically show stats for each recipe and for each ingredient? 
(5) how are we going to make our site look sexy 
(6) Make the pipeline a lot more smoother so that the user can define the dataset size

Nomenclature for all charts 
all CSS, javascript will start with the html pages name

## License

Copyright (C) 2016  Jeffrey Chen and Siddhartho Bhattacharya

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.



