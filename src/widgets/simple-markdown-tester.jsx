import _perseusMarkdownJsx from "../perseus-markdown.jsx";
import _mixinsChangeableJsx from "../mixins/changeable.jsx";
import _underscore from "underscore";
import _react from "react";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;
/* eslint-disable comma-dangle, no-var, react/sort-comp */
/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var React = _react;
var _ = _underscore;

var Changeable = _mixinsChangeableJsx;

var PerseusMarkdown = _perseusMarkdownJsx;
var mdParse = PerseusMarkdown.parse;
var mdOutput = PerseusMarkdown.basicOutput;

var SimpleMarkdownTester = createReactClass({
    propTypes: {
        ...Changeable.propTypes,
        value: PropTypes.string,
    },

    getDefaultProps: function() {
        return {
            value: "",
        };
    },

    change(...args) {
        return Changeable.change.apply(this, args);
    },

    toJSON: function() {
        return {};
    },

    render: function() {
        var parsed = mdParse(this.props.value);
        var output = mdOutput(parsed);
        return (
            <div>
                {output}
            </div>
        );
    },

    /**
     * Widgets that are focusable should add a focus method that returns
     * true if focusing succeeded. The first such widget found will be
     * focused on page load.
     */
    focus: function() {
        this.refs.input.focus();
        return true;
    },

    /**
     * simpleValidate is called for grading. Rubric is the result of calling
     * toJSON() on the editor that created this widget.
     *
     * Should return an object representing the grading result, such as
     * {
     *     type: "points",
     *     earned: 1,
     *     total: 1,
     *     message: null
     * }
     */
    simpleValidate: function(rubric) {
        return SimpleMarkdownTester.validate(this.toJSON(), rubric);
    },
});

/**
 * This is the widget's grading function
 */
_.extend(SimpleMarkdownTester, {
    /**
     * simpleValidate generally defers to this function
     *
     * state is usually the result of toJSON on the widget
     * rubric is the result of calling toJSON() on the editor
     */
    validate: function(state, rubric) {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null,
        };
    },
});

/**
 * For this widget to work, we must require() this file in src/all-widgets.js
 */
_module_.exports = {
    name: "simple-markdown-tester",
    displayName: "Simple Markdown Tester",
    hidden: true, // Hides this widget from the Perseus.Editor widget select
    widget: SimpleMarkdownTester,
    transform: _.identity,
};
export default _module_.exports;
