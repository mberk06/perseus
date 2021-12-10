import _componentsTextInputJsx from "../components/text-input.jsx";
import _editorJsx from "../editor.jsx";
import _mixinsEditorJsonifyJsx from "../mixins/editor-jsonify.jsx";
import _mixinsChangeableJsx from "../mixins/changeable.jsx";
import _underscore from "underscore";
import _react from "react";

var module = {
    exports: {}
};

var exports = module.exports;
/* eslint-disable no-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/sort-comp */
/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var React = _react;
var _ = _underscore;

var Changeable = _mixinsChangeableJsx;
var EditorJsonify = _mixinsEditorJsonifyJsx;

var Editor = _editorJsx;
var TextInput = _componentsTextInputJsx;

var defaultExplanationProps = {
    showPrompt: "Explain",
    hidePrompt: "Hide explanation",
    explanation: "explanation goes here\n\nmore explanation",
    widgets: {},
};

var ExplanationEditor = React.createClass({
    propTypes: {
        ...Changeable.propTypes,
        showPrompt: React.PropTypes.string,
        hidePrompt: React.PropTypes.string,
        explanation: React.PropTypes.string,
        widgets: React.PropTypes.object,
        apiOptions: React.PropTypes.any,
    },

    getDefaultProps: function() {
        return defaultExplanationProps;
    },

    getInitialState: function() {
        return {};
    },

    change(...args) {
        return Changeable.change.apply(this, args);
    },

    render: function() {
        return (
            <div className="perseus-widget-explanation-editor">
                <div className="perseus-widget-row">
                    <label>
                        Prompt to show explanation:{" "}
                        <TextInput
                            value={this.props.showPrompt}
                            onChange={this.change("showPrompt")}
                        />
                    </label>
                </div>
                <div className="perseus-widget-row">
                    <label>
                        Prompt to hide explanation:{" "}
                        <TextInput
                            value={this.props.hidePrompt}
                            onChange={this.change("hidePrompt")}
                        />
                    </label>
                </div>
                <div className="perseus-widget-row">
                    <Editor
                        apiOptions={this.props.apiOptions}
                        content={this.props.explanation}
                        widgets={this.props.widgets}
                        widgetEnabled={true}
                        immutableWidgets={false}
                        onChange={props => {
                            var newProps = {};
                            if (_.has(props, "content")) {
                                newProps.explanation = props.content;
                            }
                            if (_.has(props, "widgets")) {
                                newProps.widgets = props.widgets;
                            }
                            this.change(newProps);
                        }}
                    />
                </div>
            </div>
        );
    },

    serialize() {
        return EditorJsonify.serialize.call(this);
    },
});

module.exports = ExplanationEditor;
export default module.exports;
