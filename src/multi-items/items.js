import _shapesJs from "./shapes.js";
import { buildMapper } from "./trees.js";

var module = {
    exports: {}
};

var exports = module.exports;
const shapes = _shapesJs;

/**
 * Return a semantically empty ItemTree that conforms to the given shape.
 *
 * - An empty content node has an empty content string and no widgets/images.
 * - An empty hint node has an empty content string and no widgets/images.
 * - An empty array node has no elements.
 * - An empty object node has a semantically empty node for each of its keys.
 *   (That is, we recursively call buildEmptyItemTreeForShape for each key.)
 */
function buildEmptyItemTreeForShape(shape) {
    if (shape.type === "content") {
        return {
            "__type": "content",
            "content": "",
            "images": {},
            "widgets": {},
        };
    } else if (shape.type === "hint") {
        return {
            "__type": "hint",
            "replace": false,
            "content": "",
            "images": {},
            "widgets": {},
        };
    } else if (shape.type === "tags") {
        return [];
    } else if (shape.type === "array") {
        return [];
    } else if (shape.type === "object") {
        const valueShapes = shape.shape;
        const object = {};
        Object.keys(valueShapes).forEach(key => {
            object[key] = buildEmptyItemTreeForShape(valueShapes[key]);
        });
        return object;
    } else {
        throw new Error(`unexpected shape type ${shape.type}`);
    }
}

/**
 * Return a semantically empty Item that conforms to the given shape.
 *
 * - An empty content node has an empty content string and no widgets/images.
 * - An empty hint node has an empty content string and no widgets/images.
 * - An empty array node has no elements.
 * - An empty object node has a semantically empty node for each of its keys.
 *   (That is, we recursively call buildEmptyItemTreeForShape for each key.)
 */
function buildEmptyItemForShape(shape) {
    return treeToItem(buildEmptyItemTreeForShape(shape));
}

/**
 * Given an Item and its Shape, yield all of its content nodes to the callback.
 */
function findContentNodesInItem(item, shape, callback) {
    const itemTree = itemToTree(item);
    buildMapper()
        .setContentMapper(callback)
        .mapTree(itemTree, shape);
}

/**
 * Given an Item and its Shape, yield all of its hint nodes to the callback.
 */
function findHintNodesInItem(item, shape, callback) {
    const itemTree = itemToTree(item);
    buildMapper()
        .setHintMapper(callback)
        .mapTree(itemTree, shape);
}

/**
 * Given an ItemTree, return a Shape that it conforms to.
 *
 * The Shape might not be complete or correct Shape that this Item was designed
 * for. If you have access to the intended Shape, use that instead.
 */
function inferItemShape(item) {
    const itemTree = itemToTree(item);
    return inferItemTreeShape(itemTree);
}

function inferItemTreeShape(node) {
    if (Array.isArray(node)) {
        if (node.length) {
            if (typeof node[0] === "string") {
                // There's no ItemTree that can manifest as a string.
                // So, an array of strings must be a TagsNode, not ArrayNode.
                return shapes.tags;
            } else {
                // Otherwise, assume that this is a valid ArrayNode, and
                // therefore the shape of the first element applies to all
                // elements in the array.
                return shapes.arrayOf(inferItemTreeShape(node[0]));
            }
        } else {
            // The array is empty, so we arbitrarily guess that it's a content
            // array. As discussed in the docstring, this might be incorrect,
            // and you shouldn't depend on it.
            return shapes.arrayOf(shapes.content);
        }
    } else if (
        // TODO(mdr): Remove #LegacyContentNode support.
        typeof node === "object" &&
        (node.__type === "content" || node.__type === "item")
    ) {
        return shapes.content;
    } else if (typeof node === "object" && node.__type === "hint") {
        return shapes.hint;
    } else if (typeof node === "object") {
        const valueShapes = {};
        Object.keys(node).forEach(key => {
            // $FlowFixMe: Not sure why this property deref is an error.
            valueShapes[key] = inferItemTreeShape(node[key]);
        });
        return shapes.shape(valueShapes);
    } else {
        throw new Error(`unexpected multi-item node ${JSON.stringify(node)}`);
    }
}

/**
 * Convert the given ItemTree to an Item, by wrapping it in the `_multi` key.
 */
function itemToTree(item) {
    return item._multi;
}

/**
 * Convert the given Item to an ItemTree, by unwrapping the `_multi` key.
 */
function treeToItem(node) {
    return {_multi: node};
}

module.exports = {
    buildEmptyItemTreeForShape,
    buildEmptyItemForShape,
    findContentNodesInItem,
    findHintNodesInItem,
    inferItemShape,
    itemToTree,
    treeToItem,
};
export default module.exports;
