import _componentsInlineIconJsx from "../../components/inline-icon.jsx";

import {
    iconChevronDown,
    iconChevronRight,
    iconCircleArrowDown,
    iconCircleArrowUp,
    iconTrash,
} from "../../icon-paths.js";

import _react from "react";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;
/* eslint-disable react/sort-comp */
/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* To fix, remove an entry above, run ka-lint, and fix errors. */


const React = _react;

const InlineIcon = _componentsInlineIconJsx;

class ElementContainer extends React.Component {
    static defaultProps = {
        initiallyVisible: false,
        title: "More",
    };

    constructor(props) {
        super(props);

        this.state = {
            show: props.initiallyVisible,
        };
    }

    toggle = e => {
        e.preventDefault();
        this.setState({show: !this.state.show});
    };

    render() {
        return (
            <div className="perseus-interaction-element">
                <a
                    href="#"
                    className={
                        "perseus-interaction-element-title " +
                        (this.state.show ? "open" : "closed")
                    }
                    onClick={this.toggle}
                >
                    {this.state.show
                        ? <InlineIcon {...iconChevronDown} />
                        : <InlineIcon {...iconChevronRight} />}
                    {this.props.title}
                </a>
                <div
                    className={
                        "perseus-interaction-element-content " +
                        (this.state.show ? "enter" : "leave")
                    }
                >
                    {this.props.children}
                    {(this.props.onUp != null ||
                        this.props.onDown != null ||
                        this.props.onDelete != null) &&
                        <div className={"edit-controls"}>
                            {this.props.onUp != null &&
                                <button onClick={this.props.onUp}>
                                    <InlineIcon {...iconCircleArrowUp} />
                                </button>}
                            {this.props.onDown != null &&
                                <button onClick={this.props.onDown}>
                                    <InlineIcon {...iconCircleArrowDown} />
                                </button>}
                            {this.props.onDelete != null &&
                                <button onClick={this.props.onDelete}>
                                    <InlineIcon {...iconTrash} />
                                </button>}
                        </div>}
                </div>
            </div>
        );
    }
}

_module_.exports = ElementContainer;
export default _module_.exports;
