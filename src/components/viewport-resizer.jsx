import _inlineIconJsx from "./inline-icon.jsx";
import { iconDesktop, iconMobilePhone, iconTablet } from "../icon-paths.js";
import { devices } from "./constants.js";
import _reactComponentsButtonGroupJsx from "react-components/button-group.jsx";
import _react from "react";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;
/**
 * A component that displays controls for choosing a viewport size.
 * Renders three buttons: "Phone", "Tablet", and "Desktop".
 */

const React = _react;

const ButtonGroup = _reactComponentsButtonGroupJsx;

const InlineIcon = _inlineIconJsx;

const ViewportResizer = React.createClass({
    propTypes: {
        // The current device type that is selected.
        deviceType: React.PropTypes.string.isRequired,
        // A callback that is passed (width, height) as the dimensions of the
        // viewport to resize to.
        onViewportSizeChanged: React.PropTypes.func.isRequired,
    },

    handleChange: function(value) {
        this.props.onViewportSizeChanged(value);
    },

    render: function() {
        const phoneButtonContents = (
            <span>
                <InlineIcon {...iconMobilePhone} /> Phone
            </span>
        );
        const tabletButtonContents = (
            <span>
                <InlineIcon {...iconTablet} /> Tablet
            </span>
        );
        const desktopButtonContents = (
            <span>
                <InlineIcon {...iconDesktop} /> Desktop
            </span>
        );

        // TODO(david): Allow input of custom viewport sizes.
        return (
            <span className="viewport-resizer">
                Viewport:{" "}
                <ButtonGroup
                    value={this.props.deviceType}
                    allowEmpty={false}
                    buttons={[
                        {value: devices.PHONE, content: phoneButtonContents},
                        {value: devices.TABLET, content: tabletButtonContents},
                        {
                            value: devices.DESKTOP,
                            content: desktopButtonContents,
                        },
                    ]}
                    onChange={this.handleChange}
                />
            </span>
        );
    },
});

_module_.exports = ViewportResizer;
export default _module_.exports;
