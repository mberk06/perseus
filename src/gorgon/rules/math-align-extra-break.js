import Rule from "../rule.js";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;

_module_.exports = Rule.makeRule({
    name: "math-align-extra-break",
    severity: Rule.Severity.WARNING,
    selector: "blockMath",
    pattern: /(\\{2,})\s*\\end{align}/,
    message: `Extra space at end of block:
Don't end an align block with backslashes`,
});
export default _module_.exports;
