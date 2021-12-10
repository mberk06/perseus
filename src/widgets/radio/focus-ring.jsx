// @flow

/**
 * Renders a circular selection ring around the child.
 */

const React = require("react");
const {StyleSheet, css} = require("aphrodite");

const styleConstants = require("../../styles/constants.js");

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

module.exports = FocusRing;
