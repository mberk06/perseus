import _widgetsExpressionEditorJsx from "./widgets/expression-editor.jsx";
import _widgetsExpressionJsx from "./widgets/expression.jsx";
import _widgetsNumericInputEditorJsx from "./widgets/numeric-input-editor.jsx";
import _widgetsNumericInputJsx from "./widgets/numeric-input.jsx";
import _widgetsInputNumberEditorJsx from "./widgets/input-number-editor.jsx";
import _widgetsInputNumberJsx from "./widgets/input-number.jsx";
import _widgetsRadioEditorJsx from "./widgets/radio/editor.jsx";
import _widgetsRadioJsx from "./widgets/radio.jsx";

var module = {
    exports: {}
};

var exports = module.exports;
/* globals __EDITOR__ */

// As new widgets get added here, please also make sure they get added in
// webapp perseus/traversal.py so they can be properly translated.
module.exports = [
    __EDITOR__ = _widgetsRadioEditorJsx,
    __EDITOR__ = _widgetsInputNumberEditorJsx,
    __EDITOR__ = _widgetsNumericInputEditorJsx,
    __EDITOR__ = _widgetsExpressionEditorJsx,
];
export default module.exports;
