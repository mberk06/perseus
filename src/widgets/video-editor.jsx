import _reactComponentsBlurInputJsx from "react-components/blur-input.jsx";
import _componentsInfoTipJsx from "../components/info-tip.jsx";
import _mixinsEditorJsonifyJsx from "../mixins/editor-jsonify.jsx";
import _mixinsChangeableJsx from "../mixins/changeable.jsx";
import _underscore from "underscore";
import _react from "react";

var module = {
    exports: {}
};

var exports = module.exports;
/* eslint-disable no-var */
/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = _react;
const _ = _underscore;

const Changeable = _mixinsChangeableJsx;
const EditorJsonify = _mixinsEditorJsonifyJsx;

const InfoTip = _componentsInfoTipJsx;
const BlurInput = _reactComponentsBlurInputJsx;

const KA_VIDEO_URL = /khanacademy\.org\/.*\/v\/(.*)$/;

/**
 * Turns Khan Academy URLs into the KA slugs, if possible. Any other URLs are
 * returned unchanged.
 */
function getSlugFromUrl(url) {
    var match = KA_VIDEO_URL.exec(url);
    if (match) {
        return match[1];
    }
    return url;
}

/**
 * This is the main editor for this widget, to specify all the options.
 */
const VideoEditor = React.createClass({
    propTypes: {
        ...Changeable.propTypes,
        location: React.PropTypes.string,
        onChange: React.PropTypes.func,
    },

    getDefaultProps: function() {
        return {
            location: "",
        };
    },

    _handleUrlChange: function(url) {
        this.props.onChange({location: getSlugFromUrl(url)});
    },

    change(...args) {
        return Changeable.change.apply(this, args);
    },

    serialize() {
        return EditorJsonify.serialize.call(this);
    },

    render: function() {
        return (
            <div>
                <label>
                    URL or KA Video Slug:{" "}
                    <BlurInput
                        name="location"
                        value={this.props.location}
                        style={{width: 290}}
                        onChange={this._handleUrlChange}
                    />
                    <InfoTip>
                        You can paste any URL here. KA video URLs will be
                        converted to just the slug.
                    </InfoTip>
                </label>
            </div>
        );
    },
});

module.exports = VideoEditor;
export default module.exports;
