import Rule from "../rule.js";

var module = {
    exports: {}
};

var exports = module.exports;

module.exports = Rule.makeRule({
    name: "math-frac",
    severity: Rule.Severity.GUIDELINE,
    selector: "math, blockMath",
    pattern: /\\frac[ {]/,
    message: "Use \\dfrac instead of \\frac in your math expressions.",
});
export default module.exports;
