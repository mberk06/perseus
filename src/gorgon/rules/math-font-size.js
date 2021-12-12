import Rule from "../rule.js";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;

_module_.exports = Rule.makeRule({
    name: "math-font-size",
    severity: Rule.Severity.GUIDELINE,
    selector: "math, blockMath",
    // eslint-disable-next-line max-len
    pattern: /\\(tiny|Tiny|small|large|Large|LARGE|huge|Huge|scriptsize|normalsize)\s*{/,
    message: `Math font size:
Don't change the default font size with \\Large{} or similar commands`,
});
export default _module_.exports;
