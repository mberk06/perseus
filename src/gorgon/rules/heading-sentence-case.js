import Rule from "../rule.js";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;

_module_.exports = Rule.makeRule({
    name: "heading-sentence-case",
    severity: Rule.Severity.GUIDELINE,
    selector: "heading",
    pattern: /^\W*[a-z]/, // first letter is lowercase
    message: `First letter is lowercase:
the first letter of a heading should be capitalized.`,
});
export default _module_.exports;
