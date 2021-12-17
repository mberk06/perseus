import _componentsSvgImageJsx from "../components/svg-image.jsx";
import _widgetDiffPerformerJsx from "./widget-diff-performer.jsx";
import _underscore from "underscore";
import _react from "react";
import _classnames from "classnames";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;
const classNames = _classnames;
const React = _react;
const _ = _underscore;

const performDiff = _widgetDiffPerformerJsx;
const SvgImage = _componentsSvgImageJsx;

const indentationFromDepth = function(depth) {
    return (depth - 1) * 20;
};

const BEFORE = "before";
const AFTER = "after";

const UNCHANGED = "unchanged";

const DiffSide = createReactClass({
    propTypes: {
        className: PropTypes.string.isRequired,
        depth: PropTypes.number.isRequired,
        propKey: PropTypes.string.isRequired,
        showKey: PropTypes.bool.isRequired,
        side: PropTypes.oneOf([BEFORE, AFTER]).isRequired,
        value: PropTypes.string,
    },

    render: function() {
        const className = classNames(this.props.className, {
            "diff-row": true,
            before: this.props.side === BEFORE,
            after: this.props.side === AFTER,
        });
        return <div className={className} >
            <div style={{paddingLeft: indentationFromDepth(this.props.depth)}}>
                {this.props.showKey && this.props.propKey + ": "}
                <span className={"inner-value dark " + this.props.className}>
                    {this.props.value}
                </span>
            </div>
        </div>;
    },
});

const CollapsedRow = createReactClass({
    propTypes: {
        depth: PropTypes.number,
        onClick: PropTypes.func.isRequired,
    },

    getDefaultProps: function() {
        return {
            depth: 0,
        };
    },

    render: function() {
        const self = this;
        return (
            <div onClick={self.props.onClick} style={{clear: "both"}}>
                {_.map([BEFORE, AFTER], function(side) {
                    return <div
                        className={"diff-row collapsed " + side}
                        key={side}
                    >
                        <div
                            style={{paddingLeft:
                                indentationFromDepth(self.props.depth),
                            }}
                        >
                            <span> [ show unmodified ] </span>
                        </div>
                    </div>;
                })}
            </div>
        );
    },
});

// Component representing a single property that may be nested.
const DiffEntry = createReactClass({
    propTypes: {
        depth: PropTypes.number,
        entry: PropTypes.shape({
            after: PropTypes.string,
            before: PropTypes.string,
            children: PropTypes.array,
            key: PropTypes.string,
        }),
        expanded: PropTypes.bool,
    },

    getDefaultProps: function() {
        return {
            depth: 0,
        };
    },

    getInitialState: function() {
        return {
            expanded: this.props.expanded,
        };
    },

    expand: function() {
        this.setState({expanded: true});
    },

    render: function() {
        const entry = this.props.entry;
        const propertyDeleted = entry.status === "removed";
        const propertyAdded   = entry.status === "added";
        const propertyChanged = entry.status === "changed";

        const hasChildren = entry.children.length > 0;

        const leftClass = classNames({
            "removed": propertyDeleted || (propertyChanged && !hasChildren),
            "dark": propertyDeleted,
            "blank-space": propertyAdded,
        });

        const rightClass = classNames({
            "added": propertyAdded || (propertyChanged && !hasChildren),
            "dark": propertyAdded,
            "blank-space": propertyDeleted,
        });

        let shownChildren;
        if (this.state.expanded) {
            shownChildren = entry.children;
        } else {
            shownChildren = _.select(entry.children, function(child) {
                return child.status !== UNCHANGED;
            });
        }

        let collapsed = shownChildren.length < entry.children.length;

        // don't hide just one entry
        if (entry.children.length === shownChildren.length + 1) {
            shownChildren = entry.children;
            collapsed = false;
        }

        const self = this;
        return (
            <div>
                {entry.key && <div style={{clear: "both"}}>
                <DiffSide
                    side={BEFORE}
                    className={leftClass}
                    depth={this.props.depth}
                    propKey={entry.key}
                    showKey={!propertyAdded}
                    value={entry.before}
                />
                <DiffSide
                    side={AFTER}
                    className={rightClass}
                    depth={this.props.depth}
                    propKey={entry.key}
                    showKey={!propertyDeleted}
                    value={entry.after}
                />
                </div>}
                {_.map(shownChildren, function(child) {
                    return <DiffEntry
                        key={child.key}
                        depth={self.props.depth + 1}
                        entry={child}
                        expanded={self.state.expanded}
                    />;
                })}
                {collapsed &&
                    <CollapsedRow
                        depth={this.props.depth + 1}
                        onClick={this.expand}
                    />}
            </div>
        );
    },
});

// For image widgets, show the actual image
const ImageWidgetDiff = createReactClass({
    propTypes: {
        after: PropTypes.shape({
            options: PropTypes.object,
        }).isRequired,
        before: PropTypes.shape({
            options: PropTypes.object,
        }).isRequired,
    },

    render: function() {
        const {before, after} = this.props;
        const beforeSrc = (before.options && before.options.backgroundImage) ?
            before.options.backgroundImage.url : "";
        const afterSrc = (after.options && after.options.backgroundImage) ?
            after.options.backgroundImage.url : "";
        return <div>
            <div className="diff-row before">
                {beforeSrc &&
                <div
                    className={classNames({
                        "image": true,
                        "image-unchanged": beforeSrc === afterSrc,
                        "image-removed": beforeSrc !== afterSrc,
                    })}
                >
                    <SvgImage src={beforeSrc} title={beforeSrc} />
                </div>}
            </div>
            <div className="diff-row after">
                {afterSrc &&
                <div
                    className={classNames({
                        "image": true,
                        "image-unchanged": beforeSrc === afterSrc,
                        "image-added": beforeSrc !== afterSrc,
                    })}
                >
                    <SvgImage src={afterSrc} title={afterSrc} />
                </div>}
            </div>
        </div>;
    },
});

const WidgetDiff = createReactClass({
    propTypes: {
        after: PropTypes.shape({
            options: PropTypes.object,
        }),
        before: PropTypes.shape({
            options: PropTypes.object,
        }),
        title: PropTypes.string.isRequired,
        type: PropTypes.string,
    },

    getDefaultProps: function() {
        return {
            after: {},
            before: {},
            type: "",
        };
    },

    render: function() {
        const {after, before, title, type} = this.props;
        const diff = performDiff(before, after);
        return <div>
            <div className="diff-header">{title}</div>
            <div className="diff-header">{title}</div>
            <div className="diff-body ui-helper-clearfix">
                {type === "image" &&
                    <ImageWidgetDiff before={before} after={after} />}
                <DiffEntry entry={diff} />
            </div>
        </div>;
    },
});

_module_.exports = WidgetDiff;
export default _module_.exports;
