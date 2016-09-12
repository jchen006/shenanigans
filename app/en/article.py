# ARTICLE - last updated for NodeBox 1rc7
# Author: Tom De Smedt <tomdesmedt@organisms.be>
# See LICENSE.txt for details.

# Based on the Ruby Linguistics module by Michael Granger:
# http://www.deveiate.org/projects/Linguistics/wiki/English

article_rules = [

    # exceptions: an hour, an honor
    ["euler|hour(?!i)|heir|honest|hono", "an"],

    # Abbreviations
    # Strings of capitals starting with a vowel-sound consonant
    # followed by another consonant,
    # and which are not likely to be real words.
    ["(?!FJO|[HLMNS]Y.|RY[EO]|SQU|(F[LR]?|[HL]|MN?|N|RH?|S[CHKLMNPTVW]?|X(YL)?)[AEIOU])[FHLMNRSX][A-Z]", "an"],
    ["^[aefhilmnorsx][.-]", "an"],
    ["^[a-z][.-]", "a"],

    ["^[^aeiouy]", "a"],                              # consonants: a bear
    # eu like "you": a european
    ["^e[uw]", "a"],
    ["^onc?e", "a"],                                  # o like "wa": a one-liner
    # u like "you": a university
    ["uni([^nmd]|mo)", "a"],
    ["^u[bcfhjkqrst][aeiou]", "a"],                   # u like "you": a uterus
    ["^[aeiou]", "an"],                               # vowels: an owl
    # y like "i": an yclept, a year
    ["y(b[lor]|cl[ea]|fere|gg|p[ios]|rou|tt)", "an"],
    ["", "a"]                                         # guess "a"

]


def article(word):
    """ Returns the indefinite article for a given word.

    For example: university -> a university.

    """

    import re
    for rule in article_rules:
        pattern, article = rule
        if re.search(pattern, word) is not None:
            return article + " " + word


def a(word):
    return article(word)


def an(word):
    return article(word)

# print article("hour")
# print article("FBI")
# print article("bear")
# print article("one-liner")
# print article("european")
# print article("university")
# print article("uterus")
# print article("owl")
# print article("yclept")
# print article("year")
