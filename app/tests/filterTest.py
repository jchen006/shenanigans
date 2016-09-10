# coding: utf-8
import unittest
import sys
import os
sys.path.append("../")
from filters import *


class filterTest(unittest.TestCase):

    def test_1(self):
        self.assertEqual(filter_key_ingred(
            "1 x 500g/1lb 2oz bag fresh gnocchi"), 'gnocchi')

    def test_2(self):
        self.assertEqual(filter_key_ingred(
            "1 small tub (about 200g/7oz) half-fat creme fraiche"), "creme fraiche")

    def test_3(self):
        self.assertEqual(filter_key_ingred(
            "4 x 175g/6oz gurnard fillets, pin boned, skin scored"), "gurnard")

    def test_4(self):
        self.assertEqual(filter_key_ingred(
            "2 tbsp finely chopped fresh thyme"), "thyme")

    def test_5(self):
        self.assertEqual(filter_key_ingred(
            "1 baguette, thinly sliced"), "baguette")

    def test_6(self):
        self.assertEqual(filter_key_ingred(
            "icing sugar for dusting"), "icing sugar")

    def test_7(self):
        self.assertEqual(filter_key_ingred("squeeze of lemon juice"), "lemon")

    def test_8(self):
        self.assertEqual(filter_key_ingred(
            "1 loaf sourdough bread, thickly sliced"), "sourdough bread")

    def test_9(self):
        self.assertEqual(filter_key_ingred(
            "knob of unsalted butter"), "unsalted butter")

    def test_10(self):
        self.assertEqual(filter_key_ingred(
            "600ml/20 fl oz double cream"), "double cream")

    def test_11(self):
        self.assertEqual(filter_key_ingred("sprinkling of paprika"), "paprika")

    def test_12(self):
        self.assertEqual(filter_key_ingred("a little melted butter"), "butter")

    def test_13(self):
        self.assertEqual(filter_key_ingred(
            "small handful red or natural (uncoloured) glace cherries"), ('red cherries', 'glace cherries'))

    def test_14(self):
        self.assertEqual(filter_key_ingred(
            "4 tbsp pickled carrot and mooli (see recipe above)"), ('carrot', 'mooli'))

    def test_15(self):
        self.assertEqual(filter_key_ingred(
            "1 tbsp pomace oil or good quality olive oil"), ('pomace oil', 'olive oil'))

    def test_16(self):
        self.assertEqual(filter_key_ingred(
            "about a third of a medium cucumber"), "cucumber")

    def test_17(self):
        self.assertEqual(filter_key_ingred(
            "white fish (such as haddock)"), "haddock")

    def test_18(self):
        self.assertEqual(filter_key_ingred(
            "2 heaped tbsp chopped dill"), "dill")

    def test_19(self):
        self.assertEqual(filter_key_ingred(
            "1 x 400g/7oz tin peach slices in syrup, drained"), "peach")

    def test_20(self):
        self.assertEqual(filter_key_ingred(
            "8 canned anchovy fillets in oil, drained"), "anchovy")

    def test_21(self):
        self.assertEqual(filter_key_ingred(
            "trimmings and skin from the pumpkin (see below)"), "pumpkin")

    def test_22(self):
        self.assertEqual(filter_key_ingred(
            "4 tbsp chopped, fresh mint or coriander"), ('mint', 'coriander'))

    def test_23(self):
        self.assertEqual(filter_key_ingred(
            "1 tbsp strattu or 2 tbsp tomato puree"), ('strattu', 'tomato'))

    def test_24(self):
        self.assertEqual(filter_key_ingred(
            "freshly squeezed lime juice"), "lime")

    def test_25(self):
        self.assertEqual(filter_key_ingred(
            "350g/1214oz cold, cooked leftover turkey meat, sliced into strips"), "turkey meat")

    def test_26(self):
        self.assertEqual(filter_key_ingred(
            "225g/8oz tinned pineapple in pineapple juice, drained, dried and roughly chopped"), "pineapple")

    def test_27(self):
        self.assertEqual(filter_key_ingred(
            "1 x 400g/7oz tin peach slices in syrup, drained"), "peach")

if __name__ == '__main__':
    unittest.main()
