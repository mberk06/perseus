import { iconDropdownArrow } from "../icon-paths.js";
import * as styleConstants from "../styles/constants.js";
import _componentsInlineIconJsx from "../components/inline-icon.jsx";
import _perseusApiJsx2 from "../perseus-api.jsx";
import _perseusApiJsx from "../perseus-api.jsx";
import _underscore from "underscore";
import _reactDom from "react-dom";
import _react from "react";
import _classnames from "classnames";
import { StyleSheet, css } from "aphrodite";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;
const classNames = _classnames;
const React = _react;
const ReactDOM = _reactDom;
const _ = _underscore;

const ApiClassNames = _perseusApiJsx.ClassNames;
const ApiOptions = _perseusApiJsx2.Options;
const InlineIcon = _componentsInlineIconJsx;

const dropdownArrowSize = 24;

const Dropdown = createReactClass({
    propTypes: {
        apiOptions: ApiOptions.propTypes,
        choices: PropTypes.arrayOf(PropTypes.string),
        onChange: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        selected: PropTypes.number,
        trackInteraction: PropTypes.func.isRequired,
    },

    getDefaultProps: function() {
        return {
            choices: [],
            selected: 0,
            placeholder: "",
            apiOptions: ApiOptions.defaults,
        };
    },

    render: function() {
        var choices = this.props.choices.slice();

        var selectClasses = classNames({
            "perseus-widget-dropdown": true,
        });

        return (
            <div>
                <select
                    onChange={this._handleChangeEvent}
                    onClick={e => {
                        e.stopPropagation();
                        e.target.focus();
                    }}
                    onTouchStart={e => {
                        e.stopPropagation();
                        e.target.focus();
                    }}
                    className={
                        selectClasses +
                        // This makes it so that mobile's fastclick doesn't
                        // interfere & call `.focus` when we're inside of a
                        // zoomable table.
                        " nofastclick " +
                        css(styles.dropdown) +
                        " " +
                        ApiClassNames.INTERACTIVE
                    }
                    disabled={this.props.apiOptions.readOnly}
                    value={this.props.selected}
                >
                    <option value={0} disabled>
                        {this.props.placeholder}
                    </option>
                    {choices.map((choice, i) => {
                        return (
                            <option key={"" + (i + 1)} value={i + 1}>
                                {choice}
                            </option>
                        );
                    })}
                </select>
                <InlineIcon
                    {...iconDropdownArrow}
                    style={{
                        marginLeft: `-${dropdownArrowSize}px`,
                        height: dropdownArrowSize,
                        width: dropdownArrowSize,
                    }}
                />
            </div>
        );
    },

    focus: function() {
        ReactDOM.findDOMNode(this).focus();
        return true;
    },

    _handleChangeEvent: function(e) {
        this._handleChange(parseInt(e.target.value));
    },

    _handleChange: function(selected) {
        this.props.trackInteraction();
        this.props.onChange({selected: selected});
    },

    getUserInput: function() {
        return {value: this.props.selected};
    },

    simpleValidate: function(rubric) {
        return Dropdown.validate(this.getUserInput(), rubric);
    },
});

_.extend(Dropdown, {
    validate: function(state, rubric) {
        var selected = state.value;
        if (selected === 0) {
            return {
                type: "invalid",
                message: null,
            };
        } else {
            var correct = rubric.choices[selected - 1].correct;
            return {
                type: "points",
                earned: correct ? 1 : 0,
                total: 1,
                message: null,
            };
        }
    },
});

var propTransform = editorProps => {
    return {
        placeholder: editorProps.placeholder,
        choices: _.map(editorProps.choices, choice => choice.content),
    };
};

const styles = StyleSheet.create({
    dropdown: {
        appearance: "none",
        backgroundColor: "transparent",
        border: `1px solid ${styleConstants.gray76}`,
        borderRadius: 4,
        boxShadow: "none",
        fontFamily: styleConstants.baseFontFamily,
        padding: `9px ${dropdownArrowSize + 1}px 9px 9px`,

        ":focus": {
            outline: "none",
            border: `2px solid ${styleConstants.kaGreen}`,
            padding: `8px ${dropdownArrowSize}px 8px 8px`,
        },

        ":focus + svg": {
            color: `${styleConstants.kaGreen}`,
        },

        ":disabled": {
            color: styleConstants.gray68,
        },

        ":disabled + svg": {
            color: styleConstants.gray68,
        },
    },
});

_module_.exports = {
    name: "dropdown",
    displayName: "Drop down",
    defaultAlignment: "inline-block",
    accessible: true,
    widget: Dropdown,
    transform: propTransform,
};
export default _module_.exports;
