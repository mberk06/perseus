import _extraWidgetsJs from "./extra-widgets.js";
import _widgetsJs from "./widgets.js";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;
/**
 * This should be called by all clients, specifying whether extra widgets are
 * needed via `loadExtraWidgets`. It is idempotent, so it's not a problem to
 * call it multiple times.
 *
 * skipMathJax:
 *   if false/undefined, MathJax will be configured, and the
 *   promise will wait for MathJax to load (if it hasn't already).
 * loadExtraWidgets:
 *   if true, `extra-widgets` will be required. The client must have already
 *   loaded the file, either by using the full perseus bundle
 *   `/build/perseus.js`, or by loading `/build/perseus-extras.js` prior to
 *   calling `Perseus.init()`.
 */

const init = function(options) {
    // Pass skipMathJax: true if MathJax is already loaded and configured.
    const skipMathJax = options.skipMathJax;

    const widgetsDeferred = $.Deferred();

    // HACK(charlie): To maintain backwards compatibility, only exclude the
    // extra widgets if the parameter is explicitly falsey (rather than merely
    // undefined). We should probably bump the Perseus major version number
    // (since this is a breaking change in the API) but this is a more
    // lightweight fix that will get exercises working in our mobile apps
    // immediately.

    // TODO(aria): Re-enable extra-widgets

    //if (options.loadExtraWidgets === undefined || options.loadExtraWidgets) {
    //    const Widgets = _widgetsJs;
    //    require.ensure(
    //        [],
    //        require => {
    //            const extraWidgets = _extraWidgetsJs;
    //            Widgets.registerMany(extraWidgets);
    //            widgetsDeferred.resolve();
    //        },
    //        "extra-widgets"
    //    );
    //} else {
        widgetsDeferred.resolve();
    //}

    const mathJaxDeferred = $.Deferred();

    if (skipMathJax) {
        mathJaxDeferred.resolve();
    } else {
        MathJax.Hub.Config({
            messageStyle: "none",
            skipStartupTypeset: "none",
            "HTML-CSS": {
                availableFonts: ["TeX"],
                imageFont: null,
                scale: 100,
                showMathMenu: false,
            },
        });

        MathJax.Hub.Configured();
        MathJax.Hub.Queue(mathJaxDeferred.resolve);
    }

    return widgetsDeferred.then(() => mathJaxDeferred);
};

_module_.exports = init;
export default _module_.exports;
