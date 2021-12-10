import Rule from "../rule.js";

var module = {
    exports: {}
};

var exports = module.exports;

module.exports = Rule.makeRule({
    name: "blockquoted-widget",
    severity: Rule.Severity.WARNING,
    selector: "blockQuote widget",
    message: `Blockquoted widget:
widgets should not be indented.`,
});
export default module.exports;
