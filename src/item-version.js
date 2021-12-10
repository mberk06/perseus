import _versionJson from "./version.json";
import _widgetsJs from "./widgets.js";
import _allWidgetsJs from "./all-widgets.js";

var module = {
  exports: {}
};

var exports = module.exports;
const allWidgets = _allWidgetsJs;
const Widgets = _widgetsJs;
const Version = _versionJson;

Widgets.registerMany(allWidgets);

const ItemVersion = Widgets.getVersionVector();
ItemVersion["::renderer::"] = Version.itemDataVersion;

module.exports = ItemVersion;
export default module.exports;
