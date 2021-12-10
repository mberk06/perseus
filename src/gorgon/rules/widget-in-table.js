import Rule from "../rule.js";

var module = {
    exports: {}
};

var exports = module.exports;

module.exports = Rule.makeRule({
    name: "widget-in-table",
    severity: Rule.Severity.BULK_WARNING,
    selector: "table widget",
    message: `Widget in table:
do not put widgets inside of tables.`,
});
export default module.exports;
