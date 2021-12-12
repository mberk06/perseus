import Rule from "../rule.js";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;

_module_.exports = Rule.makeRule({
    name: "math-nested",
    severity: Rule.Severity.ERROR,
    selector: "math, blockMath",
    pattern: /\\text{[^$}]*\$[^$}]*\$[^}]*}/,
    message: `Nested math:
Don't nest math expressions inside \\text{} blocks`,
});
export default _module_.exports;
