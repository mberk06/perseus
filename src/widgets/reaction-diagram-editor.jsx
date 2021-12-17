import _componentsTextInputJsx from "../components/text-input.jsx";
import _componentsNumberInputJsx from "../components/number-input.jsx";
import _mixinsEditorJsonifyJsx from "../mixins/editor-jsonify.jsx";
import _mixinsChangeableJsx from "../mixins/changeable.jsx";
import _react from "react";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;
/* eslint-disable brace-style, no-var */
/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = _react;

const Changeable = _mixinsChangeableJsx;
const EditorJsonify = _mixinsEditorJsonifyJsx;

const NumberInput = _componentsNumberInputJsx;
const TextInput = _componentsTextInputJsx;

var ReactionDiagramWidgetEditor = createReactClass({
    propTypes: {
        ...Changeable.propTypes,
        rotationAngle: PropTypes.arrayOf(PropTypes.number),
        separators: PropTypes.arrayOf(PropTypes.object),
        smiles: PropTypes.arrayOf(PropTypes.string),
    },

    getDefaultProps: function() {
        return {
            smiles: ["", ""],
            rotationAngle: [0, 0],
            separators: [{type: "right", topText: "", bottomText: ""}],
        };
    },

    change(...args) {
        return Changeable.change.apply(this, args);
    },

    updateMolecule: function(idx) {
        return function(newValue) {
            const newSmiles = [...this.props.smiles];
            newSmiles[idx] = newValue;
            this.change({smiles: newSmiles});
        }.bind(this);
    },

    updateRotation: function(idx) {
        return function(newValue) {
            const newRot = [...this.props.rotationAngle];
            newRot[idx] = newValue;
            this.change({rotationAngle: newRot});
        }.bind(this);
    },

    updateSeparators: function(idx, propName) {
        return newValue => {
            const newSep = this.props.separators.map(sep => {
                return {...sep};
            });
            newSep[idx][propName] = newValue;
            this.change({separators: newSep});
        };
    },

    serialize() {
        return EditorJsonify.serialize.call(this);
    },

    render: function() {
        // TODO(colin): use styling instead of &nbsp hacks.
        return (
            <div>
                <div>
                    <label>
                        LHS SMILES:&nbsp;
                        <TextInput
                            onChange={this.updateMolecule(0)}
                            value={this.props.smiles[0]}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        LHS Rotation (deg):&nbsp;
                        <NumberInput
                            onChange={this.updateRotation(0)}
                            value={this.props.rotationAngle[0]}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        RHS SMILES:&nbsp;
                        <TextInput
                            onChange={this.updateMolecule(1)}
                            value={this.props.smiles[1]}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        RHS Rotation (deg):&nbsp;
                        <NumberInput
                            onChange={this.updateRotation(1)}
                            value={this.props.rotationAngle[1]}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Top of arrow text:&nbsp;
                        <TextInput
                            onChange={this.updateSeparators(0, "topText")}
                            value={this.props.separators[0].topText}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Bottom of arrow text:&nbsp;
                        <TextInput
                            onChange={this.updateSeparators(0, "bottomText")}
                            value={this.props.separators[0].bottomText}
                        />
                    </label>
                </div>
            </div>
        );
    },
});

_module_.exports = ReactionDiagramWidgetEditor;
export default _module_.exports;
