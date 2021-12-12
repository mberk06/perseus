import _widgetsJs from "./widgets.js";
import _traversalJsx from "./traversal.jsx";
import { findContentNodesInItem, inferItemShape } from "./multi-items.js";
import _underscore from "underscore";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;
/**
 * Identifies whether or not a given perseus item requires the use of a mouse
 * or screen, based on the widgets it contains.
 */

const _ = _underscore;

const Traversal = _traversalJsx;
const Widgets = _widgetsJs;

// Iterate over a single Perseus renderer, mutating `widgets` by appending
// violating widget types discovered in this item.
function traverseRenderer(itemData, widgets) {
    Traversal.traverseRendererDeep(itemData, null, function(info) {
        if (info.type && !Widgets.isAccessible(info)) {
            widgets.push(info.type);
        }
    });
}

_module_.exports = {
    // Returns a list of widgets that cause a given perseus item to require
    // the use of a screen or mouse.
    //
    // For now we'll just check the `accessible` field on each of the widgets
    // in the item data, but in the future we may specify accessibility on
    // each widget with higher granularity.
    violatingWidgets: function(itemData) {
        // TODO(jordan): Hints as well
        const widgets = [];

        if (itemData._multi) {
            const shape = inferItemShape(itemData);
            findContentNodesInItem(itemData, shape, content => traverseRenderer(content, widgets)
            );
        } else {
            traverseRenderer(itemData.question, widgets);
        }

        // Uniquify the list of widgets (by type)
        return _.uniq(widgets);
    },
};
export default _module_.exports;
