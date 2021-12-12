import Rule from "../rule.js";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;

_module_.exports = Rule.makeRule({
    name: "image-in-table",
    severity: Rule.Severity.BULK_WARNING,
    selector: "table image",
    message: `Image in table:
do not put images inside of tables.`,
});
export default _module_.exports;
