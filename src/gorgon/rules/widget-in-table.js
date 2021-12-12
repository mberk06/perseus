import Rule from "../rule.js";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;

_module_.exports = Rule.makeRule({
    name: "widget-in-table",
    severity: Rule.Severity.BULK_WARNING,
    selector: "table widget",
    message: `Widget in table:
do not put widgets inside of tables.`,
});
export default _module_.exports;
