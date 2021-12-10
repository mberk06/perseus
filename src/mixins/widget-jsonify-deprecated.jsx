import _underscore from "underscore";
import _widgetPropBlacklistJsx from "./widget-prop-blacklist.jsx";

var module = {
    exports: {}
};

var exports = module.exports;
/* eslint-disable comma-dangle, no-var */
/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

/* Free implementation of getUserInput. This should be used sparingly, since it
 * just returns all the widget's props rather than picking out those which were
 * input by the user.
 */
var WIDGET_PROP_BLACKLIST = _widgetPropBlacklistJsx;
const _ = _underscore;

var WidgetJsonifyDeprecated = {
    getUserInput: function() {
        // Omit props that get passed to all widgets
        return _.omit(this.props, WIDGET_PROP_BLACKLIST);
    }
};

module.exports = WidgetJsonifyDeprecated;
export default module.exports;
