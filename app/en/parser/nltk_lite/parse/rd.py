# Natural Language Toolkit: Recursive Descent Parser
#
# Copyright (C) 2001-2006 University of Pennsylvania
# Author: Edward Loper <edloper@gradient.cis.upenn.edu>
#         Steven Bird <sb@csse.unimelb.edu.au>
# URL: <http://nltk.sf.net>
# For license information, see LICENSE.TXT

from en.parser.nltk_lite.parse import cfg
from tree import *
from en.parser.nltk_lite import tokenize
from en.parser.nltk_lite.parse import AbstractParse
from types import *

# //////////////////////////////////////////////////////
# Recursive Descent Parser
# //////////////////////////////////////////////////////


class RecursiveDescent(AbstractParse):
    """
    A simple top-down CFG parser that parses texts by recursively
    expanding the fringe of a C{Tree}, and matching it against a
    text.

    C{RecursiveDescent} uses a list of tree locations called a
    X{frontier} to remember which subtrees have not yet been expanded
    and which leaves have not yet been matched against the text.  Each
    tree location consists of a list of child indices specifying the
    path from the root of the tree to a subtree or a leaf; see the
    reference documentation for C{Tree} for more information
    about tree locations.

    When the parser begins parsing a text, it constructs a tree
    containing only the start symbol, and a frontier containing the
    location of the tree's root node.  It then extends the tree to
    cover the text, using the following recursive procedure:

      - If the frontier is empty, and the text is covered by the tree,
        then return the tree as a possible parse.
      - If the frontier is empty, and the text is not covered by the
        tree, then return no parses.
      - If the first element of the frontier is a subtree, then
        use CFG productions to X{expand} it.  For each applicable
        production, add the expanded subtree's children to the
        frontier, and recursively find all parses that can be
        generated by the new tree and frontier.
      - If the first element of the frontier is a token, then X{match}
        it against the next token from the text.  Remove the token
        from the frontier, and recursively find all parses that can be
        generated by the new tree and frontier.

    @see: C{nltk.cfg}
    """

    def __init__(self, grammar, trace=0):
        """
        Create a new C{RecursiveDescent}, that uses C{grammar}
        to parse texts.

        @type grammar: C{Grammar}
        @param grammar: The grammar used to parse texts.
        @type trace: C{int}
        @param trace: The level of tracing that should be used when
            parsing a text.  C{0} will generate no tracing output;
            and higher numbers will produce more verbose tracing
            output.
        """
        self._grammar = grammar
        self._trace = trace
        AbstractParse.__init__(self)

    def get_parse_list(self, tokens):
        # Inherit docs from ParseI

        # Start a recursive descent parse, with an initial tree
        # containing just the start symbol.
        start = self._grammar.start().symbol()
        initial_tree = Tree(start, [])
        frontier = [()]
        if self._trace:
            self._trace_start(initial_tree, frontier, tokens)
        parses = self._parse(tokens, initial_tree, frontier)

        # Return the parses.
        return parses

    def _parse(self, remaining_text, tree, frontier):
        """
        Recursively expand and match each elements of C{tree}
        specified by C{frontier}, to cover C{remaining_text}.  Return
        a list of all parses found.

        @return: A list of all parses that can be generated by
            matching and expanding the elements of C{tree}
            specified by C{frontier}.
        @rtype: C{list} of C{Tree}
        @type tree: C{Tree}
        @param tree: A partial structure for the text that is
            currently being parsed.  The elements of C{tree}
            that are specified by C{frontier} have not yet been
            expanded or matched.
        @type remaining_text: C{list} of C{String}s
        @param remaining_text: The portion of the text that is not yet
            covered by C{tree}.
        @type frontier: C{list} of C{tuple} of C{int}
        @param frontier: A list of the locations within C{tree} of
            all subtrees that have not yet been expanded, and all
            leaves that have not yet been matched.  This list sorted
            in left-to-right order of location within the tree.
        """

        # If the tree covers the text, and there's nothing left to
        # expand, then we've found a complete parse; return it.
        if len(remaining_text) == 0 and len(frontier) == 0:
            if self._trace:
                self._trace_succeed(tree, frontier)
            return [tree]

        # If there's still text, but nothing left to expand, we failed.
        elif len(frontier) == 0:
            if self._trace:
                self._trace_backtrack(tree, frontier)
            return []

        # If the next element on the frontier is a tree, expand it.
        elif isinstance(tree[frontier[0]], Tree):
            return self._expand(remaining_text, tree, frontier)

        # If the next element on the frontier is a token, match it.
        else:
            return self._match(remaining_text, tree, frontier)

    def _match(self, rtext, tree, frontier):
        """
        @rtype: C{list} of C{Tree}
        @return: a list of all parses that can be generated by
            matching the first element of C{frontier} against the
            first token in C{rtext}.  In particular, if the first
            element of C{frontier} has the same type as the first
            token in C{rtext}, then substitute the token into
            C{tree}; and return all parses that can be generated by
            matching and expanding the remaining elements of
            C{frontier}.  If the first element of C{frontier} does not
            have the same type as the first token in C{rtext}, then
            return empty list.

        @type tree: C{Tree}
        @param tree: A partial structure for the text that is
            currently being parsed.  The elements of C{tree}
            that are specified by C{frontier} have not yet been
            expanded or matched.
        @type rtext: C{list} of C{String}s
        @param rtext: The portion of the text that is not yet
            covered by C{tree}.
        @type frontier: C{list} of C{tuple} of C{int}
        @param frontier: A list of the locations within C{tree} of
            all subtrees that have not yet been expanded, and all
            leaves that have not yet been matched.
        """

        tree_leaf = tree[frontier[0]]
        if (len(rtext) > 0 and tree_leaf == rtext[0]):
            # If it's a terminal that matches rtext[0], then substitute
            # in the token, and continue parsing.
            newtree = tree.copy(deep=True)
            newtree[frontier[0]] = rtext[0]
            if self._trace:
                self._trace_match(newtree, frontier[1:], rtext[0])
            return self._parse(rtext[1:], newtree, frontier[1:])
        else:
            # If it's a non-matching terminal, fail.
            if self._trace:
                self._trace_backtrack(tree, frontier, rtext[:1])
            return []

    def _expand(self, remaining_text, tree, frontier, production=None):
        """
        @rtype: C{list} of C{Tree}
        @return: A list of all parses that can be generated by
            expanding the first element of C{frontier} with
            C{production}.  In particular, if the first element of
            C{frontier} is a subtree whose node type is equal to
            C{production}'s left hand side, then add a child to that
            subtree for each element of C{production}'s right hand
            side; and return all parses that can be generated by
            matching and expanding the remaining elements of
            C{frontier}.  If the first element of C{frontier} is not a
            subtree whose node type is equal to C{production}'s left
            hand side, then return an empty list.  If C{production} is
            not specified, then return a list of all parses that can
            be generated by expanding the first element of C{frontier}
            with I{any} CFG production.

        @type tree: C{Tree}
        @param tree: A partial structure for the text that is
            currently being parsed.  The elements of C{tree}
            that are specified by C{frontier} have not yet been
            expanded or matched.
        @type remaining_text: C{list} of C{String}s
        @param remaining_text: The portion of the text that is not yet
            covered by C{tree}.
        @type frontier: C{list} of C{tuple} of C{int}
        @param frontier: A list of the locations within C{tree} of
            all subtrees that have not yet been expanded, and all
            leaves that have not yet been matched.
        """

        if production is None:
            productions = self._grammar.productions()
        else:
            productions = [production]

        parses = []
        for production in productions:
            lhs = production.lhs().symbol()
            if lhs == tree[frontier[0]].node:
                subtree = self._production_to_tree(production)
                if frontier[0] == ():
                    newtree = subtree
                else:
                    newtree = tree.copy(deep=True)
                    newtree[frontier[0]] = subtree
                new_frontier = [frontier[0] + (i,) for i in
                                range(len(production.rhs()))]
                if self._trace:
                    self._trace_expand(newtree, new_frontier, production)
                parses += self._parse(remaining_text, newtree,
                                      new_frontier + frontier[1:])
        return parses

    def _production_to_tree(self, production):
        """
        @rtype: C{Tree}
        @return: The C{Tree} that is licensed by C{production}.
            In particular, given the production::

                C{[M{lhs} -> M{elt[1]} ... M{elt[n]}]}

            Return a tree token that has a node C{M{lhs}.symbol}, and
            C{M{n}} children.  For each nonterminal element
            C{M{elt[i]}} in the production, the tree token has a
            childless subtree with node value C{M{elt[i]}.symbol}; and
            for each terminal element C{M{elt[j]}}, the tree token has
            a leaf token with type C{M{elt[j]}}.

        @param production: The CFG production that licenses the tree
            token that should be returned.
        @type production: C{Production}
        """
        children = []
        for elt in production.rhs():
            if isinstance(elt, cfg.Nonterminal):
                children.append(Tree(elt.symbol(), []))
            else:
                # This will be matched.
                children.append(elt)
        return Tree(production.lhs().symbol(), children)

    def trace(self, trace=2):
        """
        Set the level of tracing output that should be generated when
        parsing a text.

        @type trace: C{int}
        @param trace: The trace level.  A trace level of C{0} will
            generate no tracing output; and higher trace levels will
            produce more verbose tracing output.
        @rtype: C{None}
        """
        self._trace = trace

    def _trace_fringe(self, tree, treeloc=None):
        """
        Print trace output displaying the fringe of C{tree}.  The
        fringe of C{tree} consists of all of its leaves and all of
        its childless subtrees.

        @rtype: C{None}
        """

        if treeloc == ():
            print "*",
        if isinstance(tree, Tree):
            if len(tree) == 0:
                print `cfg.Nonterminal(tree.node)`,
            for i in range(len(tree)):
                if treeloc is not None and i == treeloc[0]:
                    self._trace_fringe(tree[i], treeloc[1:])
                else:
                    self._trace_fringe(tree[i])
        else:
            print `tree`,

    def _trace_tree(self, tree, frontier, operation):
        """
        Print trace output displaying the parser's current state.

        @param operation: A character identifying the operation that
            generated the current state.
        @rtype: C{None}
        """
        if self._trace == 2:
            print '  %c [' % operation,
        else:
            print '    [',
        if len(frontier) > 0:
            self._trace_fringe(tree, frontier[0])
        else:
            self._trace_fringe(tree)
        print ']'

    def _trace_start(self, tree, frontier, text):
        print 'Parsing %r' % ' '.join(text)
        if self._trace > 2:
            print 'Start:'
        if self._trace > 1:
            self._trace_tree(tree, frontier, ' ')

    def _trace_expand(self, tree, frontier, production):
        if self._trace > 2:
            print 'Expand: %s' % production
        if self._trace > 1:
            self._trace_tree(tree, frontier, 'E')

    def _trace_match(self, tree, frontier, tok):
        if self._trace > 2:
            print 'Match: %r' % tok
        if self._trace > 1:
            self._trace_tree(tree, frontier, 'M')

    def _trace_succeed(self, tree, frontier):
        if self._trace > 2:
            print 'GOOD PARSE:'
        if self._trace == 1:
            print 'Found a parse:\n%s' % tree
        if self._trace > 1:
            self._trace_tree(tree, frontier, '+')

    def _trace_backtrack(self, tree, frontier, toks=None):
        if self._trace > 2:
            if toks:
                print 'Backtrack: %r match failed' % toks[0]
            else:
                print 'Backtrack'

# //////////////////////////////////////////////////////
# Stepping Recursive Descent Parser
# //////////////////////////////////////////////////////


class SteppingRecursiveDescent(RecursiveDescent):
    """
    A C{RecursiveDescent} that allows you to step through the
    parsing process, performing a single operation at a time.

    The C{initialize} method is used to start parsing a text.
    C{expand} expands the first element on the frontier using a single
    CFG production, and C{match} matches the first element on the
    frontier against the next text token. C{backtrack} undoes the most
    recent expand or match operation.  C{step} performs a single
    expand, match, or backtrack operation.  C{parses} returns the set
    of parses that have been found by the parser.

    @ivar _history: A list of C{(rtext, tree, frontier)} tripples,
        containing the previous states of the parser.  This history is
        used to implement the C{backtrack} operation.
    @ivar _tried_e: A record of all productions that have been tried
        for a given tree.  This record is used by C{expand} to perform
        the next untried production.
    @ivar _tried_m: A record of what tokens have been matched for a
        given tree.  This record is used by C{step} to decide whether
        or not to match a token.
    @see: C{nltk.cfg}
    """

    def __init__(self, grammar, trace=0):
        self._grammar = grammar
        self._trace = trace
        self._rtext = None
        self._tree = None
        self._frontier = [()]
        self._tried_e = {}
        self._tried_m = {}
        self._history = []
        self._parses = []
        AbstractParse.__init__(self)

    # [XX] TEMPORARY HACK WARNING!  This should be replaced with
    # something nicer when we get the chance.
    def _freeze(self, tree):
        c = tree.copy()
#        for pos in c.treepositions('leaves'):
#            c[pos] = c[pos].freeze()
        return ImmutableTree.convert(c)

    def get_parse_list(self, tokens):
        self.initialize(tokens)
        while self.step() is not None:
            pass

        return self.parses()

    def initialize(self, tokens):
        """
        Start parsing a given text.  This sets the parser's tree to
        the start symbol, its frontier to the root node, and its
        remaining text to C{token['SUBTOKENS']}.
        """

        self._rtext = tokens
        start = self._grammar.start().symbol()
        self._tree = Tree(start, [])
        self._frontier = [()]
        self._tried_e = {}
        self._tried_m = {}
        self._history = []
        self._parses = []
        if self._trace:
            self._trace_start(self._tree, self._frontier, self._rtext)

    def remaining_text(self):
        """
        @return: The portion of the text that is not yet covered by the
            tree.
        @rtype: C{list} of C{String}
        """
        return self._rtext

    def frontier(self):
        """
        @return: A list of the tree locations of all subtrees that
            have not yet been expanded, and all leaves that have not
            yet been matched.
        @rtype: C{list} of C{tuple} of C{int}
        """
        return self._frontier

    def tree(self):
        """
        @return: A partial structure for the text that is
            currently being parsed.  The elements specified by the
            frontier have not yet been expanded or matched.
        @rtype: C{Tree}
        """
        return self._tree

    def step(self):
        """
        Perform a single parsing operation.  If an untried match is
        possible, then perform the match, and return the matched
        token.  If an untried expansion is possible, then perform the
        expansion, and return the production that it is based on.  If
        backtracking is possible, then backtrack, and return 1.
        Otherwise, return 0.

        @return: 0 if no operation was performed; a token if a match
            was performed; a production if an expansion was performed;
            and 1 if a backtrack operation was performed.
        @rtype: C{Production} or C{String} or C{boolean}
        """
        # Try matching (if we haven't already)
        if self.untried_match():
            token = self.match()
            if token is not None:
                return token

        # Try expanding.
        production = self.expand()
        if production is not None:
            return production

        # Try backtracking
        if self.backtrack():
            self._trace_backtrack(self._tree, self._frontier)
            return 1

        # Nothing left to do.
        return None

    def expand(self, production=None):
        """
        Expand the first element of the frontier.  In particular, if
        the first element of the frontier is a subtree whose node type
        is equal to C{production}'s left hand side, then add a child
        to that subtree for each element of C{production}'s right hand
        side.  If C{production} is not specified, then use the first
        untried expandable production.  If all expandable productions
        have been tried, do nothing.

        @return: The production used to expand the frontier, if an
           expansion was performed.  If no expansion was performed,
           return C{None}.
        @rtype: C{Production} or C{None}
        """

        # Make sure we *can* expand.
        if len(self._frontier) == 0:
            return None
        if not isinstance(self._tree[self._frontier[0]], Tree):
            return None

        # If they didn't specify a production, check all untried ones.
        if production is None:
            productions = self.untried_expandable_productions()
        else:
            productions = [production]

        parses = []
        for prod in productions:
            # Record that we've tried this production now.
            self._tried_e.setdefault(self._freeze(self._tree), []).append(prod)

            # Try expanding.
            if self._expand(self._rtext, self._tree, self._frontier, prod):
                return prod

        # We didn't expand anything.
        return None

    def match(self):
        """
        Match the first element of the frontier.  In particular, if
        the first element of the frontier has the same type as the
        next text token, then substitute the text token into the tree.

        @return: The token matched, if a match operation was
            performed.  If no match was performed, return C{None}
        @rtype: C{String} or C{None}
        """

        # Record that we've tried matching this token.
        tok = self._rtext[0]
        self._tried_m.setdefault(self._freeze(self._tree), []).append(tok)

        # Make sure we *can* match.
        if len(self._frontier) == 0:
            return None
        if isinstance(self._tree[self._frontier[0]], Tree):
            return None

        if self._match(self._rtext, self._tree, self._frontier):
            # Return the token we just matched.
            return self._history[-1][0][0]
        else:
            return None

    def backtrack(self):
        """
        Return the parser to its state before the most recent
        match or expand operation.  Calling C{undo} repeatedly return
        the parser to successively earlier states.  If no match or
        expand operations have been performed, C{undo} will make no
        changes.

        @return: true if an operation was successfully undone.
        @rtype: C{boolean}
        """
        if len(self._history) == 0:
            return 0
        (self._rtext, self._tree, self._frontier) = self._history.pop()
        return 1

    def expandable_productions(self):
        """
        @return: A list of all the productions for which expansions
            are available for the current parser state.
        @rtype: C{list} of C{Production}
        """
        # Make sure we *can* expand.
        if len(self._frontier) == 0:
            return []
        frontier_child = self._tree[self._frontier[0]]
        if (len(self._frontier) == 0 or
                not isinstance(frontier_child, Tree)):
            return []

        return [p for p in self._grammar.productions()
                if p.lhs().symbol() == frontier_child.node]

    def untried_expandable_productions(self):
        """
        @return: A list of all the untried productions for which
            expansions are available for the current parser state.
        @rtype: C{list} of C{Production}
        """

        tried_expansions = self._tried_e.get(self._freeze(self._tree), [])
        return [p for p in self.expandable_productions()
                if p not in tried_expansions]

    def untried_match(self):
        """
        @return: Whether the first element of the frontier is a token
            that has not yet been matched.
        @rtype: C{boolean}
        """

        if len(self._rtext) == 0:
            return 0
        tried_matches = self._tried_m.get(self._freeze(self._tree), [])
        return (self._rtext[0] not in tried_matches)

    def currently_complete(self):
        """
        @return: Whether the parser's current state represents a
            complete parse.
        @rtype: C{boolean}
        """
        return (len(self._frontier) == 0 and len(self._rtext) == 0)

    def _parse(self, remaining_text, tree, frontier):
        """
        A stub version of C{_parse} that sets the parsers current
        state to the given arguments.  In C{RecursiveDescent},
        the C{_parse} method is used to recursively continue parsing a
        text.  C{SteppingRecursiveDescent} overrides it to
        capture these recursive calls.  It records the parser's old
        state in the history (to allow for backtracking), and updates
        the parser's new state using the given arguments.  Finally, it
        returns C{[1]}, which is used by C{match} and C{expand} to
        detect whether their operations were successful.

        @return: C{[1]}
        @rtype: C{list} of C{int}
        """
        self._history.append((self._rtext, self._tree, self._frontier))
        self._rtext = remaining_text
        self._tree = tree
        self._frontier = frontier

        # Is it a good parse?  If so, record it.
        if (len(frontier) == 0 and len(remaining_text) == 0):
            self._parses.append(tree)
            self._trace_succeed(self._tree, self._frontier)

        return [1]

    def parses(self):
        """
        @return: A list of the parses that have been found by this
            parser so far.
        @rtype: C{list} of C{Tree}
        """
        return self._parses


# copied from nltk.parser

    def set_grammar(self, grammar):
        """
        Change the grammar used to parse texts.

        @param grammar: The new grammar.
        @type grammar: C{CFG}
        """
        self._grammar = grammar

# //////////////////////////////////////////////////////
# Demonstration Code
# //////////////////////////////////////////////////////


def demo():
    """
    A demonstration of the recursive descent parser.
    """

    from en.parser.nltk_lite.parse import cfg

    # Define some nonterminals
    S, VP, NP, PP = cfg.nonterminals('S, VP, NP, PP')
    V, N, P, Name, Det = cfg.nonterminals('V, N, P, Name, Det')

    # Define a grammar.
    productions = (
        # Syntactic Productions
        cfg.Production(S, [NP, 'saw', NP]),
        cfg.Production(S, [NP, VP]),
        cfg.Production(NP, [Det, N]),
        cfg.Production(VP, [V, NP, PP]),
        cfg.Production(NP, [Det, N, PP]),
        cfg.Production(PP, [P, NP]),

        # Lexical Productions
        cfg.Production(NP, ['I']),   cfg.Production(Det, ['the']),
        cfg.Production(Det, ['a']),  cfg.Production(N, ['man']),
        cfg.Production(V, ['saw']),  cfg.Production(P, ['in']),
        cfg.Production(P, ['with']), cfg.Production(N, ['park']),
        cfg.Production(N, ['dog']),  cfg.Production(N, ['telescope'])
    )
    grammar = cfg.Grammar(S, productions)

    # Tokenize a sample sentence.
    sent = list(tokenize.whitespace('I saw a man in the park'))

    # Define a list of parsers.
    parser = RecursiveDescent(grammar)
    parser.trace()
    for p in parser.get_parse_list(sent):
        print p

if __name__ == '__main__':
    demo()
