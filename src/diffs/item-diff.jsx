import _widgetDiffJsx from "./widget-diff.jsx";
import _rendererDiffJsx from "./renderer-diff.jsx";
import _underscore from "underscore";
import _react from "react";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;
/**
 * A side by side diff view for Perseus exercise items.
 */

const React = _react;
const _ = _underscore;

const RendererDiff = _rendererDiffJsx;
const WidgetDiff = _widgetDiffJsx;

const itemProps = PropTypes.shape({
    question: PropTypes.shape({}).isRequired,
    answerArea: PropTypes.shape({}).isRequired,
    hints: PropTypes.array.isRequired,
});


const ItemDiff = createReactClass({
    propTypes: {
        after: itemProps.isRequired,
        before: itemProps.isRequired,
    },

    render: function() {
        const {before, after} = this.props;

        const hintCount = Math.max(before.hints.length, after.hints.length);

        const question = <RendererDiff
            before={before.question}
            after={after.question}
            title="Question"
            showAlignmentOptions={false}
            showSeparator={true}
        />;

        const extras = <WidgetDiff
            before={before.answerArea}
            after={after.answerArea}
            title="Question extras"
        />;

        const hints = _.times(hintCount, function(n) {
            return <RendererDiff
                before={n < before.hints.length ? before.hints[n] : undefined}
                after={n < after.hints.length ? after.hints[n] : undefined}
                title={`Hint ${n + 1}`}
                showAlignmentOptions={false}
                showSeparator={n < hintCount - 1}
                key={n}
            />;
        });

        return <div className="framework-perseus">
            {question}
            {extras}
            {hints && <div className="diff-separator"/>}
            {hints}
        </div>;
    },
});

_module_.exports = ItemDiff;
export default _module_.exports;
