import Rule from "../rule.js";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;

_module_.exports = Rule.makeRule({
    name: "link-click-here",
    severity: Rule.Severity.WARNING,
    selector: "link",
    pattern: /click here/i,
    message: `Inappropriate link text:
Do not use the words "click here" in links.`,
});
export default _module_.exports;
