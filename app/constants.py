
measurements = ['cups', 'oz', 'tsp', 'tablespoons', 
	'teaspoons', 'tablespoon', 'teaspoon', 'tbsp', 'cup', 'fl', 
	'g ', 'bunch', 'pinch', "piece of", 'bunches', 'handful', 
	'sprig', 'heads', 'dash', 'fillets', 'block', 'mixture', 'pieces', 'piece', 'clove'
	'flakes', 'strip', 'slice', 'slices', 'knob', 'rashers', 'head', 'sheets', 'lump', 
	'handfuls', 'glug', 'pint', ' spears', 'ml', 'drizzle', 'bottle', 'wedges', 'pts', 
	'seeds', 'packet', 'bag', 'loaf', 'tub', 'cubes', 'sticks', 'stick', 'pints', 'cloves', 
	'tin', 'dashes', 'drops', 'can ', 'bottles', 'pinches', 'strips']

conjunctions = ['and','but','or','yet','for','nor','so', 'of']

size = ['micro', 'baby', 'small', 'medium', 'large', 'fat', 'little']

#IF there is no other NN in front of salt like "sea salt" then remove
"""Salt, water, and black pepper will not be considered as actual ingredients unless mentioned as 
Himalayan salt, black peppercorns, etc"""
general = ['water', 'salt', 'black pepper']

#Double check if recognized as verbs
states = ['ground ', 'clarified', 'grated', 'peeled', 'cored', 'quartered', 'unpasteurised', 'young', 
	'slender', 'cooked', 'minced', 'chopped', 'squeezed', 'ripe', 'cooking', 'leaves', 'mince', 
	'blanched', 'puree', 'free-range', 'clear', 'mixed', 'finely', 'canned', 'easy-cook', 'cold-pressed',
	'freeze-dried', 'essence', 'minced', 'melted', 'natural', 'pickled', 'streaky', 'light', 'shavings', 'skinless',
	'boneless', 'nibbed', 'paste', 'cutlets', 'chilled', 'stalk', 'stalks', 'flakes', 'crystallised', 'leftover', 
	'sliced'] 

misc = ['good-quality', 'ready_made', 'ready-to-eat' 'freshly', 'strong', 'smoked', 'soft', 'hard', 'warm', 'fresh',
	'few', 'raw', 'good', 'wild', 'dried', 'generous', 'very', 'whole', 'half-fat', 'a little', 'quality', 'level', 
	'about', 'plain', 'vacuum-packed', 'heaped']

colors = ['red', 'white', 'black']
