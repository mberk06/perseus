import _perseusApiJsx from "../perseus-api.jsx";
import _react from "react";

var module = {
    exports: {}
};

var exports = module.exports;
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

module.exports = ApiOptionsProps;
export default module.exports;
