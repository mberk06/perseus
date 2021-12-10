import _mixinsEditorJsonifyJsx from "../mixins/editor-jsonify.jsx";
import _mixinsChangeableJsx from "../mixins/changeable.jsx";
import _react from "react";

var module = {
    exports: {}
};

var exports = module.exports;
/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/prop-types, react/sort-comp */
/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

/**
 * This is the editor for the simple-markdown-tester widget. This is what shows
 * up on the left side of the screen in the demo. Only the question writer
 * sees this.
 */
var React = _react;

var Changeable = _mixinsChangeableJsx;
var EditorJsonify = _mixinsEditorJsonifyJsx;

var TextArea = React.createClass({
    render: function() {
        return (
            <textarea
                ref="input"
                value={this.props.value || ""}
                onChange={this.changeValue}
            />
        );
    },

    focus: function() {
        this.refs.input.focus();
        return true;
    },

    changeValue: function(e) {
        // Translating from the js event e to the value
        // of the textbox to send to onChange
        this.props.onChange(e.target.value);
    },
});

var SimpleMarkdownTesterEditor = React.createClass({
    propTypes: {
        ...Changeable.propTypes,
    },

    getDefaultProps: function() {
        return {
            value: "",
        };
    },

    render: function() {
        return (
            <div>
                <label>
                    <div>Simple markdown contents:</div>
                    <div>
                        <TextArea
                            value={this.props.value}
                            onChange={this.change("value")}
                            ref="input"
                        />
                    </div>
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

module.exports = SimpleMarkdownTesterEditor;
export default module.exports;
