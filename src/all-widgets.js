import _extraWidgetsJs from "./extra-widgets.js";
import _basicWidgetsJs from "./basic-widgets.js";

var module = {
  exports: {}
};

var exports = module.exports;
const basicWidgets = _basicWidgetsJs;
const extraWidgets = _extraWidgetsJs;

module.exports = basicWidgets.concat(extraWidgets);
export default module.exports;
