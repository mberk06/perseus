import _multiItemsJs from "./multi-items.js";
import _rendererJsx from "./renderer.jsx";
import _hintsRendererJsx from "./hints-renderer.jsx";
import _serverItemRendererJsx from "./server-item-renderer.jsx";
import _itemRendererJsx from "./item-renderer.jsx";
import _questionRendererJsx from "./question-renderer.jsx";
import _articleRendererJsx from "./article-renderer.jsx";
import _initJs from "./init.js";
import _basicWidgetsJs from "./basic-widgets.js";
import _widgetsJs from "./widgets.js";
import _versionJson from "./version.json";

var module = {
 exports: {}
};

var exports = module.exports;
/**
 * Main entry point
 */
const version = _versionJson;

const Widgets = _widgetsJs;
const basicWidgets = _basicWidgetsJs;
Widgets.registerMany(basicWidgets);

module.exports = {
    apiVersion: version.apiVersion,
    itemDataVersion: version.itemDataVersion,
    init: _initJs,
    ArticleRenderer: _articleRendererJsx,
    QuestionRenderer: _questionRendererJsx,
    ItemRenderer: _itemRendererJsx,
    ServerItemRenderer: _serverItemRendererJsx,
    HintsRenderer: _hintsRendererJsx,
    Renderer: _rendererJsx,
    MultiItems: _multiItemsJs,
};
export default module.exports;
