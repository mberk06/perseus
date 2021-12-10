// @flow
/**
 * Render a set of highlights. See HighlightRenderer for more details about how
 * each highlight is rendered.
 *
 * This component manages the state of the "Remove highlight" tooltip. To
 * determine the currently-hovered highlight, it calls the `isHovered` method
 * on each HighlightRenderer.
 */
const React = require("react");

const HighlightRenderer = require("./highlight-renderer.jsx");
const HighlightTooltip = require("./highlight-tooltip.jsx");

class HighlightSetRenderer extends React.PureComponent {
    state = {
        mouseClientPosition: null,
        hoveringTooltipFor: null,
    };

    // eslint-disable-next-line react/sort-comp
    _highlightRenderers = {};

    componentDidMount() {
        this._updateEditListeners(false, this.props.editable);
    }

    componentWillReceiveProps(nextProps) {
        this._updateEditListeners(this.props.editable, nextProps.editable);

        // If we were previously hovering over the tooltip for a highlight that
        // has since been removed, reset the hover state accordingly.
        if (
            typeof this.state.hoveringTooltipFor === "string" &&
            !(this.state.hoveringTooltipFor in nextProps.highlights)
        ) {
            this.setState({hoveringTooltipFor: null});
        }
    }

    componentWillUnmount() {
        this._updateEditListeners(this.props.editable, false);
    }

    /**
     * Given whether we were previously listening to mousemove events, and
     * whether we will now listen to mousemove events, add or remove the
     * listener accordingly.
     */
    _updateEditListeners(wasListening, willListen) {
        if (!wasListening && willListen) {
            window.addEventListener("mousemove", this._handleMouseMove);
        } else if (wasListening && !willListen) {
            window.removeEventListener("mousemove", this._handleMouseMove);

            // Additionally, reset the mouse position. Our child components
            // won't be checking `mouseClientPosition` when we're not
            // listening, anyway, but this guards against errors where we
            // re-enter listening mode and have stale coordinates stored in
            // state.
            this.setState({
                mouseClientPosition: null,
            });
        }
    }

    _handleMouseMove = e => {
        this.setState({
            mouseClientPosition: {
                left: e.clientX,
                top: e.clientY,
            },
        });
    }

    _getHoveredHighlightKey() {
        // If we're hovering over the tooltip, the hovered highlight is the
        // highlight that the tooltip is pointing to.
        const {hoveringTooltipFor} = this.state;
        if (typeof hoveringTooltipFor === "string") {
            return hoveringTooltipFor;
        }

        // Otherwise, check each highlight renderer to see whether the current
        // mouse position intersects any of the highlight rectangles.
        const highlightKeys = Object.keys(this.props.highlights);
        return highlightKeys.find(key => {
            const highlightRenderer = this._highlightRenderers[key];
            return highlightRenderer &&
                highlightRenderer.isHovered(this.state.mouseClientPosition);
        });
    }

    _renderTooltip() {
        const hoveredHighlightKey = this._getHoveredHighlightKey();
        if (typeof hoveredHighlightKey !== "string") {
            return null;
        }

        const hoveredHighlight = this.props.highlights[hoveredHighlightKey];

        return (
            <HighlightTooltip
                label={i18n._("Remove highlight")}

                focusNode={hoveredHighlight.domRange.endContainer}
                focusOffset={hoveredHighlight.domRange.endOffset}
                offsetParent={this.props.offsetParent}
                zIndex={this.props.zIndexes.aboveContent}

                onClick={
                    () => this.props.onRemoveHighlight(hoveredHighlightKey)}
                onMouseEnter={
                    () => this.setState({hoveringTooltipFor: hoveredHighlightKey})}
                onMouseLeave={
                    () => this.setState({hoveringTooltipFor: null})}
            />
        );
    }

    render() {
        return (
            <div>
                {Object.keys(this.props.highlights).map(key => <HighlightRenderer
                    ref={r => {
                        if (r) {
                            this._highlightRenderers[key] = r;
                        } else {
                            delete this._highlightRenderers[key];
                        }
                    }}
                    editable={this.props.editable}
                    key={key}
                    highlight={this.props.highlights[key]}
                    highlightKey={key}
                    mouseClientPosition={this.state.mouseClientPosition}
                    offsetParent={this.props.offsetParent}
                    onRemoveHighlight={this.props.onRemoveHighlight}
                    zIndexes={this.props.zIndexes}
                />
                )}
                {this.props.editable && this._renderTooltip()}
            </div>
        );
    }
}

module.exports = HighlightSetRenderer;
