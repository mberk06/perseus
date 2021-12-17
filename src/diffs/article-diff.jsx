import _rendererDiffJsx from "./renderer-diff.jsx";
import _underscore from "underscore";
import _react from "react";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;
/**
 * A side by side diff view for Perseus articles.
 */

const React = _react;
const _ = _underscore;

const RendererDiff = _rendererDiffJsx;

const rendererProps = PropTypes.shape({
    content: PropTypes.string,
    images: PropTypes.object,
    widgets: PropTypes.object,
});


const ArticleDiff = createReactClass({
    propTypes: {
        // TODO(alex): Check whether we still have any Perseus articles whose
        // top-level json is an object, not an array. If not, simplify here.
        after: PropTypes.oneOfType([
            rendererProps,
            PropTypes.arrayOf(rendererProps),
        ]).isRequired,
        before: PropTypes.oneOfType([
            rendererProps,
            PropTypes.arrayOf(rendererProps),
        ]).isRequired,
    },

    getInitialState: function() {
        return this._stateFromProps(this.props);
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState(this._stateFromProps(nextProps));
    },

    _stateFromProps: function(props) {
        const {before, after} = props;
        return {
            before: Array.isArray(before) ? before : [before],
            after: Array.isArray(after) ? after : [after],
        };
    },

    render: function() {
        const {before, after} = this.state;

        const sectionCount = Math.max(before.length, after.length);

        const sections = _.times(sectionCount, n => <RendererDiff
            before={n < before.length ? before[n] : undefined}
            after={n < after.length ? after[n] : undefined}
            title={`Section ${n + 1}`}
            showAlignmentOptions={true}
            showSeparator={n < sectionCount - 1}
            key={n}
        />
        );

        return <div className="framework-perseus">{sections}</div>;
    },
});

_module_.exports = ArticleDiff;
export default _module_.exports;
