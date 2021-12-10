import _reactComponentsInfoTipJsx from "react-components/info-tip.jsx";
import _react from "react";

var module = {
    exports: {}
};

var exports = module.exports;
/**
 * A wrapper around react-components/info-tip.jsx that can be rendered on the
 * server without causing a checksum mismatch on the client.
 * (RCSS generates classnames with a randomSuffix, which ensures that any
 * two sets of generated classnames will not match.)
 */

const React = _react;

const ReactComponentsInfoTip = _reactComponentsInfoTipJsx;

const InfoTip = React.createClass({
    getInitialState: function() {
        return {
            didMount: false,
        };
    },

    componentDidMount: function() {
        /* eslint-disable react/no-did-mount-set-state */
        this.setState({didMount: true});
        /* eslint-enable react/no-did-mount-set-state */
    },

    render: function() {
        if (this.state.didMount) {
            return <ReactComponentsInfoTip {...this.props} />;
        } else {
            return <div />;
        }
    },
});

module.exports = InfoTip;
export default module.exports;
