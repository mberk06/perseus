import _multiItemsShapesJs from "./multi-items/shapes.js";
import { buildPropTypeForShape } from "./multi-items/prop-type-builders.js";
import _multiItemsMultiRendererJsx from "./multi-items/multi-renderer.jsx";

import {
    buildEmptyItemForShape,
    findContentNodesInItem,
    findHintNodesInItem,
    inferItemShape,
} from "./multi-items/items.js";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;
const MultiRenderer = _multiItemsMultiRendererJsx;
const shapes = _multiItemsShapesJs;

export {
    // Tools for rendering your multi-items
    MultiRenderer,

    // Tools for declaring your multi-item shapes
    shapes,
    buildPropTypeForShape,

    // Tools for generically manipulating multi-items
    buildEmptyItemForShape,
    findContentNodesInItem,
    findHintNodesInItem,
    inferItemShape,
};
export default {
    // Tools for rendering your multi-items
    MultiRenderer,

    // Tools for declaring your multi-item shapes
    shapes,
    buildPropTypeForShape,

    // Tools for generically manipulating multi-items
    buildEmptyItemForShape,
    findContentNodesInItem,
    findHintNodesInItem,
    inferItemShape,
};
