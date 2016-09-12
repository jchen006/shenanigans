#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
import sys
from unicodedata import normalize
sys.path.append("../app")
from settings import *


class Recipe_Generator:

    remove = ["and", "with", "of", "in", "a", "de", "how", "to", "make"]

    def generate_file_name(self, name):
        name = normalize('NFKD', name).encode('ASCII', 'ignore')
        title = self.remove_excess(name)
        title = title.replace(" ", "_")
        title = title.replace("-", "_")
        title = title.replace(",", "")
        title = title.replace("'", "")
        title = title.replace("(", "")
        title = title.replace(")", "")
        self.file_name = title + ".txt"
        return self.file_name

    def remove_excess(self, name):
        tokens = name.split()
        updated = []

        def uncapitalize(s):
            if len(s) > 0:
                s = s[0].lower() + s[1:]
            return s
        for t in tokens:
            updated.append(uncapitalize(t))
        for r in self.remove:
            if r in updated:
                updated.remove(r)
        return " ".join(updated)

    def write_to_text(self, name, recipe_url, recipe_ingred, recipe_instruct, chef=None):
        print "Writing to a text file for '" + name + "'"
        src = os.path.join(APP_ROOT, 'tmp')
        file = src + "/" + self.generate_file_name(name)
        with open(file, "w") as text_file:
            text_file.write(normalize('NFKD', name).encode(
                'ASCII', 'ignore') + "\n")
            text_file.write(recipe_url + "\n")
            if chef is not None:
                text_file.write(chef + "\n")

            text_file.write("Ingredients \n")

            for i in recipe_ingred:
                text_file.write(normalize('NFKD', i).encode(
                    'ASCII', 'ignore') + "\n")

            text_file.write("Instructions \n")
            for i in recipe_instruct:
                text_file.write(normalize('NFKD', i).encode(
                    'ASCII', 'ignore') + "\n")
        print "Finished writing"

        text_file.close()
        # logging.info('Finished writing ' + filename)
