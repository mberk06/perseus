import Rule from "../rule.js";

var module = {
    exports: {}
};

var exports = module.exports;

module.exports = Rule.makeRule({
    name: "heading-sentence-case",
    severity: Rule.Severity.GUIDELINE,
    selector: "heading",
    pattern: /^\W*[a-z]/, // first letter is lowercase
    message: `First letter is lowercase:
the first letter of a heading should be capitalized.`,
});
export default module.exports;
