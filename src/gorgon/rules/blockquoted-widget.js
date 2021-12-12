import Rule from "../rule.js";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;

_module_.exports = Rule.makeRule({
    name: "blockquoted-widget",
    severity: Rule.Severity.WARNING,
    selector: "blockQuote widget",
    message: `Blockquoted widget:
widgets should not be indented.`,
});
export default _module_.exports;
