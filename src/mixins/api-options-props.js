import _perseusApiJsx from "../perseus-api.jsx";
import _react from "react";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;
/**
 * A mixin that accepts the `apiOptions` prop, and populates any missing values
 * with defaults.
 */
const React = _react;

const ApiOptions = _perseusApiJsx.Options;

const ApiOptionsProps = {
    propTypes: {
        // TODO(mdr): Should this actually be objectOf(any)?
        apiOptions: React.PropTypes.any,
    },

    getDefaultProps() {
        return {apiOptions: {}};
    },

    getApiOptions() {
        return {
            ...ApiOptions.defaults,
            ...this.props.apiOptions,
        };
    },
};

_module_.exports = ApiOptionsProps;
export default _module_.exports;
