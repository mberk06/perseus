import * as styleConstants from "../../styles/constants.js";
import { StyleSheet, css } from "aphrodite";
import _react from "react";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;
// @flow

/**
 * Renders text indicating whether the choice was correct or
 * not and whether the choice was selected or not.
 * This information is redundant with that provided in the
 * ChoiceIcon visualizations but is meant to make the distinctions
 * between the states more immediately clear to users.
 */

/* globals i18n */

const React = _react;

class OptionStatus extends React.Component {
    render() {
        const {checked, correct} = this.props;
        const correctness = correct ? i18n._("correct") : i18n._("incorrect");
        const selectedness = checked ? i18n._("(selected)") : "";
        const text = `${correctness} ${selectedness}`;
        const textStyle = correct ? styles.correct : styles.incorrect;
        return <div className={css(styles.text, textStyle)}>
            {text}
        </div>;
    }
}

const styles = StyleSheet.create({
    text: {
        alignItems: "center",
        display: "flex",
        fontSize: 12,
        height: 32,
        textTransform: "uppercase",
    },
    correct: {
        color: styleConstants.kaGreen,
    },
    incorrect: {
        color: styleConstants.warning1,
    },
});

_module_.exports = OptionStatus;
export default _module_.exports;
