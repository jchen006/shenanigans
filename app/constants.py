
measurements = ['cups', 'oz', 'tsp', 'tablespoons', 
	'teaspoons', 'tablespoon', 'teaspoon', 'tbsp', 'cup', 'fl ', 
	'g ', 'bunch', 'pinch', "piece of", 'bunches', 'handful', 
	'sprig', 'heads', 'dash', 'fillets', 'block', 'mixture', 'pieces', 'piece', 'clove'
	'flakes', 'strip', 'slice', 'slices', 'knob', 'rashers', 'head', 'sheets', 'lump', 
	'handfuls', 'glug', 'pint', ' spears', 'ml', 'drizzle', 'bottle', 'wedges', 'pts', 
	'seeds']

conjunctions = ['and','but','or','yet','for','nor','so', 'of']

size = ['micro', 'baby', 'small', 'medium', 'large']

#IF there is no other NN in front of salt like "sea salt" then remove
"""Salt, water, and black pepper will not be considered as actual ingredients unless mentioned as 
Himalayan salt, black peppercorns, etc"""
general = ['water', 'salt', 'black pepper']

#Double check if recognized as verbs
states = ['ground', 'clarified', 'grated', 'peeled', 'cored', 'quartered', 'unpasteurised', 'young', 
	'slender', 'cooked', 'minced', 'chopped', 'squeezed', 'ripe', 'cooking', 'leaves', 'mince', 
	'blanched', 'puree', 'free-range', 'clear', 'mixed', 'finely', 'can', 'easy-cook', 'cold-pressed',
	'freeze-dried', 'essence'] 

misc = ['good-quality', 'ready_made', 'freshly', 'strong', 'smoked', 'soft', 'hard', 'warm', 'fresh',
	'few', 'raw', 'good', 'wild', 'dried', 'generous']

