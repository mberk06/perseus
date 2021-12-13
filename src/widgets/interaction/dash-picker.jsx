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


const ButtonGroup = _reactComponentsButtonGroupJsx;
const React = _react;

class DashPicker extends React.Component {
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
                    {value: "-", content: <span>&ndash;&ndash;&ndash;</span>},
                    {
                        value: "- ",
                        content: <span>&ndash;&nbsp;&nbsp;&ndash;</span>,
                    },
                    {
                        value: ".",
                        content: <span>&middot;&middot;&middot;&middot;</span>,
                    },
                    {
                        value: ". ",
                        content: <span>&middot; &middot; &middot;</span>,
                    },
                ]}
                onChange={this.props.onChange}
            />
        );
    }
}

_module_.exports = DashPicker;
export default _module_.exports;
