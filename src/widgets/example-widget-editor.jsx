import _mixinsEditorJsonifyJsx from "../mixins/editor-jsonify.jsx";
import _mixinsChangeableJsx from "../mixins/changeable.jsx";
import _react from "react";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;
/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/sort-comp */
/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var React = _react;

var Changeable = _mixinsChangeableJsx;
var EditorJsonify = _mixinsEditorJsonifyJsx;

/**
 * This is the widget's editor. This is what shows up on the left side
 * of the screen in the demo. Only the question writer sees this.
 */
var ExampleWidgetEditor = createReactClass({
    propTypes: {
        ...Changeable.propTypes,
    },

    getDefaultProps: function() {
        return {
            correct: "",
        };
    },

    handleAnswerChange: function(event) {
        this.change({
            correct: event.target.value,
        });
    },

    render: function() {
        return (
            <div>
                <label>
                    Correct answer:
                    <input
                        value={this.props.correct}
                        onChange={this.handleAnswerChange}
                        ref="input"
                    />
                </label>
            </div>
        );
    },

    change(...args) {
        return Changeable.change.apply(this, args);
    },

    focus: function() {
        this.refs.input.focus();
        return true;
    },

    serialize() {
        return EditorJsonify.serialize.call(this);
    },
});

_module_.exports = ExampleWidgetEditor;
export default _module_.exports;
