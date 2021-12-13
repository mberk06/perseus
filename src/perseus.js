// TODO(aria): fix up code to not depend on these
import "./perseus-globals"; // side effects

import _multiItemsJs from "./multi-items.js";
import _rendererJsx from "./renderer.jsx";
import _hintsRendererJsx from "./hints-renderer.jsx";
import _serverItemRendererJsx from "./server-item-renderer.jsx";
import _itemRendererJsx from "./item-renderer.jsx";
import _questionRendererJsx from "./question-renderer.jsx";
import _articleRendererJsx from "./article-renderer.jsx";
import _initJs from "./init.js";
import initialWidgets from "./all-widgets.js";
import Widgets from "./widgets.js";
import _versionJson from "./version.json";

/**
 * Main entry point
 */
const version = _versionJson;

// TODO(aria): This registers all widgets for now, but we could go back to only
// registering basic widgets
Widgets.registerMany(initialWidgets);

export const apiVersion = version.apiVersion;
export const itemDataVersion = version.itemDataVersion;
export const init = _initJs;
export const ArticleRenderer = _articleRendererJsx;
export const QuestionRenderer = _questionRendererJsx;
export const ItemRenderer = _itemRendererJsx;
export const ServerItemRenderer = _serverItemRendererJsx;
export const HintsRenderer = _hintsRendererJsx;
export const Renderer = _rendererJsx;
export const MultiItems = _multiItemsJs;

export default {
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
