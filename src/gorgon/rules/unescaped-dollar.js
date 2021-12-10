import Rule from "../rule.js";

var module = {
    exports: {}
};

var exports = module.exports;

module.exports = Rule.makeRule({
    name: "unescaped-dollar",
    severity: Rule.Severity.ERROR,
    selector: "unescapedDollar",
    message: `Unescaped dollar sign:
Dollar signs must appear in pairs or be escaped as \\$`,
});
export default module.exports;
