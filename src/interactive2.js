import _utilColorsJs from "./util/colors.js";
import _interactive2MovablePolygonJs from "./interactive2/movable-polygon.js";
import _interactive2MovableLineJs from "./interactive2/movable-line.js";
import _interactive2MovablePointJsx from "./interactive2/movable-point.jsx";
import _interactive2MovableJs from "./interactive2/movable.js";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;
const Movable = _interactive2MovableJs;
const MovablePoint = _interactive2MovablePointJsx;
const MovableLine = _interactive2MovableLineJs;
const MovablePolygon = _interactive2MovablePolygonJs;

const KhanColors = _utilColorsJs;

const Interactive2 = {
    MovablePoint: MovablePoint,
    addMovablePoint: function(graphie, options) {
        const movable = new Movable(graphie, {});
        return new MovablePoint(graphie, movable, options);
    },
    MovableLine: MovableLine,
    addMovableLine: function(graphie, options) {
        const movable = new Movable(graphie, {});
        return new MovableLine(graphie, movable, options);
    },
    MovablePolygon: MovablePolygon,
    addMovablePolygon: function(graphie, options) {
        const movable = new Movable(graphie, {});
        return new MovablePolygon(graphie, movable, options);
    },

    addMaybeMobileMovablePoint: function(widget, extraProps) {
        const isMobile = widget.props.apiOptions.isMobile;

        const commonStyle = isMobile
            ? {
                stroke: "#ffffff",
                "stroke-width": 3,
                fill: KhanColors.INTERACTIVE,
            }
            : {
                stroke: KhanColors.INTERACTIVE,
                fill: KhanColors.INTERACTIVE,
            };

        const normalStyle = Object.assign(commonStyle, extraProps.normalStyle);

        const highlightStyle = Object.assign(
            isMobile
                ? {
                    ...commonStyle,
                    "stroke-width": 0,
                    scale: 0.75,
                }
                : {},
            extraProps.highlightStyle
        );

        const props = Object.assign(
            {
                normalStyle: normalStyle,
                highlightStyle: highlightStyle,
                shadow: isMobile,
                tooltip: isMobile && widget.props.showTooltips,
                showHairlines: widget.showHairlines,
                hideHairlines: widget.hideHairlines,
            },
            isMobile ? {pointSize: 7} : {}
        );

        return Interactive2.addMovablePoint(
            widget.graphie,
            Object.assign(extraProps, props)
        );
    },
};

_module_.exports = Interactive2;
export default _module_.exports;
