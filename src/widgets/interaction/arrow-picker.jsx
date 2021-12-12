import { ChangeableProps } from "../../mixins/changeable.jsx";
import _react from "react";
import _reactComponentsButtonGroupJsx from "react-components/button-group.jsx";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;
/* eslint-disable react/sort-comp */
/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* To fix, remove an entry above, run ka-lint, and fix errors. */
// @flow

const ButtonGroup = _reactComponentsButtonGroupJsx;
const React = _react;

class ArrowPicker extends React.Component {
    static defaultProps = {
        value: "",
    };

    render() {
        return (
            <ButtonGroup
                value={this.props.value}
                allowEmpty={false}
                buttons={[
                    {value: "", content: <span>&mdash;</span>},
                    {value: "->", content: <span>&#x2192;</span>},
                    /*
                TODO(eater): fix khan-exercises so these are supported
                {value: "<-", content: <span>&#x2190;</span>},
                {value: "<->", content: <span>&#x2194;</span>}
                */
                ]}
                onChange={this.props.onChange}
            />
        );
    }
}

_module_.exports = ArrowPicker;
export default _module_.exports;
