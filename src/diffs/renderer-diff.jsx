import _widgetsJs from "../widgets.js";
import _widgetDiffJsx from "./widget-diff.jsx";
import _textDiffJsx from "./text-diff.jsx";
import _underscore from "underscore";
import _react from "react";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;
/**
 * A side by side diff view for Perseus renderers.
 */

const React = _react;
const _ = _underscore;

const TextDiff = _textDiffJsx;
const WidgetDiff = _widgetDiffJsx;
const Widgets = _widgetsJs;

const rendererProps = PropTypes.shape({
    content: PropTypes.string,
    images: PropTypes.object,
    widgets: PropTypes.object,
});

// In diffs, only show the widgetInfo props that can change
const filterWidgetInfo = function(widgetInfo, showAlignmentOptions) {
    const {alignment, graded, options, type} = widgetInfo || {};

    const filteredWidgetInfo = {options};

    // Show alignment options iff multiple valid ones exist for this widget
    if (showAlignmentOptions &&
            Widgets.getSupportedAlignments(type).length > 1) {
        filteredWidgetInfo.alignment = alignment;
    }

    if (type === "transformer") {
        filteredWidgetInfo.graded = graded;
    }

    if (Widgets.supportsStaticMode(type)) {
        filteredWidgetInfo.static = widgetInfo.static || undefined;
    }

    return filteredWidgetInfo;
};


const RendererDiff = createReactClass({
    propTypes: {
        // The "after" props of the renderer. Will be displayed on the right.
        after: rendererProps,

        // The "before" props of the renderer. Will be displayed on the left.
        before: rendererProps,

        // If true, show widget alignment options in the diff.
        showAlignmentOptions: PropTypes.bool,

        // If true, render a horizontal rule after this diff.
        showSeparator: PropTypes.bool,

        // The heading to render above the side by side diff.
        // (In a code review tool this would be the filename.)
        title: PropTypes.string.isRequired,
    },

    getDefaultProps: function() {
        return {
            after: {
                content: "",
                images: {},
                widgets: {},
            },
            before: {
                content: "",
                images: {},
                widgets: {},
            },
            showAlignmentOptions: false,
            showSeparator: false,
        };
    },

    render: function() {
        const {
            after,
            before,
            showAlignmentOptions,
            showSeparator,
            title,
        } = this.props;

        let textDiff;
        let widgetsDiff;

        if (before.content || after.content) {
            textDiff = <TextDiff
                before={before.content}
                after={after.content}
                title={title}
            />;
        }

        const beforeWidgets = Object.keys(before.widgets).filter(
            widget => before.content.includes(widget));
        const afterWidgets = Object.keys(after.widgets).filter(
            widget => after.content.includes(widget));

        if (beforeWidgets.length || afterWidgets.length) {
            const widgets = _.union(beforeWidgets, afterWidgets);
            widgetsDiff = widgets.map(widget => <WidgetDiff
                before={filterWidgetInfo(
                    before.widgets[widget], showAlignmentOptions)}
                after={filterWidgetInfo(
                    after.widgets[widget], showAlignmentOptions)}
                title={widget}
                type={(before.widgets[widget] || {}).type ||
                      (after.widgets[widget] || {}).type}
                key={widget}
            />
            );
        }

        return <div>
            {textDiff}
            {widgetsDiff}
            {showSeparator && <div className="diff-separator"/>}
        </div>;
    },
});

_module_.exports = RendererDiff;
export default _module_.exports;
