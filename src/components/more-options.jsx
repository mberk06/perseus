import _inlineIconJsx from "./inline-icon.jsx";
import { iconChevronDown, iconChevronUp } from "../icon-paths.js";
import _react from "react";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;
/* eslint-disable react/prop-types, react/sort-comp */

/* A div that shows/hides its children.
 * (meant for use with editor widgets)
 */
const React = _react;

const InlineIcon = _inlineIconJsx;

const MoreOptions = createReactClass({
    getDefaultProps: function() {
        return {
            show: false,
        };
    },

    getInitialState: function() {
        return {
            show: this.props.show,
        };
    },

    render: function() {
        return (
            <div className="more-options-container">
                {this.state.show && this.props.children}
                <div className="more-options-title" onClick={this.toggle}>
                    {this.state.show
                        ? <span>
                              <InlineIcon {...iconChevronUp} /> Less
                          </span>
                        : <span>
                              <InlineIcon {...iconChevronDown} /> More
                          </span>}{" "}
                    Options...
                </div>
            </div>
        );
    },

    toggle: function() {
        this.setState({show: !this.state.show});
    },
});

_module_.exports = MoreOptions;
export default _module_.exports;
