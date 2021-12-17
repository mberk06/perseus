import _componentsPropCheckBoxJsx from "../components/prop-check-box.jsx";
import _reactComponentsBlurInputJsx from "react-components/blur-input.jsx";
import _mixinsEditorJsonifyJsx from "../mixins/editor-jsonify.jsx";
import _mixinsChangeableJsx from "../mixins/changeable.jsx";
import _underscore from "underscore";
import _react from "react";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;
/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/sort-comp, space-infix-ops */
/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = _react;
const _ = _underscore;

const Changeable = _mixinsChangeableJsx;
const EditorJsonify = _mixinsEditorJsonifyJsx;

const BlurInput = _reactComponentsBlurInputJsx;
const PropCheckBox = _componentsPropCheckBoxJsx;

/**
 * This is used for editing a name/value pair.
 */
const PairEditor = createReactClass({
    propTypes: {
        ...Changeable.propTypes,
        name: PropTypes.string,
        value: PropTypes.string,
    },

    getDefaultProps: function() {
        return {
            name: "",
            value: "",
        };
    },

    change(...args) {
        return Changeable.change.apply(this, args);
    },

    render: function() {
        return (
            <fieldset>
                <label>
                    Name:
                    <BlurInput
                        value={this.props.name}
                        onChange={this.change("name")}
                    />
                </label>
                <label>
                    Value:
                    <BlurInput
                        value={this.props.value}
                        onChange={this.change("value")}
                    />
                </label>
            </fieldset>
        );
    },

    serialize() {
        return EditorJsonify.serialize.call(this);
    },
});

/**
 * This is used for editing a set of name/value pairs.
 */
var PairsEditor = createReactClass({
    propTypes: {
        ...Changeable.propTypes,
        pairs: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                value: PropTypes.string,
            })
        ).isRequired,
    },

    render: function() {
        var editors = _.map(this.props.pairs, (pair, i) => {
            return (
                <PairEditor
                    key={i}
                    name={pair.name}
                    value={pair.value}
                    onChange={this.handlePairChange.bind(this, i)}
                />
            );
        });
        return (
            <div>
                {editors}
            </div>
        );
    },

    change(...args) {
        return Changeable.change.apply(this, args);
    },

    handlePairChange: function(pairIndex, pair) {
        // If they're both non empty, add a new one
        var pairs = this.props.pairs.slice();
        pairs[pairIndex] = pair;

        var lastPair = pairs[pairs.length - 1];
        if (lastPair.name && lastPair.value) {
            pairs.push({name: "", value: ""});
        }
        this.change("pairs", pairs);
    },

    serialize() {
        return EditorJsonify.serialize.call(this);
    },
});

/**
 * This is the main editor for this widget, to specify all the options.
 */
var IframeEditor = createReactClass({
    propTypes: {
        ...Changeable.propTypes,
    },

    getDefaultProps: function() {
        return {
            url: "",
            settings: [{name: "", value: ""}],
            width: "400",
            height: "400",
            allowFullScreen: false,
            allowTopNavigation: false,
        };
    },

    change(...args) {
        return Changeable.change.apply(this, args);
    },

    render: function() {
        return (
            <div>
                <div style={{fontWeight: "bold", textAlign: "center"}}>
                    This widget is deprecated! <br />
                    Try using the Video or CS Program widgets instead.
                </div>
                <label>
                    Url or Program ID:
                    <BlurInput
                        name="url"
                        value={this.props.url}
                        onChange={this.change("url")}
                    />
                </label>
                <br />
                <label>
                    Settings:
                    <PairsEditor
                        name="settings"
                        pairs={this.props.settings}
                        onChange={this.handleSettingsChange}
                    />
                </label>
                <br />
                <label>
                    Width:
                    <BlurInput
                        name="width"
                        value={this.props.width}
                        onChange={this.change("width")}
                    />
                </label>
                <label>
                    Height:
                    <BlurInput
                        name="height"
                        value={this.props.height}
                        onChange={this.change("height")}
                    />
                </label>
                <PropCheckBox
                    label="Allow full screen"
                    allowFullScreen={this.props.allowFullScreen}
                    onChange={this.props.onChange}
                />
                <br />
                <PropCheckBox
                    label="Allow iframe content to redirect the page"
                    allowTopNavigation={this.props.allowTopNavigation}
                    onChange={this.props.onChange}
                />
            </div>
        );
    },

    handleSettingsChange: function(settings) {
        this.change({settings: settings.pairs});
    },

    serialize() {
        return EditorJsonify.serialize.call(this);
    },
});

_module_.exports = IframeEditor;
export default _module_.exports;
