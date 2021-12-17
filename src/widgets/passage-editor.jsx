import _componentsPropCheckBoxJsx from "../components/prop-check-box.jsx";
import _componentsInfoTipJsx from "../components/info-tip.jsx";
import _editorJsx from "../editor.jsx";
import _mixinsEditorJsonifyJsx from "../mixins/editor-jsonify.jsx";
import _mixinsChangeableJsx from "../mixins/changeable.jsx";
import _underscore from "underscore";
import _react from "react";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;
/* eslint-disable comma-dangle, no-var, object-curly-spacing, react/jsx-closing-bracket-location, react/sort-comp */
/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = _react;
const _ = _underscore;

const Changeable = _mixinsChangeableJsx;
const EditorJsonify = _mixinsEditorJsonifyJsx;

const Editor = _editorJsx;
const InfoTip = _componentsInfoTipJsx;
const PropCheckBox = _componentsPropCheckBoxJsx;

const PassageEditor = createReactClass({
    propTypes: {
        ...Changeable.propTypes,
        passageTitle: PropTypes.string,
        passageText: PropTypes.string,
        footnotes: PropTypes.string,
        showLineNumbers: PropTypes.bool,
    },

    getDefaultProps: function() {
        return {
            passageTitle: "",
            passageText: "",
            footnotes: "",
            showLineNumbers: true,
        };
    },

    change(...args) {
        return Changeable.change.apply(this, args);
    },

    render: function() {
        var passageEditor = (
            <Editor
                ref="passage-editor"
                apiOptions={this.props.apiOptions}
                content={this.props.passageText}
                widgetEnabled={false}
                placeholder="Type passage here..."
                onChange={newProps => {
                    this.change({passageText: newProps.content});
                }}
                showWordCount={true}
            />
        );
        var footnotesEditor = (
            <Editor
                ref="passage-footnotes-editor"
                apiOptions={this.props.apiOptions}
                content={this.props.footnotes}
                widgetEnabled={false}
                placeholder="Type footnotes here..."
                onChange={newProps => {
                    this.change({footnotes: newProps.content});
                }}
            />
        );
        return (
            <div className="perseus-widget-passage-editor">
                <div className="perseus-widget-row">
                    <PropCheckBox
                        label="Show line numbers"
                        labelAlignment="right"
                        showLineNumbers={this.props.showLineNumbers}
                        onChange={this.props.onChange}
                    />
                </div>
                <div>
                    Passage title:
                    <InfoTip>
                        <p>
                            An optional title that will appear directly above
                            the passage in the same font style. (E.g. Passage 1)
                        </p>
                    </InfoTip>
                    <div>
                        <input
                            type="text"
                            defaultValue={this.props.passageTitle}
                            onChange={e => {
                                this.change({passageTitle: e.target.value});
                            }}
                        />
                    </div>
                </div>
                <div>
                    Passage Text:
                    {passageEditor}
                </div>
                <div>
                    Footnotes:
                    <InfoTip>
                        <p>
                            To add footnotes, add ^ characters where they belong
                            in the passage. Then, add ^ in the footnotes area to
                            reference the footnotes in the passage.
                        </p>
                    </InfoTip>
                    {footnotesEditor}
                </div>
            </div>
        );
    },

    serialize() {
        return EditorJsonify.serialize.call(this);
    },
});

_module_.exports = PassageEditor;
export default _module_.exports;
