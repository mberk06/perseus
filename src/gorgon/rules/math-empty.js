import Rule from "../rule.js";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;

_module_.exports = Rule.makeRule({
    name: "math-empty",
    severity: Rule.Severity.WARNING,
    selector: "math, blockMath",
    pattern: /^$/,
    message: "Empty math: don't use $$ in your markdown.",
});
export default _module_.exports;
