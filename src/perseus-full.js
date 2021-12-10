import _perseusJs from "./perseus.js";

var module = {
 exports: {}
};

var exports = module.exports;
/**
 * For clients that want the full perseus bundle, we always load the extra
 * widgets.
 */
module.exports = _perseusJs;
module.exports.init({loadExtraWidgets: true, skipMathJax: true});
export default module.exports;
