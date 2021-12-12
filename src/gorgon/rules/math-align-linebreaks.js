import Rule from "../rule.js";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;

_module_.exports = Rule.makeRule({
    name: "math-align-linebreaks",
    severity: Rule.Severity.WARNING,
    selector: "blockMath",
    pattern: /\\begin{align}.*[^\\](\\{2,3}[^\\]|\\{5,}).*\\end{align}/,
    message: "Use four backslashes between lines of an align block",
});
export default _module_.exports;
