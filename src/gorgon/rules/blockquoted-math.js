import Rule from "../rule.js";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;

_module_.exports = Rule.makeRule({
    name: "blockquoted-math",
    severity: Rule.Severity.WARNING,
    selector: "blockQuote math, blockQuote blockMath",
    message: `Blockquoted math:
math should not be indented.`,
});
export default _module_.exports;
