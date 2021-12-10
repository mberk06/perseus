import _selectionTrackerJsx from "./selection-tracker.jsx";
import { rangesOverlap } from "../ranges.js";
import _highlightTooltipJsx from "./highlight-tooltip.jsx";
import _highlightSetRendererJsx from "./highlight-set-renderer.jsx";
import _react from "react";

var module = {
    exports: {}
};

var exports = module.exports;
// @flow
/**
 * This component, given a set of DOMHighlights, draws highlight rectangles in
 * the same absolute position as the highlighted content, as computed by the
 * range's `getClientRects` method.
 *
 * TODO(mdr): Many things can affect the correct positioning of highlighting,
 *     and this component does not attempt to anticipate them. If we start
 *     using this highlighting library on content with a more dynamic layout,
 *     we should add a hook to allow the parent to `forceUpdate` the
 *     `HighlightingUI`.
 */
const React = _react;

const HighlightSetRenderer = _highlightSetRendererJsx;
const HighlightTooltip = _highlightTooltipJsx;
const SelectionTracker = _selectionTrackerJsx;

class HighlightingUI extends React.PureComponent {
    _handleAddHighlight(highlightToAdd) {
        this.props.onAddHighlight(highlightToAdd);

        // Deselect the newly-highlighted text, by collapsing the selection
        // to the end of the range.
        const selection = document.getSelection();
        if (selection) {
            selection.collapseToEnd();
        }
    }

    _selectionIsValid(trackedSelection) {
        if (!trackedSelection) {
            return false;
        }

        const {contentNode} = this.props;

        // Create a range over the content node.
        const contentRange = new Range();
        contentRange.selectNodeContents(contentNode);

        // Create a range over the focus position.
        const focusRange = new Range();
        focusRange.setStart(
            trackedSelection.focusNode, trackedSelection.focusOffset);
        focusRange.collapse(true /* to start */);

        // Determine whether the content range contains the focus, by checking
        // whether they intersect. Because the focus range is a single point,
        // intersection is equivalent to being fully contained.
        const contentContainsFocus = rangesOverlap(contentRange, focusRange);

        // If the content contains the focus, this is a valid selection. Some
        // parts of the range might go beyond the content, but that's okay; the
        // corresponding DOMHighlight is already trimmed to only contain valid
        // words. We're just checking that the tooltip we render will be inside
        // the content, because rendering a tooltip outside the content would
        // be weird.
        const selectionIsValid = contentContainsFocus;

        return selectionIsValid;
    }

    render() {
        return (
            <SelectionTracker
                buildHighlight={this.props.buildHighlight}
                enabled={this.props.editable}
            >
                {(trackedSelection, userIsMouseSelecting) => <div>
                    <HighlightSetRenderer
                        editable={
                            /* An existing highlight is editable when the
                             * component is in editable mode, and there's no
                             * selection in progress. */
                            this.props.editable &&
                                !this._selectionIsValid(trackedSelection)}
                        highlights={this.props.highlights}
                        offsetParent={this.props.offsetParent}
                        onRemoveHighlight={this.props.onRemoveHighlight}
                        zIndexes={this.props.zIndexes}
                    />
                    {this._selectionIsValid(trackedSelection) &&
                        !userIsMouseSelecting &&
                        <HighlightTooltip
                            label={i18n._("Add highlight")}
                            onClick={() => this._handleAddHighlight(
                                trackedSelection.proposedHighlight)}

                            focusNode={trackedSelection.focusNode}
                            focusOffset={trackedSelection.focusOffset}
                            offsetParent={this.props.offsetParent}
                            zIndex={this.props.zIndexes.aboveContent}
                        />
                    }
                </div>
                }
            </SelectionTracker>
        );
    }
}

module.exports = HighlightingUI;
export default module.exports;
