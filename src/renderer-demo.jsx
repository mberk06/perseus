import _simpleButtonJsx from "./simple-button.jsx";
import _itemRendererJsx from "./item-renderer.jsx";
import _perseusApiJsx from "./perseus-api.jsx";
import _reactDom from "react-dom";
import { StyleSheet, css } from "aphrodite";
import _react from "react";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;
/**
  * Demonstrates the rendered result of a Perseus question
  *
  * This mounts the ItemRenderer and adds functionality to
  * show hints and mark answers
  */

const React = _react;
const ReactDOM = _reactDom;

const ApiClassNames = _perseusApiJsx.ClassNames;
const ItemRenderer = _itemRendererJsx;
const SimpleButton = _simpleButtonJsx;

const defaultQuestion = {
    question: {
        content: "",
        images: {},
        widgets: {},
    },
    answerArea: {
        calculator: false,
    },
    itemDataVersion: {
        major: 0,
        minor: 1,
    },
    hints: [],
};

const RendererDemo = createReactClass({
    propTypes: {
        problemNum: PropTypes.number,
        question: PropTypes.any.isRequired,
    },

    getDefaultProps: function() {
        return {
            question: defaultQuestion,
            problemNum: 1,
        };
    },

    getInitialState: function() {
        return {
            // Matches ItemRenderer.showInput
            answer: {empty: true, correct: null},
            scratchpadEnabled: true,
            isMobile: navigator.userAgent.indexOf("Mobile") !== -1,
        };
    },

    componentDidMount: function() {
        ReactDOM.findDOMNode(this.refs.itemRenderer).focus();

        window.addEventListener("resize", this._handleResize);
    },

    componentWillUnmount: function() {
        window.removeEventListener("resize", this._handleResize);
    },

    onScore: function() {
        console.log(this.refs.itemRenderer.scoreInput()); // eslint-disable-line no-console
    },

    checkAnswer: function() {
        this.refs.itemRenderer.showRationalesForCurrentlySelectedChoices();
        this.setState(
            {
                answer: this.refs.itemRenderer.scoreInput(),
            },
            () => {
                this.refs.itemRenderer.deselectIncorrectSelectedChoices();
            }
        );
    },

    takeHint: function() {
        this.refs.itemRenderer.showHint();
    },

    _handleResize() {
        const isMobile = navigator.userAgent.indexOf("Mobile") !== -1;
        if (this.state.isMobile !== isMobile) {
            this.setState({isMobile});
        }
    },

    render: function() {
        const {isMobile} = this.state;

        const apiOptions = {
            getAnotherHint: () => {
                this.refs.itemRenderer.showHint();
            },
            isMobile,
            customKeypad: isMobile,
            setDrawingAreaAvailable: enabled => {
                this.setState({
                    scratchpadEnabled: enabled,
                });
            },
            styling: {
                radioStyleVersion: "final",
            },
        };

        const answer = this.state.answer;

        const rendererComponent = (
            <ItemRenderer
                item={this.props.question}
                ref="itemRenderer"
                problemNum={this.props.problemNum}
                initialHintsVisible={0}
                apiOptions={apiOptions}
                reviewMode={answer.correct}
            />
        );

        const showSmiley = !answer.empty && answer.correct;
        const answerButton = (
            <div>
                <SimpleButton
                    color={answer.empty || answer.correct ? "green" : "orange"}
                    onClick={this.checkAnswer}
                >
                    {answer.empty
                        ? "Check Answer"
                        : answer.correct ? "Correct!" : "Incorrect, try again."}
                </SimpleButton>
                <img
                    className={css(
                        styles.smiley,
                        !showSmiley && styles.hideSmiley
                    )}
                    src="/images/face-smiley.png"
                />
            </div>
        );

        const scratchpadEnabled = this.state.scratchpadEnabled;

        if (isMobile) {
            const className = "framework-perseus " + ApiClassNames.MOBILE;
            return (
                <div className={className}>
                    <div className={css(styles.problemAndAnswer)}>
                        {rendererComponent}
                        <div id="problem-area">
                            <div id="workarea" style={{marginLeft: 0}} />
                            <div id="hintsarea" />
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="renderer-demo framework-perseus">
                    <div className={css(styles.problemAndAnswer)}>
                        <div id="problem-area">
                            <div id="workarea" />
                            <div id="hintsarea" />
                        </div>
                        <div className={css(styles.answerAreaWrap)}>
                            <div id="answer-area">
                                <div className={css(styles.infoBox)}>
                                    <div id="solutionarea" />
                                    <div className={css(styles.answerButtons)}>
                                        {answerButton}
                                    </div>
                                </div>
                                <div className={css(styles.infoBox)}>
                                    <SimpleButton
                                        color={"orange"}
                                        onClick={this.takeHint}
                                    >
                                        Hint
                                    </SimpleButton>
                                </div>
                            </div>
                        </div>
                        <div style={{clear: "both"}} />
                    </div>
                    <div className="extras" style={{margin: 20}}>
                        <button onClick={this.onScore}>Score</button>
                        <span style={{marginLeft: 15}}>
                            Scratchpad
                            {scratchpadEnabled ? "" : "not "}
                            available
                        </span>
                    </div>
                    {rendererComponent}
                </div>
            );
        }
    },
});

const styles = StyleSheet.create({
    problemAndAnswer: {
        minHeight: 180,
        position: "relative",
    },
    smiley: {
        width: 28,
        position: "absolute",
        top: 7,
        left: 5,
        cursor: "pointer",
    },
    hideSmiley: {
        display: "none",
    },
    answerAreaWrap: {
        margin: "0px -8px 0 0",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 80,
        zIndex: 10000,
    },
    answerButtons: {
        margin: "0 -10px",
        padding: "10px 10px 0",
        position: "relative",
    },
    infoBox: {
        background: "#eee",
        border: "1px solid #aaa",
        color: "#333",
        marginBottom: 10,
        padding: 10,
        position: "relative",
        zIndex: 10,
        boxShadow: "0 1px 2px #ccc",
        overflow: "visible",
        ":before": {
            content: '" "',
            borderRight: "8px solid transparent",
            borderBottom: "8px solid #cccccc",
            height: 16,
            position: "absolute",
            right: -1,
            top: -24,
        },
    },
});

_module_.exports = RendererDemo;
export default _module_.exports;
