import Rule from "../rule.js";

var module = {
    exports: {}
};

var exports = module.exports;

module.exports = Rule.makeRule({
    name: "extra-content-spacing",
    selector: "paragraph",
    pattern: /\s+$/,
    applies: function(context) {
        return context.contentType === 'article';
    },
    message: `No extra whitespace at the end of content blocks.`,
});
export default module.exports;
