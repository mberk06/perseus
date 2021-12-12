import _extraWidgetsJs from "./extra-widgets.js";
import _basicWidgetsJs from "./basic-widgets.js";

var _module_ = {
  exports: {}
};

var exports = _module_.exports;
const basicWidgets = _basicWidgetsJs;
const extraWidgets = _extraWidgetsJs;

_module_.exports = basicWidgets.concat(extraWidgets);
export default _module_.exports;
