import Rule from "../rule.js";

var module = {
    exports: {}
};

var exports = module.exports;

module.exports = Rule.makeRule({
    name: "math-font-size",
    severity: Rule.Severity.GUIDELINE,
    selector: "math, blockMath",
    // eslint-disable-next-line max-len
    pattern: /\\(tiny|Tiny|small|large|Large|LARGE|huge|Huge|scriptsize|normalsize)\s*{/,
    message: `Math font size:
Don't change the default font size with \\Large{} or similar commands`,
});
export default module.exports;
