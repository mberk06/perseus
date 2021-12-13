import { addHighlight, buildHighlight, deserializeHighlight, serializeHighlight } from "./highlights.js";
import _wordIndexerJsx from "./word-indexer.jsx";
import _uiHighlightingUiJsx from "./ui/highlighting-ui.jsx";
import { StyleSheet, css } from "aphrodite";
import _react from "react";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;

/**
 * The entry point for highlighting!
 *
 * Given a content node and a set of serialized highlights, this component
 * renders the content with the given highlights applied. The content's DOM is
 * not modified by this process, so any content should be safe to pass to this
 * component.
 *
 * This component also renders controls for the user to add/remove/update
 * highlights. When the user does so, this component will update the full set
 * of highlights, serialize them, and call `onSerializedHighlightsUpdate` with
 * new set of serialized highlights, which you can then persist and send back
 * down to this component. Easy peasy!
 */
const React = _react;

const HighlightingUI = _uiHighlightingUiJsx;
const WordIndexer = _wordIndexerJsx;

class HighlightableContent extends React.PureComponent {
    state = {
        wordRanges: [],
    };

    _buildHighlight(highlightRange) {
        // TODO(mdr): If _buildHighlight starts getting called more often, we
        //     might want to cache the DOMHighlightSet instead of recomputing
        //     it here.
        return buildHighlight(
            this._getDOMHighlights(), this.state.wordRanges, highlightRange);
    }

    /**
     * Take the highlights from props, and deserialize them into DOMHighlights,
     * according to the latest cache of word ranges.
     */
    _getDOMHighlights() {
        const {serializedHighlights} = this.props;
        const {wordRanges} = this.state;

        const domHighlights = {};
        for (const key of Object.keys(serializedHighlights)) {
            domHighlights[key] =
                deserializeHighlight(serializedHighlights[key], wordRanges);
        }
        return domHighlights;
    }

    /**
     * Add the given DOMHighlight to the current set.
     */
    _handleAddHighlight = highlight => {
        const newDomHighlights =
            addHighlight(this._getDOMHighlights(), highlight);

        const newSerializedHighlights = {};
        for (const key of Object.keys(newDomHighlights)) {
            newSerializedHighlights[key] =
                serializeHighlight(newDomHighlights[key]);
        }

        this.props.onSerializedHighlightsUpdate(newSerializedHighlights);
    }

    /**
     * Remove the given highlight from the list, and call our callback with the
     * new set of highlights.
     */
    _handleRemoveHighlight = keyToRemove => {
        const {serializedHighlights} = this.props;
        const newSerializedHighlights = {...serializedHighlights};
        delete newSerializedHighlights[keyToRemove];
        this.props.onSerializedHighlightsUpdate(newSerializedHighlights);
    }

    /**
     * When our WordIndexer sends us a new cache of word ranges, store it in
     * our component state.
     */
    _handleWordsUpdate = wordRanges => {
        this.setState({wordRanges});
    }

    render() {
        const highlights = this._getDOMHighlights();

        // NOTE(mdr): This lambda is rebuilt every time this component updates,
        //     so every update to HighlightableContent triggers an update in
        //     the child HighlightingUI and SelectionTracker, even if the
        //     behavior hasn't changed.
        //
        //     Over-updating is preferable to under-updating here, because some
        //     updates in this component's props/state *do* affect
        //     `buildHighlight`'s behavior, and *should* trigger an update.
        //
        //     A more performant approach would be to cache this function
        //     object until its implicitly-bound inputs change. If profiling
        //     leads us to implement such caching, this draft might be a good
        //     starting point: https://phabricator.khanacademy.org/D35623?id=170698
        const buildHighlight = r => this._buildHighlight(r);

        return (
            <div
                className={css(styles.container)}
                ref={container => this._container = container}
            >
                <div>
                    {this.props.enabled && this._container && this._content &&
                        <HighlightingUI
                            buildHighlight={buildHighlight}
                            contentNode={this._content}
                            editable={this.props.editable}
                            highlights={highlights}
                            offsetParent={this._container}
                            zIndexes={{
                                // The content has a z-index of 1, so, to be above
                                // or below the content, use z-index of 2 or 0,
                                // respectively.
                                aboveContent: 2,
                                belowContent: 0,
                            }}

                            onAddHighlight={this._handleAddHighlight}
                            onRemoveHighlight={this._handleRemoveHighlight}
                        />
                    }
                </div>
                <div
                    className={css(styles.content)}
                    ref={content => this._content = content}
                >
                    <WordIndexer onWordsUpdate={this._handleWordsUpdate}>
                        {this.props.children}
                    </WordIndexer>
                </div>
            </div>
        );
    }
}

const styles = StyleSheet.create({
    // We render content with z-index 1, and highlights with z-index 0, so that
    // content will receive the browser's native pointer events. (Highlights
    // have their own magic code to manage hover detection, despite being
    // behind the content.)

    container: {
        // Position the container and give it a z-index, to scope the z-indexes
        // inside by creating a stacking context.
        // https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context
        //
        // This way, content's z-index of 1, and highlights' z-index of 0, and
        // tooltips' z-index of 2 don't interact with anything external;
        // external UI will see `HighlightableContent` as a single flat layer
        // with a z-index of 0. This removes the need for us to coordinate our
        // choices of z-index with external UI.
        position: "relative",
        zIndex: 0,
    },

    content: {
        // NOTE(mdr): Creating a stacking context for content of z-index 1 may
        //    be problematic if the content and external page want to
        //    interleave layers between each other, e.g., if the application UI
        //    wants to render something above some parts of our content, but
        //    below other parts. It's not relevant for the current Passage-only
        //    call site, but could be relevant someday…
        position: "relative",
        zIndex: 1,
    },
});

_module_.exports = HighlightableContent;
export default _module_.exports;
