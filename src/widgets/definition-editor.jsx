import _componentsTextInputJsx from "../components/text-input.jsx";
import _editorJsx from "../editor.jsx";
import _mixinsEditorJsonifyJsx from "../mixins/editor-jsonify.jsx";
import _mixinsChangeableJsx from "../mixins/changeable.jsx";
import _underscore from "underscore";
import _react from "react";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;
const React = _react;
const _ = _underscore;

const Changeable = _mixinsChangeableJsx;
const EditorJsonify = _mixinsEditorJsonifyJsx;

const Editor = _editorJsx;
const TextInput = _componentsTextInputJsx;

const DefinitionEditor = createReactClass({
    propTypes: {
        ...Changeable.propTypes,
        togglePrompt: PropTypes.string,
        definition: PropTypes.string,
        apiOptions: PropTypes.any,
    },

    getDefaultProps: function() {
        return {
            togglePrompt: "",
            definition: "",
        };
    },

    change(...args) {
        return Changeable.change.apply(this, args);
    },

    serialize() {
        return EditorJsonify.serialize.call(this);
    },

    render: function() {
        return (
            <div className="perseus-widget-definition-editor">
                <a
                    href="https://docs.google.com/document/d/1udaPef4imOfTMhmLDlWq4SM0mxL0r3YHFZE-5J1uGfo"
                    target="_blank"
                >
                    Definition style guide
                </a>
                <div className="perseus-widget-row">
                    <label>
                        Word to be defined:{" "}
                        <TextInput
                            value={this.props.togglePrompt}
                            onChange={this.change("togglePrompt")}
                            placeholder="define me"
                        />
                    </label>
                </div>
                <div className="perseus-widget-row">
                    <Editor
                        apiOptions={this.props.apiOptions}
                        content={this.props.definition}
                        widgetEnabled={false}
                        placeholder="definition goes here"
                        onChange={props => {
                            const newProps = {};
                            if (_.has(props, "content")) {
                                newProps.definition = props.content;
                            }
                            this.change(newProps);
                        }}
                    />
                </div>
            </div>
        );
    },
});

_module_.exports = DefinitionEditor;
export default _module_.exports;
