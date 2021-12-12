var _module_ = {
    exports: {}
};

var exports = _module_.exports;
/**
 * These tools allow you to construct arbirtary shapes, by combining simple
 * leaf shapes like `content` and `hint` into composite shapes like
 * `arrayOf(shape({question: content, hints: arrayOf(hint)}))`.
 */
const contentShape = {
    type: "content",
};
const hintShape = {
    type: "hint",
};
const tagsShape = {
    type: "tags",
};
const buildArrayShape = elementShape => ({
    type: "array",
    elementShape
});
const buildObjectShape = shape => ({
    type: "object",
    shape
});
const hintsShape = buildArrayShape(hintShape);


_module_.exports = {
    content: contentShape,
    hint: hintShape,
    hints: hintsShape,
    tags: tagsShape,
    arrayOf: buildArrayShape,
    shape: buildObjectShape,
};
export default _module_.exports;
