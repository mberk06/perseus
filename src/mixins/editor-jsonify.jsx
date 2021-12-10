import _widgetPropBlacklistJsx from "./widget-prop-blacklist.jsx";
import _underscore from "underscore";

var module = {
    exports: {}
};

var exports = module.exports;
/* eslint-disable comma-dangle, no-var */
/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var _ = _underscore;

var WIDGET_PROP_BLACKLIST = _widgetPropBlacklistJsx;

var EditorJsonify = {
    serialize: function() {
        // Omit props that get passed to all widgets
        return _.omit(this.props, WIDGET_PROP_BLACKLIST);
    }
};

module.exports = EditorJsonify;
export default module.exports;
