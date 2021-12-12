import _componentsTextInputJsx from "../components/text-input.jsx";
import _componentsNumberInputJsx from "../components/number-input.jsx";
import _componentsInfoTipJsx from "../components/info-tip.jsx";
import _mixinsEditorJsonifyJsx from "../mixins/editor-jsonify.jsx";
import _mixinsChangeableJsx from "../mixins/changeable.jsx";
import _react from "react";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;
/* eslint-disable react/jsx-closing-bracket-location, react/sort-comp */
/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = _react;

const Changeable = _mixinsChangeableJsx;
const EditorJsonify = _mixinsEditorJsonifyJsx;

const InfoTip = _componentsInfoTipJsx;
const NumberInput = _componentsNumberInputJsx;
const TextInput = _componentsTextInputJsx;

const PassageRefEditor = React.createClass({
    propTypes: {
        ...Changeable.propTypes,
        passageNumber: React.PropTypes.number,
        referenceNumber: React.PropTypes.number,
        summaryText: React.PropTypes.string,
    },

    getDefaultProps: function() {
        return {
            passageNumber: 1,
            referenceNumber: 1,
            summaryText: "",
        };
    },

    change(...args) {
        return Changeable.change.apply(this, args);
    },

    render: function() {
        return (
            <div>
                <div>
                    <label>
                        {"Passage Number: "}
                        <NumberInput
                            value={this.props.passageNumber}
                            onChange={this.change("passageNumber")}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        {"Reference Number: "}
                        <NumberInput
                            value={this.props.referenceNumber}
                            onChange={this.change("referenceNumber")}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        {"Summary Text: "}
                        <TextInput
                            value={this.props.summaryText}
                            onChange={this.change("summaryText")}
                        />
                        <InfoTip>
                            <p>
                                Short summary of the referenced section. This
                                will be included in parentheses and quotes
                                automatically.
                            </p>
                            <p>Ex: The start ... the end</p>
                        </InfoTip>
                    </label>
                </div>
            </div>
        );
    },

    serialize() {
        return EditorJsonify.serialize.call(this);
    },
});

_module_.exports = PassageRefEditor;
export default _module_.exports;
