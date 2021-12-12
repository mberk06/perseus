import _perseusJs from "./perseus.js";

var _module_ = {
 exports: {}
};

var exports = _module_.exports;
/**
 * For clients that want the full perseus bundle, we always load the extra
 * widgets.
 */
_module_.exports = _perseusJs;
_module_.exports.init({loadExtraWidgets: true, skipMathJax: true});
export default _module_.exports;
