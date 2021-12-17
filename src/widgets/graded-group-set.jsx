import { linterContextProps, linterContextDefault } from "../gorgon/proptypes.js";

import {
    grayLight,
    gray76,
    tableBackgroundAccent,
    kaGreen,
    phoneMargin,
    negativePhoneMargin,
} from "../styles/constants.js";

import _gradedGroupJsx from "./graded-group.jsx";
import _mixinsChangeableJsx from "../mixins/changeable.jsx";
import _perseusApiJsx from "../perseus-api.jsx";
import { StyleSheet, css } from "aphrodite";
import _underscore from "underscore";
import _react from "react";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;
/* eslint-disable react/forbid-prop-types */
/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* To fix, remove an entry above, run ka-lint, and fix errors. */
const React = _react;
const _ = _underscore;

const ApiOptions = _perseusApiJsx.Options;
const Changeable = _mixinsChangeableJsx;
const GradedGroup = _gradedGroupJsx.widget;

const Indicators = createReactClass({
    propTypes: {
        currentGroup: PropTypes.number.isRequired,
        numGroups: PropTypes.number.isRequired,
        onChangeCurrentGroup: PropTypes.func.isRequired,
    },
    render() {
        const items = [];
        for (let i = 0; i < this.props.numGroups; i++) {
            items.push(
                <div
                    key={i}
                    className={css(
                        styles.indicator,
                        i === this.props.currentGroup &&
                            styles.selectedIndicator
                    )}
                    onClick={() => this.props.onChangeCurrentGroup(i)}
                />
            );
        }
        return (
            <div className={css(styles.indicatorContainer)}>
                {items}
            </div>
        );
    },
});

// TODO(jared): find a better name for this :) and for GradedGroup; the names
// are currently a little confusing.
const GradedGroupSet = createReactClass({
    propTypes: {
        ...Changeable.propTypes,
        apiOptions: ApiOptions.propTypes,
        gradedGroups: PropTypes.array,
        trackInteraction: PropTypes.func.isRequired,
        linterContext: linterContextProps,
    },

    getDefaultProps() {
        return {
            gradedGroups: [],
            linterContext: linterContextDefault,
        };
    },

    getInitialState() {
        return {
            currentGroup: 0,
        };
    },

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state;
    },

    change(...args) {
        return Changeable.change.apply(this, args);
    },

    // Mobile API
    getInputPaths() {
        return this._childGroup.getInputPaths();
    },

    setInputValue(path, newValue, cb) {
        return this._childGroup.setInputValue(path, newValue, cb);
    },

    getAcceptableFormatsForInputPath(path) {
        return this._childGroup.getAcceptableFormatsForInputPath(path);
    },

    focus() {
        return this._childGroup.focus();
    },

    focusInputPath(path) {
        this._childGroup.focusInputPath(path);
    },

    blurInputPath(path) {
        this._childGroup.blurInputPath(path);
    },

    handleNextQuestion() {
        const {currentGroup} = this.state;
        const numGroups = this.props.gradedGroups.length;

        if (currentGroup < numGroups - 1) {
            this.setState({currentGroup: currentGroup + 1});
        }
    },

    render() {
        const currentGroup = this.props.gradedGroups[this.state.currentGroup];
        if (!currentGroup) {
            return <span>No current group...</span>;
        }

        const numGroups = this.props.gradedGroups.length;
        const handleNextQuestion =
            this.state.currentGroup < numGroups - 1
                ? this.handleNextQuestion
                : null;

        return (
            <div className={css(styles.container)}>
                <div className={css(styles.top)}>
                    <div className={css(styles.title)}>
                        {currentGroup.title}
                    </div>
                    <div className={css(styles.spacer)} />
                    <Indicators
                        numGroups={numGroups}
                        currentGroup={this.state.currentGroup}
                        onChangeCurrentGroup={currentGroup => this.setState({currentGroup})}
                    />
                </div>
                <GradedGroup
                    key={this.state.currentGroup}
                    ref={comp => this._childGroup = comp}
                    {...this.props}
                    {...currentGroup}
                    inGradedGroupSet={true}
                    title={null}
                    onNextQuestion={handleNextQuestion}
                    linterContext={this.props.linterContext}
                />
            </div>
        );
    },
});

const traverseChildWidgets = function(props, traverseRenderer) {
    // NOTE(jared): I have no idea how this works
    return {
        groups: props.gradedGroups.map(traverseRenderer),
    };
};

_module_.exports = {
    name: "graded-group-set",
    displayName: "Graded group set (articles only)",
    widget: GradedGroupSet,
    traverseChildWidgets: traverseChildWidgets,
    // TODO(michaelpolyak): This widget should be available for articles only
    hidden: false,
    tracking: "all",
    isLintable: true,
};

const styles = StyleSheet.create({
    top: {
        display: "flex",
        flexDirection: "row",
    },
    spacer: {
        flex: 1,
    },

    title: {
        fontSize: 12,
        color: gray76,
        textTransform: "uppercase",
        marginBottom: 11,
        letterSpacing: 0.8,
    },

    indicatorContainer: {
        display: "flex",
        flexDirection: "row",
    },

    indicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: grayLight,
        marginLeft: 5,
        cursor: "pointer",
    },

    selectedIndicator: {
        backgroundColor: kaGreen,
    },

    container: {
        borderTop: `1px solid ${gray76}`,
        borderBottom: `1px solid ${gray76}`,
        backgroundColor: tableBackgroundAccent,
        marginLeft: negativePhoneMargin,
        marginRight: negativePhoneMargin,
        paddingBottom: phoneMargin,
        paddingLeft: phoneMargin,
        paddingRight: phoneMargin,
        paddingTop: 10,
        width: "auto",
    },
});
export default _module_.exports;
