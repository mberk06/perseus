import { getClientRectsForTextInRange, getRelativePosition, getRelativeRect } from "./util.js";
import { StyleSheet, css } from "aphrodite";
import _react from "react";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;

(function() {
    // @flow
    /**
     * This component, given a single DOMHighlight, draws highlight rectangles in
     * the same absolute position as the highlighted content, as computed via
     * `getClientRects`.
     *
     * TODO(mdr): Many things can affect the correct positioning of highlighting,
     *     and this component does not attempt to anticipate them. If we start
     *     using this highlighting library on content with a more dynamic layout,
     *     we should add a hook to allow the parent to `forceUpdate` the
     *     `HighlightRenderer`.
     */
    const React = _react;

    class HighlightRenderer extends React.PureComponent {
        state = {
            cachedHighlightRects: this._computeRects(this.props),
            tooltipIsHovered: false,
        };

        componentWillReceiveProps(nextProps) {
            if (
                this.props.highlight !== nextProps.highlight ||
                this.props.offsetParent !== nextProps.offsetParent
            ) {
                this.setState({
                    cachedHighlightRects: this._computeRects(nextProps),
                });
            }
        }

        /**
         * Compute the set of rectangles that cover the highlighted content, with
         * coordinates relative to the offset parent. That way, we can use them
         * for CSS positioning.
         */
        _computeRects(props) {
            const {highlight, offsetParent} = props;

            // Get the set of rectangles that covers the range's text, relative to
            // the offset parent.
            const clientRects = getClientRectsForTextInRange(highlight.domRange);
            const offsetParentRect = offsetParent.getBoundingClientRect();
            const relativeRects =
                clientRects.map(rect => getRelativeRect(rect, offsetParentRect));

            return relativeRects;
        }

        /**
         * Return whether the given mouse position (coordinates relative to this
         * component's offset parent) is hovering over the given rectangle
         * (coordinates also relative to this component's offset parent).
         */
        _rectIsHovered(rect, mouseOffsetPosition) {
            const positionWithinRect =
                getRelativePosition(mouseOffsetPosition, rect);

            return 0 <= positionWithinRect.left &&
                positionWithinRect.left < rect.width &&
                0 <= positionWithinRect.top &&
                positionWithinRect.top < rect.height;
        }

        /**
         * Return whether the given mouse position (coordinates relative to the
         * viewport) is hovering over this highlight.
         */
        isHovered(mouseClientPosition) {
            if (!mouseClientPosition) {
                return false;
            }

            const {offsetParent} = this.props;
            const {cachedHighlightRects} = this.state;

            // Convert the client-relative mouse coordinates to be relative to the
            // offset parent. That way, we can compare them to the cached highlight
            // rectangles.
            const offsetParentRect = offsetParent.getBoundingClientRect();
            const mouseOffsetPosition =
                getRelativePosition(mouseClientPosition, offsetParentRect);

            return cachedHighlightRects.some(rect => this._rectIsHovered(rect, mouseOffsetPosition));
        }

        render() {
            const rects = this.state.cachedHighlightRects;

            return (
                <div>
                    {rects.map((rect, index) => <div
                        key={index}
                        className={css(styles.highlightRect)}
                        style={{
                            // NOTE(mdr): We apply `position: absolute` here
                            //     rather than in Aphrodite styles, because
                            //     Aphrodite styles are delayed. If this
                            //     element temporarily has `position: static`,
                            //     then it'll displace the content, and other
                            //     highlights rendering during this update will
                            //     measure the displaced content instead, oops!
                            position: "absolute",
                            width: rect.width,
                            height: rect.height,
                            top: rect.top,
                            left: rect.left,
                            zIndex: this.props.zIndexes.belowContent,
                        }}
                    />
                    )}
                </div>
            );
        }
    }

    const styles = StyleSheet.create({
        highlightRect: {
            background: "#fffabe", // highlighter yellow :)
        },
    });

    _module_.exports = HighlightRenderer;
}).call(_module_.exports);

export default _module_.exports;
