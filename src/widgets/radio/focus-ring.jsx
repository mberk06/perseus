import * as styleConstants from "../../styles/constants.js";
import { StyleSheet, css } from "aphrodite";
import _react from "react";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;
// @flow

/**
 * Renders a circular selection ring around the child.
 */

const React = _react;

class FocusRing extends React.Component {
    static defaultProps = {
        visible: true,
        color: styleConstants.kaGreen,
    }

    render() {
        const borderColor = this.props.visible
                          ? this.props.color
                          : "transparent";
        const style = {
            borderColor: borderColor,
        };
        return <span className={css(styles.ring)} style={style}>
            {this.props.children}
        </span>;
    }
}

const styles = StyleSheet.create({
    ring: {
        margin: "auto",
        display: "inline-block",
        borderRadius: "50%",
        borderWidth: 2,
        padding: 2,
        borderStyle: "solid",
    },
});

_module_.exports = FocusRing;
export default _module_.exports;
