import _jiptHackJsx from "./jipt-hack.jsx";
import _gorgonGorgonJs from "./gorgon/gorgon.js";
import _multirendererEditorJsx from "./multirenderer-editor.jsx";
import _iframeContentRendererJsx from "./iframe-content-renderer.jsx";
import _editorPageJsx from "./editor-page.jsx";
import _editorJsx from "./editor.jsx";
import _articleEditorJsx from "./article-editor.jsx";
import _i18nJsx from "./i18n.jsx";
import _a11yJs from "./a11y.js";
import _renderabilityJsx from "./renderability.jsx";
import _componentsDeviceFramerJsx from "./components/device-framer.jsx";
import _componentsViewportResizerJsx from "./components/viewport-resizer.jsx";
import _utilJs from "./util.js";
import _perseusApiJsx from "./perseus-api.jsx";
import _statefulEditorPageJsx from "./stateful-editor-page.jsx";
import _statefulArticleEditorJsx from "./stateful-article-editor.jsx";
import _diffsArticleDiffJsx from "./diffs/article-diff.jsx";
import _diffsItemDiffJsx from "./diffs/item-diff.jsx";
import _itemVersion from "./item-version";
import _perseusJs from "./perseus.js";

var module = {
    exports: {}
};

var exports = module.exports;
const Perseus = _perseusJs;

module.exports = {
    itemVersion: _itemVersion,
    ItemDiff: _diffsItemDiffJsx,
    ArticleDiff: _diffsArticleDiffJsx,
    StatefulArticleEditor: _statefulArticleEditorJsx,
    StatefulEditorPage: _statefulEditorPageJsx,
    ClassNames: _perseusApiJsx.ClassNames,
    Util: _utilJs,
    ViewportResizer: _componentsViewportResizerJsx,
    DeviceFramer: _componentsDeviceFramerJsx,
    renderability: _renderabilityJsx,
    accessibility: _a11yJs,
    i18n: _i18nJsx,
    ArticleEditor: _articleEditorJsx,
    Editor: _editorJsx,
    EditorPage: _editorPageJsx,
    IframeContentRenderer: _iframeContentRendererJsx,
    MultiRendererEditor: _multirendererEditorJsx,
    Gorgon: _gorgonGorgonJs,
    JiptHack: _jiptHackJsx,
    ...Perseus,
};
export default module.exports;
