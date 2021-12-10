/**
 * This is the base class for all Selector types. The key method that all
 * selector subclasses must implement is match(). It takes a TraversalState
 * object (from a TreeTransformer traversal) and tests whether the selector
 * matches at the current node. See the comment at the start of this file for
 * more details on the match() method.
 */
export default class Selector {
    static parse(selectorText) {
        return new Parser(selectorText).parse();
    }

    /**
     * Return an array of the nodes that matched or null if no match.
     * This is the base class so we just throw an exception. All Selector
     * subclasses must provide an implementation of this method.
     */
    match(state) {
        throw new Error("Selector subclasses must implement match()");
    }

    /**
     * Selector subclasses all define a toString() method primarily
     * because it makes it easy to write parser tests.
     */
    toString() {
        return "Unknown selector class";
    }
}

/**
 * This class implements a parser for the selector grammar. Pass the source
 * text to the Parser() constructor, and then call the parse() method to
 * obtain a corresponding Selector object. parse() throws an exception
 * if there are syntax errors in the selector.
 *
 * This class is not exported, and you don't need to use it directly.
 * Instead call the static Selector.parse() method.
 */
class Parser {
    constructor(s) {
        // Normalize whitespace:
        // - remove leading and trailing whitespace
        // - replace runs of whitespace with single space characters
        s = s.trim().replace(/\s+/g, " ");
        // Convert the string to an array of tokens. Note that the TOKENS
        // pattern ignores spaces that do not appear before identifiers
        // or the * wildcard.
        this.tokens = s.match(Parser.TOKENS) || [];
        this.tokenIndex = 0;
    }

    // Return the next token or the empty string if there are no more
    nextToken() {
        return this.tokens[this.tokenIndex] || "";
    }

    // Increment the token index to "consume" the token we were looking at
    // and move on to the next one.
    consume() {
        this.tokenIndex++;
    }

    // Return true if the current token is an identifier or false otherwise
    isIdentifier() {
        // The Parser.TOKENS regexp ensures that we only have to check
        // the first character of a token to know what kind of token it is.
        const c = this.tokens[this.tokenIndex][0];
        return (c >= "a" && c <= "z") || (c >= "A" && c <= "Z");
    }

    // Consume space tokens until the next token is not a space.
    skipSpace() {
        while (this.nextToken() === " ") {
            this.consume();
        }
    }

    // Parse a comma-separated sequence of tree selectors. This is the
    // entry point for the Parser class and the only method that clients
    // ever need to call.
    parse() {
        // We expect at least one tree selector
        const ts = this.parseTreeSelector();

        // Now see what's next
        let token = this.nextToken();

        // If there is no next token then we're done parsing and can return
        // the tree selector object we got above
        if (!token) {
            return ts;
        }

        // Otherwise, there is more go come and we're going to need a
        // list of tree selectors
        const treeSelectors = [ts];
        while (token) {
            // The only character we allow after a tree selector is a comma
            if (token === ",") {
                this.consume();
            } else {
                throw new ParseError("Expected comma");
            }

            // And if we saw a comma, then it must be followed by another
            // tree selector
            treeSelectors.push(this.parseTreeSelector());
            token = this.nextToken();
        }

        // If we parsed more than one tree selector, return them in a
        // SelectorList object.
        return new SelectorList(treeSelectors);
    }

    // Parse a sequence of node selectors linked together with
    // hierarchy combinators: space, >, + and ~.
    parseTreeSelector() {
        this.skipSpace(); // Ignore space after a comma, for example

        // A tree selector must begin with a node selector
        let ns = this.parseNodeSelector();

        for (;;) {
            // Now check the next token. If there is none, or if it is a
            // comma, then we're done with the treeSelector. Otherwise
            // we expect a combinator followed by another node selector.
            // If we don't see a combinator, we throw an error. If we
            // do see a combinator and another node selector then we
            // combine the current node selector with the new node selector
            // using a Selector subclass that depends on the combinator.
            const token = this.nextToken();

            if (!token || token === ",") {
                break;
            } else if (token === " ") {
                this.consume();
                ns = new AncestorCombinator(ns, this.parseNodeSelector());
            } else if (token === ">") {
                this.consume();
                ns = new ParentCombinator(ns, this.parseNodeSelector());
            } else if (token === "+") {
                this.consume();
                ns = new PreviousCombinator(ns, this.parseNodeSelector());
            } else if (token === "~") {
                this.consume();
                ns = new SiblingCombinator(ns, this.parseNodeSelector());
            } else {
                throw new ParseError("Unexpected token: " + token);
            }
        }

        return ns;
    }

    // Parse a single node selector.
    // For now, this is just a node type or a wildcard.
    //
    // TODO(davidflanagan): we may need to extend this with attribute
    // selectors like 'heading[level=3]', or with pseudo-classes like
    // paragraph:first-child
    parseNodeSelector() {
        // First, skip any whitespace
        this.skipSpace();

        const t = this.nextToken();
        if (t === "*") {
            this.consume();
            return new AnyNode();
        } else if (this.isIdentifier()) {
            this.consume();
            return new TypeSelector(t);
        }

        throw new ParseError("Expected node type");
    }
}

// We break the input string into tokens with this regexp. Token types
// are identifiers, integers, punctuation and spaces. Note that spaces
// tokens are only returned when they appear before an identifier or
// wildcard token and are otherwise omitted.
Parser.TOKENS = /([a-zA-Z][\w-]*)|(\d+)|[^\s]|(\s(?=[a-zA-Z\*]))/g;

/**
 * This is a trivial Error subclass that the Parser uses to signal parse errors
 */
class ParseError extends Error {
    constructor(message) {
        super(message);
    }
}

/**
 * This Selector subclass is a list of selectors. It matches a node if any of
 * the selectors on the list matches the node. It considers the selectors in
 * order, and returns the array of nodes returned by whichever one matches
 * first.
 */
class SelectorList extends Selector {
    constructor(selectors) {
        super();
        this.selectors = selectors;
    }

    match(state) {
        for (let i = 0; i < this.selectors.length; i++) {
            const s = this.selectors[i];
            const result = s.match(state);
            if (result) {
                return result;
            }
        }
        return null;
    }

    toString() {
        let result = "";
        for (let i = 0; i < this.selectors.length; i++) {
            result += i > 0 ? ", " : "";
            result += this.selectors[i].toString();
        }
        return result;
    }
}

/**
 * This trivial Selector subclass implements the '*' wildcard and
 * matches any node.
 */
class AnyNode extends Selector {
    match(state) {
        return [state.currentNode()];
    }

    toString() {
        return "*";
    }
}

/**
 * This selector subclass implements the <IDENTIFIER> part of the grammar.
 * it matches any node whose `type` property is a specified string
 */
class TypeSelector extends Selector {
    constructor(type) {
        super();
        this.type = type;
    }

    match(state) {
        const node = state.currentNode();
        if (node.type === this.type) {
            return [node];
        } else {
            return null;
        }
    }

    toString() {
        return this.type;
    }
}

/**
 * This selector subclass is the superclass of the classes that implement
 * matching for the four combinators. It defines left and right properties for
 * the two selectors that are to be combined, but does not define a match
 * method.
 */
class SelectorCombinator extends Selector {
    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }
}

/**
 * This Selector subclass implements the space combinator. It matches if the
 * right selector matches the current node and the left selector matches some
 * ancestor of the current node.
 */
class AncestorCombinator extends SelectorCombinator {
    constructor(left, right) {
        super(left, right);
    }

    match(state) {
        const rightResult = this.right.match(state);
        if (rightResult) {
            state = state.clone();
            while (state.hasParent()) {
                state.goToParent();
                const leftResult = this.left.match(state);
                if (leftResult) {
                    return leftResult.concat(rightResult);
                }
            }
        }
        return null;
    }

    toString() {
        return this.left.toString() + " " + this.right.toString();
    }
}

/**
 * This Selector subclass implements the > combinator. It matches if the
 * right selector matches the current node and the left selector matches
 * the parent of the current node.
 */
class ParentCombinator extends SelectorCombinator {
    constructor(left, right) {
        super(left, right);
    }

    match(state) {
        const rightResult = this.right.match(state);
        if (rightResult) {
            if (state.hasParent()) {
                state = state.clone();
                state.goToParent();
                const leftResult = this.left.match(state);
                if (leftResult) {
                    return leftResult.concat(rightResult);
                }
            }
        }
        return null;
    }

    toString() {
        return this.left.toString() + " > " + this.right.toString();
    }
}

/**
 * This Selector subclass implements the + combinator. It matches if the
 * right selector matches the current node and the left selector matches
 * the immediate previous sibling of the current node.
 */
class PreviousCombinator extends SelectorCombinator {
    constructor(left, right) {
        super(left, right);
    }

    match(state) {
        const rightResult = this.right.match(state);
        if (rightResult) {
            if (state.hasPreviousSibling()) {
                state = state.clone();
                state.goToPreviousSibling();
                const leftResult = this.left.match(state);
                if (leftResult) {
                    return leftResult.concat(rightResult);
                }
            }
        }
        return null;
    }

    toString() {
        return this.left.toString() + " + " + this.right.toString();
    }
}

/**
 * This Selector subclass implements the ~ combinator. It matches if the
 * right selector matches the current node and the left selector matches
 * any previous sibling of the current node.
 */
class SiblingCombinator extends SelectorCombinator {
    constructor(left, right) {
        super(left, right);
    }

    match(state) {
        const rightResult = this.right.match(state);
        if (rightResult) {
            state = state.clone();
            while (state.hasPreviousSibling()) {
                state.goToPreviousSibling();
                const leftResult = this.left.match(state);
                if (leftResult) {
                    return leftResult.concat(rightResult);
                }
            }
        }
        return null;
    }

    toString() {
        return this.left.toString() + " ~ " + this.right.toString();
    }
}
