import _exampleGraphieWidgetJsx from "./example-graphie-widget.jsx";
import _mixinsEditorJsonifyJsx from "../mixins/editor-jsonify.jsx";
import _mixinsChangeableJsx from "../mixins/changeable.jsx";
import _react from "react";

var module = {
    exports: {}
};

var exports = module.exports;
/* eslint-disable comma-dangle, no-var, react/sort-comp */
/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var React = _react;

var Changeable = _mixinsChangeableJsx;
var EditorJsonify = _mixinsEditorJsonifyJsx;

var ExampleGraphieWidget = _exampleGraphieWidgetJsx.widget;

/**
 * This is the widget's editor. This is what shows up on the left side
 * of the screen in the demo page. Only the question writer sees this.
 */
var ExampleGraphieWidgetEditor = React.createClass({
    propTypes: {
        ...Changeable.propTypes,
    },

    getDefaultProps: function() {
        return {
            correct: [4, 4],
            graph: {
                box: [340, 340],
                labels: ["x", "y"],
                range: [[-10, 10], [-10, 10]],
                step: [1, 1],
                gridStep: [1, 1],
                valid: true,
                backgroundImage: null,
                markings: "grid",
                showProtractor: false,
            },
        };
    },

    render: function() {
        return (
            <div>
                <ExampleGraphieWidget
                    graph={this.props.graph}
                    coord={this.props.correct}
                    onChange={this.handleChange}
                    apiOptions={this.props.apiOptions}
                />
            </div>
        );
    },

    change(...args) {
        return Changeable.change.apply(this, args);
    },

    handleChange: function(newProps) {
        if (newProps.coord) {
            this.change({
                correct: newProps.coord,
            });
        }
    },

    serialize() {
        return EditorJsonify.serialize.call(this);
    },
});

module.exports = ExampleGraphieWidgetEditor;
export default module.exports;
