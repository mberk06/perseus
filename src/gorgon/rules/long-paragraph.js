import Rule from "../rule.js";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;

_module_.exports = Rule.makeRule({
    name: "long-paragraph",
    severity: Rule.Severity.GUIDELINE,
    selector: "paragraph",
    pattern: /^.{501,}/,
    lint: function(state, content, nodes, match) {
        return `Paragraph too long:
This paragraph is ${content.length} characters long.
Shorten it to 500 characters or fewer.`;
    },
});
export default _module_.exports;
