import Rule from "../rule.js";

var module = {
    exports: {}
};

var exports = module.exports;

module.exports = Rule.makeRule({
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
export default module.exports;
