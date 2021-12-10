import Rule from "../rule.js";

var module = {
    exports: {}
};

var exports = module.exports;

module.exports = Rule.makeRule({
    name: "math-text-empty",
    severity: Rule.Severity.WARNING,
    selector: "math, blockMath",
    pattern: /\\text{\s*}/,
    message: "Empty \\text{} block in math expression",
});
export default module.exports;
