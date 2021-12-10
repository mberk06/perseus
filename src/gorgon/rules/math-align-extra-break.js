import Rule from "../rule.js";

var module = {
    exports: {}
};

var exports = module.exports;

module.exports = Rule.makeRule({
    name: "math-align-extra-break",
    severity: Rule.Severity.WARNING,
    selector: "blockMath",
    pattern: /(\\{2,})\s*\\end{align}/,
    message: `Extra space at end of block:
Don't end an align block with backslashes`,
});
export default module.exports;
