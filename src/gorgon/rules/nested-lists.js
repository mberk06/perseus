import Rule from "../rule.js";

var module = {
    exports: {}
};

var exports = module.exports;

module.exports = Rule.makeRule({
    name: "nested-lists",
    severity: Rule.Severity.WARNING,
    selector: "list list",
    message: `Nested lists:
nested lists are hard to read on mobile devices;
do not use additional indentation.`,
});
export default module.exports;
