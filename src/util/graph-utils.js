import _interactiveJs from "./interactive.js";
import _graphieJs from "./graphie.js";

var module = {
 exports: {}
};

var exports = module.exports;
/**
 * A wrapper around graphie.js and interactive.js to make sure interactive.js
 * is always required at the same time as graphie.js. This is because
 * interactive.js has side effects that are hard to see (it adds things to
 * `Graphie.prototype`), so someone might forget to require interactive.js.
 *
 * To use the utilities exported from interactive.js, require that file
 * itself.
 */
const GraphUtils = _graphieJs;
_interactiveJs; // For side effects

module.exports = GraphUtils;
export default module.exports;
