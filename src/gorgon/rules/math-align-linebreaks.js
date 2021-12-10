import Rule from "../rule.js";

var module = {
    exports: {}
};

var exports = module.exports;

module.exports = Rule.makeRule({
    name: "math-align-linebreaks",
    severity: Rule.Severity.WARNING,
    selector: "blockMath",
    pattern: /\\begin{align}.*[^\\](\\{2,3}[^\\]|\\{5,}).*\\end{align}/,
    message: "Use four backslashes between lines of an align block",
});
export default module.exports;
