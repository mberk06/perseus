import _rulesExtraContentSpacing from "../rules/extra-content-spacing";
import _rulesExtraContentSpacingJs from "../rules/extra-content-spacing.js";
import _rulesDoubleSpacingAfterTerminalJs2 from "../rules/double-spacing-after-terminal.js";
import _rulesDoubleSpacingAfterTerminalJs from "../rules/double-spacing-after-terminal.js";
import _rulesImageWidgetJs6 from "../rules/image-widget.js";
import _rulesImageWidgetJs5 from "../rules/image-widget.js";
import _rulesImageWidgetJs4 from "../rules/image-widget.js";
import _rulesImageWidgetJs3 from "../rules/image-widget.js";
import _rulesImageWidgetJs2 from "../rules/image-widget.js";
import _rulesImageWidgetJs from "../rules/image-widget.js";
import _rulesImageSpacesAroundUrlsJs2 from "../rules/image-spaces-around-urls.js";
import _rulesImageSpacesAroundUrlsJs from "../rules/image-spaces-around-urls.js";
import _rulesUnbalancedCodeDelimitersJs2 from "../rules/unbalanced-code-delimiters.js";
import _rulesUnbalancedCodeDelimitersJs from "../rules/unbalanced-code-delimiters.js";
import _rulesMathWithoutDollarsJs2 from "../rules/math-without-dollars.js";
import _rulesMathWithoutDollarsJs from "../rules/math-without-dollars.js";
import _rulesProfanityJs2 from "../rules/profanity.js";
import _rulesProfanityJs from "../rules/profanity.js";
import _rulesMathFontSize2 from "../rules/math-font-size";
import _rulesMathFontSize from "../rules/math-font-size";
import _rulesMathNestedJs2 from "../rules/math-nested.js";
import _rulesMathNestedJs from "../rules/math-nested.js";
import _rulesMathAlignExtraBreak2 from "../rules/math-align-extra-break";
import _rulesMathAlignExtraBreak from "../rules/math-align-extra-break";
import _rulesMathAlignLinebreaks2 from "../rules/math-align-linebreaks";
import _rulesMathAlignLinebreaks from "../rules/math-align-linebreaks";
import _rulesMathAdjacentJs2 from "../rules/math-adjacent.js";
import _rulesMathAdjacentJs from "../rules/math-adjacent.js";
import _rulesMathTextEmptyJs2 from "../rules/math-text-empty.js";
import _rulesMathTextEmptyJs from "../rules/math-text-empty.js";
import _rulesMathFracJs2 from "../rules/math-frac.js";
import _rulesMathFracJs from "../rules/math-frac.js";
import _rulesMathEmptyJs2 from "../rules/math-empty.js";
import _rulesMathEmptyJs from "../rules/math-empty.js";
import _rulesMathStartsWithSpaceJs2 from "../rules/math-starts-with-space.js";
import _rulesMathStartsWithSpaceJs from "../rules/math-starts-with-space.js";
import _rulesUnescapedDollarJs2 from "../rules/unescaped-dollar.js";
import _rulesUnescapedDollarJs from "../rules/unescaped-dollar.js";
import _rulesTableMissingCellsJs2 from "../rules/table-missing-cells.js";
import _rulesTableMissingCellsJs from "../rules/table-missing-cells.js";
import _rulesWidgetInTableJs2 from "../rules/widget-in-table.js";
import _rulesWidgetInTableJs from "../rules/widget-in-table.js";
import _rulesImageInTableJs2 from "../rules/image-in-table.js";
import _rulesImageInTableJs from "../rules/image-in-table.js";
import _rulesAbsoluteUrlJs2 from "../rules/absolute-url.js";
import _rulesAbsoluteUrlJs from "../rules/absolute-url.js";
import _rulesLinkClickHereJs2 from "../rules/link-click-here.js";
import _rulesLinkClickHereJs from "../rules/link-click-here.js";
import _rulesBlockquotedWidgetJs2 from "../rules/blockquoted-widget.js";
import _rulesBlockquotedWidgetJs from "../rules/blockquoted-widget.js";
import _rulesBlockquotedMathJs2 from "../rules/blockquoted-math.js";
import _rulesBlockquotedMathJs from "../rules/blockquoted-math.js";
import _rulesImageAltTextJs2 from "../rules/image-alt-text.js";
import _rulesImageAltTextJs from "../rules/image-alt-text.js";
import _rulesNestedListsJs2 from "../rules/nested-lists.js";
import _rulesNestedListsJs from "../rules/nested-lists.js";
import _rulesHeadingSentenceCaseJs2 from "../rules/heading-sentence-case.js";
import _rulesHeadingSentenceCaseJs from "../rules/heading-sentence-case.js";
import _rulesHeadingTitleCaseJs2 from "../rules/heading-title-case.js";
import _rulesHeadingTitleCaseJs from "../rules/heading-title-case.js";
import _rulesHeadingLevelSkipJs2 from "../rules/heading-level-skip.js";
import _rulesHeadingLevelSkipJs from "../rules/heading-level-skip.js";
import _rulesHeadingLevel1Js2 from "../rules/heading-level-1.js";
import _rulesHeadingLevel1Js from "../rules/heading-level-1.js";
import _rulesLongParagraphJs2 from "../rules/long-paragraph.js";
import _rulesLongParagraphJs from "../rules/long-paragraph.js";
import _perseusMarkdownJsx from "../../perseus-markdown.jsx";
import _assert from "assert";
const assert = _assert;
const PerseusMarkdown = _perseusMarkdownJsx;
import TreeTransformer from "../tree-transformer.js";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;

// TODO(davidflanagan):
// Come back to this file convert the require() calls to imports

describe("Individual lint rules tests", () => {
    function testRule(rule, markdown, context) {
        const tree = PerseusMarkdown.parse(markdown);
        const tt = new TreeTransformer(tree);
        const warnings = [];

        // The markdown parser often outputs adjacent text nodes. We
        // coalesce them before linting for efficiency and accuracy.
        tt.traverse((node, state, content) => {
            if (TreeTransformer.isTextNode(node)) {
                let next = state.nextSibling();
                while (TreeTransformer.isTextNode(next)) {
                    node.content += next.content;
                    state.removeNextSibling();
                    next = state.nextSibling();
                }
            }
        });

        if (context) {
            context.content = markdown;
        } else {
            context = {
                content: markdown,
                widgets: {},
            };
        }
        tt.traverse((node, state, content) => {
            const check = rule.check(node, state, content, context);
            if (check) {
                warnings.push(check);
            }
        });

        return warnings.length === 0 ? null : warnings;
    }

    function expectWarning(rule, strings, context) {
        if (typeof strings === "string") {
            strings = [strings];
        }

        it(`Rule ${rule.name} warns`, () => {
            for (const string of strings) {
                assert.ok(
                    testRule(rule, string, context) !== null,
                    `Expected ${rule.name} to warn for:\n'${string}'`
                );
            }
        });
    }

    function expectPass(rule, strings, context) {
        if (typeof strings === "string") {
            strings = [strings];
        }

        it(`Rule ${rule.name} passes`, () => {
            for (const string of strings) {
                assert.ok(
                    testRule(rule, string, context) === null,
                    `Expected ${rule.name} to pass for:\n'${string}'`
                );
            }
        });
    }

    // 299 characters
    const sentence = new Array(25).fill("lorem ipsum").join(" ");

    // long-paragraph rule warns about paragraphs over 500 characters
    expectWarning(_rulesLongParagraphJs, sentence + sentence);
    expectPass(_rulesLongParagraphJs2, [
        sentence,
        sentence + "\n\n" + sentence,
    ]);

    expectWarning(_rulesHeadingLevel1Js, "# Level 1 heading");
    expectPass(
        _rulesHeadingLevel1Js2,
        "## Level 1 heading\n\n### Level 3 heading"
    );

    expectWarning(
        _rulesHeadingLevelSkipJs,
        "## heading 1\n\n#### heading 2"
    );
    expectPass(_rulesHeadingLevelSkipJs2, [
        "## heading 1\n\n### heading 2\n\n#### heading 3\n\n### heading 4",
        "## heading 1\n\n##heading 2\n\n##heading3",
    ]);

    expectWarning(
        _rulesHeadingTitleCaseJs,
        "## This Heading is in Title Case and the but nor for Too"
    );
    expectPass(_rulesHeadingTitleCaseJs2, [
        "## This heading is in sentence case",
        "## Acronyms: The CIA, NSA, DNI, and FBI",
        "## The Great War",
    ]);

    expectWarning(_rulesHeadingSentenceCaseJs, [
        "## this heading is uncapitalized",
        "## 'this' heading is uncapitalized",
        "##   this heading is uncapitalized",
    ]);
    expectPass(_rulesHeadingSentenceCaseJs2, [
        "## This heading is in sentence case",
        "## 'This heading too'",
        "## 2 + 2 = 4",
    ]);

    expectWarning(_rulesNestedListsJs, [
        "1. outer\n  * nested\n  *nested",
        " + outer\n\n   1. nested",
    ]);
    expectPass(_rulesNestedListsJs2, [
        "-one\n-two\n-three",
        "1. one\n 2. two\n3. three",
        " * one\n\n * two\n\n * three",
    ]);

    expectWarning(_rulesImageAltTextJs, [
        "![](http://google.com/)",
        '![](http://google.com/ "title")',
        "![][url-ref]",
        "![ ](http://google.com/)",
        "![ \t\n ](http://google.com/)", // all whitespace
        "![blah](http://google.com/)", // too short to be meaningful
    ]);

    expectPass(_rulesImageAltTextJs2, [
        "![alt-text](http://google.com)",
        '![alternative text](http://google.com/ "title")',
        "![alt alt alt][url-ref]",
    ]);

    expectWarning(_rulesBlockquotedMathJs, [
        "> $1$",
        "Quote:\n\n> $x$\n\n",
    ]);
    expectPass(_rulesBlockquotedMathJs2, [
        "$x$",
        "\n$x$\n  $y$\n",
        "> bq #1\n\n$x+y=1$\n\n> bq #2",
    ]);

    expectWarning(_rulesBlockquotedWidgetJs, [
        "> [[☃ passage 1]]",
    ]);
    expectPass(_rulesBlockquotedWidgetJs2, [
        "[[☃ passage 1]]",
        "> bq #1\n\nTesting [[☃ passage 1]] testing\n\n> bq #2",
    ]);

    expectWarning(_rulesLinkClickHereJs, [
        "[click here](http://google.com)",
        "[Click here, please](http://google.com)",
        "[For a good time, Click Here](http://google.com)",
    ]);
    expectPass(_rulesLinkClickHereJs2, [
        "[click to activate this link here](http://google.com)",
    ]);

    expectWarning(_rulesAbsoluteUrlJs, [
        // Warn about absolute khanacademy.org urls
        "[target](http://khanacademy.org/about)",
        "[target](https://khanacademy.org/about)",
        "[target](http://www.khanacademy.org/about)",
        "[target](https://www.khanacademy.org/about)",
        "[target](http://es.khanacademy.org/about)",
        "[target](https://es.khanacademy.org/about)",
        "[target](//www.khanacademy.org/about)",
        "[target](//www.khanacademy.org/about)",

        // We should get the same warnings for images
        "![alt text](http://khanacademy.org/about)",
        "![alt text](https://www.khanacademy.org/about)",
        "![alt text](https://es.khanacademy.org/about)",
    ]);
    expectPass(_rulesAbsoluteUrlJs2, [
        "[target](/about)", // relative URLs okay
        "[target](https://kasandbox.org/path)",
        "[target](https://fastly.kastatic.org/path)",
        "[target](https://cdn.kastatic.org/path)",
        "[target](https://ka-perseus-images.s3.amazonaws.com/path)",
        "[target](https://KA-youtube-converted.s3.amazonaws.com)",

        // Same warnings for images
        "![alt text](/about)",
        "![alt text](https://cdn.kastatic.org/path)",
        "![alt text](https://ka-perseus-images.s3.amazonaws.com/path)",
    ]);

    expectWarning(_rulesImageInTableJs, [
        "|col1|col2|\n|----|----|\n|![alt-text](/link.gif)|cell2|",
    ]);
    expectPass(_rulesImageInTableJs2, [
        "![alt-text](/link.gif)\n|col1|col2|\n|----|----|\n|cell1|cell2|",
    ]);

    expectWarning(_rulesWidgetInTableJs, [
        "|col1|col2|\n|----|----|\n|[[☃ passage 1]]|cell2|",
    ]);
    expectPass(_rulesWidgetInTableJs2, [
        "[[☃ passage 1]]\n|col1|col2|\n|----|----|\n|cell1|cell2|",
    ]);

    expectWarning(_rulesTableMissingCellsJs, [
        "|col1|col2|col3|\n|----|----|----|\n|col1|col2|col3|\n|cell1|cell2|",
        "|col1|col2|col3|\n|----|----|----|\n|col1|col2|\n|cell1|cell2|",
        "|col1|col2|\n|----|----|\n|cell1|cell2|\n|cell1|cell2|cell3|",
        "|col1|\n|----|----|\n|col1|\n|cell1|cell2|",
        "|col1|col2|\n|----|----|\n|col1|\n|cell1|cell2|",
    ]);
    expectPass(_rulesTableMissingCellsJs2, [
        "|col1|col2|\n|----|----|\n|cell1|cell2|\n|cell1|cell2|",
        "|cell1|\n|----|\n|cell2|\n|cell3|",
    ]);

    expectWarning(_rulesUnescapedDollarJs, [
        "It costs $10",
        "It costs $$10$",
    ]);

    expectPass(_rulesUnescapedDollarJs2, [
        "It costs \\$10",
        "It costs $10x$",
    ]);

    expectWarning(_rulesMathStartsWithSpaceJs, [
        "foo$~ x$bar",
        "$\\qquad x$",
        "$\\quad x$",
        "$\\, x$",
        "$\\; x$",
        "$\\: x$",
        "$\\ x$",
        "$\\! x$",
        "$\\enspace x$",
        "$\\phantom{xyz} x$",
    ]);
    expectPass(_rulesMathStartsWithSpaceJs2, [
        "$a~ x$",
        "$a\\qquad x$",
        "$a\\quad x$",
        "$a\\, x$",
        "$a\\; x$",
        "$a\\: x$",
        "$a\\ x$",
        "$a\\! x$",
        "$a\\enspace x$",
        "$a\\phantom{xyz} x$",
    ]);

    expectWarning(_rulesMathEmptyJs, [
        "foo $$ bar",
        "foo\n\n$$\n\nbar",
        "$$ | $$ | $$\n- | - | -\ndata 1 | data 2 | data 3",
    ]);
    expectPass(_rulesMathEmptyJs2, [
        "foo $x$ bar",
        "foo\n\n$x$\n\nbar",
        "$x$ | $y$ | $z$\n- | - | -\ndata 1 | data 2 | data 3",
    ]);

    expectWarning(_rulesMathFracJs, [
        "$\\frac 12$",
        "$\\frac{1}{2}$",
    ]);
    expectPass(_rulesMathFracJs2, [
        "$\\dfrac 12$",
        "$\\dfrac{1}{2}$",
        "$\\fraction 12$",
    ]);

    expectWarning(_rulesMathTextEmptyJs, [
        "$x\\text{}y$",
        "$x\\text{ }y$",
        "$x\\text{\n}y$",
        "$x\\text{\t}y$",
    ]);
    expectPass(_rulesMathTextEmptyJs2, ["$x\\text{z}y$"]);

    expectWarning(_rulesMathAdjacentJs, ["$x=b+c$\n\n$x-b=c$"]);
    expectPass(_rulesMathAdjacentJs2, [
        "$x=b+c$\n\nnew paragraph\n\n$x-b=c$",
    ]);

    expectWarning(_rulesMathAlignLinebreaks, [
        "$\\begin{align}x\\\\y\\end{align}$",
        "$\\begin{align} x \\\\ y \\end{align}$",
        "$\\begin{align}x\\\\\\y\\end{align}$",
        "$\\begin{align}x\\\\\\\\\\y\\end{align}$",
        "$\\begin{align}x\\\\\\\\\\\\y\\end{align}$",
    ]);
    expectPass(_rulesMathAlignLinebreaks2, [
        "$\\begin{align}x\\sqrty\\end{align}$",
        "$\\begin{align}x\\\\\\\\y\\end{align}$",
        "$\\begin{align}x \\\\\\\\ y\\end{align}$",
    ]);

    expectWarning(_rulesMathAlignExtraBreak, [
        "$\\begin{align}x \\\\\\\\ y \\\\ \\end{align}$",
        "$\\begin{align}x \\\\\\\\ y \\\\\\\\ \\end{align}$",
    ]);
    expectPass(_rulesMathAlignExtraBreak2, [
        "$\\begin{align} x \\\\\\\\ y  \\end{align}$",
    ]);

    expectWarning(_rulesMathNestedJs, [
        "$\\text{4$x$}$",
        "inline $\\text{4$x$}$ math",
        "$\\text{$$}$",
    ]);
    expectPass(_rulesMathNestedJs2, [
        "$\\text{4}x$",
        "inline $\\text{4}x$ math",
    ]);

    expectWarning(_rulesMathFontSize, [
        "$\\tiny{x}$",
        "inline $\\Tiny{x}$ math",
        "$a \\small{x} b$",
        "$\\large{ xyz }$",
        "$ \\Large { x } $",
        "$\\LARGE{x}$",
        "$\\huge{x}$",
        "$\\Huge{x}$",
        "$\\normalsize{x}$",
        "$\\scriptsize{x}$",
    ]);
    expectPass(_rulesMathFontSize2, [
        "$\\sqrt{x}$",
        "inline $\\sqrt{x}$ math",
    ]);

    expectWarning(_rulesProfanityJs, [
        "Shit",
        "taking a piss",
        "He said 'Fuck that!'",
        "cunt",
        "cocksucker",
        "motherfucker",
    ]);
    expectPass(_rulesProfanityJs2, ["spit", "miss", "duck"]);

    expectWarning(_rulesMathWithoutDollarsJs, [
        "One half: \\frac{1}{2}!",
        "\\Large{BIG}!",
        "This looks like someone's ear: {",
        "Here's the other ear: }. Weird!",
    ]);
    expectPass(_rulesMathWithoutDollarsJs2, [
        "One half: $\\frac{1}{2}$",
        "$\\Large{BIG}$!",
        "`{`",
        "`\\frac{1}{2}`",
        "``\\frac{1}{2}``",
        "```\n\\frac{1}{2}\n```",
        "~~~\n\\frac{1}{2}\n~~~",
        "\n    \\frac{1}{2}\n    {\n    }\n",
    ]);

    expectWarning(_rulesUnbalancedCodeDelimitersJs, [
        "`code``",
        "``code```",
        "```code\n",
        "~~~\ncode\n~~",
    ]);
    expectPass(_rulesUnbalancedCodeDelimitersJs2, [
        "`code`",
        "``code``",
        "```code```",
        "```\ncode\n```",
        "~~~\ncode\n~~~",
        "``co`de``",
        "`co~de`",
        "$`~$",
    ]);

    expectWarning(_rulesImageSpacesAroundUrlsJs, [
        "![alternative]( http://example.com/image.jpg )",
        "![alternative]( http://example.com/image.jpg)",
        "![alternative](http://example.com/image.jpg )",
        "![alternative](\thttp://example.com/image.jpg)",
        "![alternative](http://example.com/image.jpg\t)",
        "![alternative](\nhttp://example.com/image.jpg)",
        "![alternative](http://example.com/image.jpg\n)",
    ]);
    expectPass(_rulesImageSpacesAroundUrlsJs2, [
        "![alternative](http://example.com/image.jpg)",
        "![alternative](image.jpg)",
        "![alternative](--image.jpg--)",
    ]);

    // Warn for image widget with no alt text
    expectWarning(_rulesImageWidgetJs, "[[☃ image 1]]", {
        widgets: {
            "image 1": {
                options: {},
            },
        },
    });

    // Warn for image widget with short alt text
    expectWarning(_rulesImageWidgetJs2, "[[☃ image 1]]", {
        widgets: {
            "image 1": {
                options: {
                    alt: "1234567",
                },
            },
        },
    });

    // Pass for image widget with long alt text
    expectPass(_rulesImageWidgetJs3, "[[☃ image 1]]", {
        widgets: {
            "image 1": {
                options: {
                    alt: "1234567890",
                },
            },
        },
    });

    // Warn for image widget with math in its caption
    expectWarning(_rulesImageWidgetJs4, "[[☃ image 1]]", {
        widgets: {
            "image 1": {
                options: {
                    alt: "1234567890",
                    caption: "Test: $x$",
                },
            },
        },
    });

    // Pass for image widget with caption and no math
    expectPass(_rulesImageWidgetJs5, "[[☃ image 1]]", {
        widgets: {
            "image 1": {
                options: {
                    alt: "1234567890",
                    caption: "Test: x",
                },
            },
        },
    });

    // Pass for image widget with escaped dollar in its caption
    expectPass(_rulesImageWidgetJs6, "[[☃ image 1]]", {
        widgets: {
            "image 1": {
                options: {
                    alt: "1234567890",
                    caption: "Test: \\$10",
                },
            },
        },
    });

    expectWarning(_rulesDoubleSpacingAfterTerminalJs, [
        "Good times.  Great oldies.",
        "End of the line!  ",
        "You?  Me!",
    ]);
    expectPass(_rulesDoubleSpacingAfterTerminalJs2, [
        "This is okay.",
        "This is definitely okay. Yeah.",
        "$a == 3.  125$",
    ]);

    expectWarning(_rulesExtraContentSpacingJs, [
        "There's extra spaces here.     ",
        "There's extra spaces here    ",
        "  ",
    ]);
    expectPass(_rulesExtraContentSpacing, [
        "This is okay.",
        "This is definitely okay. Yeah.",
        "$a == 3.  125$",
    ]);

    /*
    expectWarning(require("../rules/"), [
    ]);
    expectPass(require("../rules/"), [
    ]);
*/
});
export default _module_.exports;
