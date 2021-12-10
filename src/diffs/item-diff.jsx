import _widgetDiffJsx from "./widget-diff.jsx";
import _rendererDiffJsx from "./renderer-diff.jsx";
import _underscore from "underscore";
import _react from "react";

var module = {
    exports: {}
};

var exports = module.exports;
/**
 * A side by side diff view for Perseus exercise items.
 */

const React = _react;
const _ = _underscore;

const RendererDiff = _rendererDiffJsx;
const WidgetDiff = _widgetDiffJsx;

const itemProps = React.PropTypes.shape({
    question: React.PropTypes.shape({}).isRequired,
    answerArea: React.PropTypes.shape({}).isRequired,
    hints: React.PropTypes.array.isRequired,
});


const ItemDiff = React.createClass({
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

module.exports = ItemDiff;
export default module.exports;
