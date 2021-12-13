import _utilColorsJs from "../../util/colors.js";
import { ChangeableProps } from "../../mixins/changeable.jsx";
import _underscore from "underscore";
import _react from "react";
import _reactComponentsButtonGroupJsx from "react-components/button-group.jsx";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;
/* eslint-disable react/sort-comp */
/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* To fix, remove an entry above, run ka-lint, and fix errors. */


const ButtonGroup = _reactComponentsButtonGroupJsx;
const React = _react;
const _ = _underscore;

const KhanColors = _utilColorsJs;

const COLORS = [
    KhanColors.BLACK,
    KhanColors.BLUE,
    KhanColors.GREEN,
    KhanColors.PINK,
    KhanColors.PURPLE,
    KhanColors.RED,
    KhanColors.GRAY,
];

const LIGHT_COLORS = [
    KhanColors.LIGHT_BLUE,
    KhanColors.LIGHT_ORANGE,
    KhanColors.LIGHT_PINK,
    KhanColors.LIGHT_GREEN,
    KhanColors.LIGHT_PURPLE,
    KhanColors.LIGHT_RED,
    "#fff",
];

class ColorPicker extends React.Component {
    static defaultProps = {
        value: KhanColors.BLACK,
        lightColors: false,
    };

    render() {
        const colors = this.props.lightColors ? LIGHT_COLORS : COLORS;
        return (
            <ButtonGroup
                value={this.props.value}
                allowEmpty={false}
                buttons={_.map(colors, color => {
                    return {
                        value: color,
                        content: (
                            <span>
                                <span
                                    className="colorpicker-circle"
                                    style={{background: color}}
                                />
                                &nbsp;
                            </span>
                        ),
                    };
                })}
                onChange={this.props.onChange}
            />
        );
    }
}

_module_.exports = ColorPicker;
export default _module_.exports;
