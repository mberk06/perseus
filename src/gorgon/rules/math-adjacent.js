import Rule from "../rule.js";

var module = {
    exports: {}
};

var exports = module.exports;

module.exports = Rule.makeRule({
    name: "math-adjacent",
    severity: Rule.Severity.WARNING,
    selector: "blockMath+blockMath",
    message: `Adjacent math blocks:
combine the blocks between \\begin{align} and \\end{align}`,
});
export default module.exports;
