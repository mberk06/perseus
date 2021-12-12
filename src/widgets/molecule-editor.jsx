import _componentsTextInputJsx from "../components/text-input.jsx";
import _componentsNumberInputJsx from "../components/number-input.jsx";
import _mixinsChangeableJsx from "../mixins/changeable.jsx";
import _mixinsEditorJsonifyJsx from "../mixins/editor-jsonify.jsx";
import _react from "react";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;
const React = _react;

const EditorJsonify = _mixinsEditorJsonifyJsx;
const Changeable = _mixinsChangeableJsx;
const NumberInput = _componentsNumberInputJsx;
const TextInput = _componentsTextInputJsx;

const MoleculeWidgetEditor = React.createClass({
    propTypes: {
        ...Changeable.propTypes,
        rotationAngle: React.PropTypes.number,
        smiles: React.PropTypes.string,
    },

    change(...args) {
        return Changeable.change.apply(this, args);
    },

    updateMolecule: function(newValue) {
        this.change({smiles: newValue});
    },

    updateRotation: function(newValue) {
        this.change({rotationAngle: newValue});
    },

    serialize() {
        return EditorJsonify.serialize.call(this);
    },

    render: function() {
        return (
            <div>
                <div>
                    {/* TODO(colin): instead of nbsp hacks, use styles to get
                    the spacing right. */}
                    <label>
                        SMILES:&nbsp;
                        <TextInput
                            onChange={this.updateMolecule}
                            value={this.props.smiles}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Rotation (deg):&nbsp;
                        <NumberInput
                            onChange={this.updateRotation}
                            value={this.props.rotationAngle}
                        />
                    </label>
                </div>
            </div>
        );
    },
});

_module_.exports = MoleculeWidgetEditor;
export default _module_.exports;
