import _componentsNumberInputJsx from "../../components/number-input.jsx";
import _componentsMathInputJsx from "../../components/math-input.jsx";
import { ChangeableProps, change } from "../../mixins/changeable.jsx";
import _reactComponentsButtonGroupJsx from "react-components/button-group.jsx";
import _reactComponentsTexJsx from "react-components/tex.jsx";
import _react from "react";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;
/* eslint-disable react/sort-comp */
/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* To fix, remove an entry above, run ka-lint, and fix errors. */


const React = _react;
const TeX = _reactComponentsTexJsx;

const ButtonGroup = _reactComponentsButtonGroupJsx;
const MathInput = _componentsMathInputJsx;
const NumberInput = _componentsNumberInputJsx;

class ConstraintEditor extends React.Component {
    static defaultProps = {
        constraint: "none",
        snap: 0.5,
        constraintFn: "0",
        constraintXMin: "-10",
        constraintXMax: "10",
        constraintYMin: "-10",
        constraintYMax: "10",
    };

    change = (...args) => {
        return change.apply(this, args);
    };

    render() {
        return (
            <div>
                <div className="perseus-widget-row">
                    Constraint:{" "}
                    <ButtonGroup
                        value={this.props.constraint}
                        allowEmpty={false}
                        buttons={[
                            {value: "none", content: "None"},
                            {value: "snap", content: "Snap"},
                            {value: "x", content: "x="},
                            {value: "y", content: "y="},
                        ]}
                        onChange={this.change("constraint")}
                    />
                </div>
                {this.props.constraint === "snap" &&
                    <div className="perseus-widget-row">
                        Snap:{" "}
                        <NumberInput
                            value={this.props.snap}
                            placeholder={0}
                            onChange={this.change("snap")}
                        />
                    </div>}
                {this.props.constraint === "x" &&
                    <div className="graph-settings">
                        <div className="perseus-widget-row">
                            <TeX>x=</TeX>{" "}
                            <MathInput
                                buttonSets={[]}
                                buttonsVisible={"never"}
                                value={this.props.constraintFn}
                                onChange={this.change("constraintFn")}
                            />
                        </div>
                    </div>}
                {this.props.constraint === "y" &&
                    <div className="graph-settings">
                        <div className="perseus-widget-row">
                            <TeX>y=</TeX>{" "}
                            <MathInput
                                buttonSets={[]}
                                buttonsVisible={"never"}
                                value={this.props.constraintFn}
                                onChange={this.change("constraintFn")}
                            />
                        </div>
                    </div>}
                Ensure these are set so nothing can be dragged off the canvas:
                <div className="perseus-widget-row">
                    <div className="perseus-widget-row">
                        <TeX>x \in \Large[</TeX>{" "}
                        <MathInput
                            buttonSets={[]}
                            buttonsVisible={"never"}
                            value={this.props.constraintXMin}
                            onChange={this.change("constraintXMin")}
                        />
                        <TeX>, </TeX>{" "}
                        <MathInput
                            buttonSets={[]}
                            buttonsVisible={"never"}
                            value={this.props.constraintXMax}
                            onChange={this.change("constraintXMax")}
                        />{" "}
                        <TeX>\Large]</TeX>
                    </div>
                </div>
                <div className="perseus-widget-row">
                    <div className="perseus-widget-row">
                        <TeX>y \in \Large[</TeX>{" "}
                        <MathInput
                            buttonSets={[]}
                            buttonsVisible={"never"}
                            value={this.props.constraintYMin}
                            onChange={this.change("constraintYMin")}
                        />
                        <TeX>, </TeX>{" "}
                        <MathInput
                            buttonSets={[]}
                            buttonsVisible={"never"}
                            value={this.props.constraintYMax}
                            onChange={this.change("constraintYMax")}
                        />{" "}
                        <TeX>\Large]</TeX>
                    </div>
                </div>
            </div>
        );
    }
}

_module_.exports = ConstraintEditor;
export default _module_.exports;
