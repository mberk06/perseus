import Rule from "../rule.js";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;

_module_.exports = Rule.makeRule({
    name: "extra-content-spacing",
    selector: "paragraph",
    pattern: /\s+$/,
    applies: function(context) {
        return context.contentType === 'article';
    },
    message: `No extra whitespace at the end of content blocks.`,
});
export default _module_.exports;
