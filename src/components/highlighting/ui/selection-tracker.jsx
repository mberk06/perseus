import _react from "react";

var module = {
    exports: {}
};

var exports = module.exports;
// @flow
/**
 * Tracks the user's current selection, and exposes it to the subtree using the
 * function-as-children pattern.
 */
const React = _react;

class SelectionTracker extends React.PureComponent {
    state = {
        mouseState: "up",
        trackedSelection: null,
    };

    componentDidMount() {
        this._updateListeners(false, this.props.enabled);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.buildHighlight !== nextProps.buildHighlight) {
            // The highlight-building function changed, so the
            // proposedHighlight we built with it might be different, or no
            // longer be valid. Update accordingly.
            this._updateTrackedSelection(nextProps.buildHighlight);
        }

        this._updateListeners(this.props.enabled, nextProps.enabled);
    }

    componentWillUnmount() {
        this._updateListeners(this.props.enabled, false);
    }

    _updateListeners(wasListening, willListen) {
        if (!wasListening && willListen) {
            window.addEventListener("mousedown", this._handleMouseDown);
            window.addEventListener("mouseup", this._handleMouseUp);
            document.addEventListener("selectionchange",
                this._handleSelectionChange);
        } else if (wasListening && !willListen) {
            window.removeEventListener("mousedown", this._handleMouseDown);
            window.removeEventListener("mouseup", this._handleMouseUp);
            document.removeEventListener("selectionchange",
                this._handleSelectionChange);

            // Additionally, reset the state, to guard against errors where we
            // re-enter listening mode and have stale values stored.
            this.setState({
                mouseState: "up",
                trackedSelection: null,
            });
        }
    }

    /**
     * Get the current selection focus and range, if present and non-collapsed.
     *
     * Otherwise, if there is no current selection or it's collapsed, return
     * null.
     */
    _computeFocusAndRange() {
        const selection = document.getSelection();
        if (!selection || selection.rangeCount === 0) {
            return null;
        }

        const range = selection.getRangeAt(0);
        if (range.collapsed) {
            return null;
        }

        // NOTE(mdr): The focus node is guaranteed to exist, because
        //     there's a range, but the Flow type annotations for
        //     Selection don't know that. Cast it ourselves.
        const focusNode = (selection.focusNode);
        const focusOffset = selection.focusOffset;
        return {focusNode, focusOffset, range};
    }

    /**
     * Compute the current TrackedSelection from the document state.
     */
    _computeTrackedSelection(buildHighlight) {
        const focusAndRange = this._computeFocusAndRange();
        if (!focusAndRange) {
            return null;
        }

        const {focusNode, focusOffset, range} = focusAndRange;
        const proposedHighlight = buildHighlight(range);
        if (!proposedHighlight) {
            return null;
        }

        return {focusNode, focusOffset, proposedHighlight};
    }

    /**
     * Update the TrackedSelection to reflect the document state.
     */
    _updateTrackedSelection(buildHighlight) {
        const trackedSelection = this._computeTrackedSelection(buildHighlight);
        this.setState({trackedSelection});
    }

    _handleSelectionChange = () => {
        this._updateTrackedSelection(this.props.buildHighlight);

        if (this.state.mouseState === "down") {
            this.setState({
                mouseState: "down-and-selecting",
            });
        }
    }

    _handleMouseDown = () => {
        this.setState({mouseState: "down"});
    }

    _handleMouseUp = () => {
        this.setState({mouseState: "up"});
    }

    render() {
        const {mouseState, trackedSelection} = this.state;
        const userIsMouseSelecting = mouseState === "down-and-selecting";

        return this.props.children && <div>
            {this.props.children(trackedSelection, userIsMouseSelecting)}
        </div>;
    }
}

module.exports = SelectionTracker;
export default module.exports;
