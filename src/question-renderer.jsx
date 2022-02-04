import * as React from 'react';
import ReactDOM from 'react-dom';
import _ from "underscore";
import { mapObject } from "./interactive2/objective_.js";
import Util from "./util.js";
import Renderer from "./renderer.jsx";
import ProvideKeypad from "./mixins/provide-keypad.jsx";
import HintsRenderer from "./hints-renderer.jsx";
import { Options as ApiOptions } from "./perseus-api.jsx";
import { StyleSheet, css } from "aphrodite";

/**
 * A copy of the ItemRenderer which renders its question renderer and hints
 * renderer normally instead of ReactDOM.render()ing them into elements in the
 * DOM.
 *
 * As well as check answer, grading, and hints buttons built in
 */

const QuestionRenderer = createReactClass({
    propTypes: {
        ...ProvideKeypad.propTypes,
        apiOptions: PropTypes.any,
        initialHintsVisible: PropTypes.number,
        item: PropTypes.shape({
            answerArea: PropTypes.shape({
                calculator: PropTypes.bool,
                chi2Table: PropTypes.bool,
                periodicTable: PropTypes.bool,
                tTable: PropTypes.bool,
                zTable: PropTypes.bool,
            }),
            hints: PropTypes.arrayOf(PropTypes.object),
            question: PropTypes.object,
        }).isRequired,
        problemNum: PropTypes.number,
        reviewMode: PropTypes.bool,
    },

    getDefaultProps: function() {
        return {
            apiOptions: {}, // a deep default is done in `this.update()`
            initialHintsVisible: 0,
            problemNum: 0,
            reviewMode: false,
        };
    },

    getInitialState: function() {
        return {
            ...ProvideKeypad.getInitialState(),
            hintsVisible: this.props.initialHintsVisible,
            answerState: 'unanswered',
            questionHighlightedWidgets: [],
        };
    },

    componentDidMount: function() {
        ProvideKeypad.componentDidMount.call(this);
        this._currentFocus = null;
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            questionHighlightedWidgets: [],
        });
    },

    componentDidUpdate: function() {
        if (this.props.apiOptions.answerableCallback) {
            const isAnswerable =
                this.questionRenderer.emptyWidgets().length === 0;
            this.props.apiOptions.answerableCallback(isAnswerable);
        }
    },

    componentWillUnmount() {
        ProvideKeypad.componentWillUnmount.call(this);
    },

    keypadElement() {
        return ProvideKeypad.keypadElement.call(this);
    },

    _handleFocusChange: function(newFocus, oldFocus) {
        if (newFocus != null) {
            this._setCurrentFocus(newFocus);
        } else {
            this._onRendererBlur(oldFocus);
        }
    },

    // Sets the current focus path and element and
    // send an onChangeFocus event back to our parent.
    _setCurrentFocus: function(newFocus) {
        const keypadElement = this.keypadElement();

        // By the time this happens, newFocus cannot be a prefix of
        // prevFocused, since we must have either been called from
        // an onFocusChange within a renderer, which is only called when
        // this is not a prefix, or between the question and answer areas,
        // which can never prefix each other.
        const prevFocus = this._currentFocus;
        this._currentFocus = newFocus;

        // Determine whether the newly focused path represents an input.
        const inputPaths = this.getInputPaths();
        const didFocusInput =
            this._currentFocus &&
            inputPaths.some(inputPath => {
                return Util.inputPathsEqual(inputPath, this._currentFocus);
            });

        if (this.props.apiOptions.onFocusChange != null) {
            this.props.apiOptions.onFocusChange(
                this._currentFocus,
                prevFocus,
                didFocusInput &&
                    keypadElement &&
                    ReactDOM.findDOMNode(keypadElement)
            );
        }

        if (keypadElement) {
            if (didFocusInput) {
                keypadElement.activate();
            } else {
                keypadElement.dismiss();
            }
        }
    },

    _onRendererBlur: function(blurPath) {
        const blurringFocusPath = this._currentFocus;

        // Failsafe: abort if ID is different, because focus probably happened
        // before blur
        if (!_.isEqual(blurPath, blurringFocusPath)) {
            return;
        }

        // Wait until after any new focus events fire this tick before
        // declaring that nothing is focused.
        // If a different widget was focused, we'll see an onBlur event
        // now, but then an onFocus event on a different element before
        // this callback is executed
        _.defer(() => {
            if (_.isEqual(this._currentFocus, blurringFocusPath)) {
                this._setCurrentFocus(null);
            }
        });
    },

    /**
     * Accepts a question area widgetId, or an answer area widgetId of
     * the form "answer-input-number 1", or the string "answer-area"
     * for the whole answer area (if the answer area is a single widget).
     */
    _setWidgetProps: function(widgetId, newProps, callback) {
        this.questionRenderer._setWidgetProps(widgetId, newProps, callback);
    },

    _handleAPICall: function(functionName, path) {
        // Get arguments to pass to function, including `path`
        const functionArgs = _.rest(arguments);
        const caller = this.questionRenderer;

        return caller[functionName](...functionArgs);
    },

    setInputValue: function(path, newValue, focus) {
        return this._handleAPICall("setInputValue", path, newValue, focus);
    },

    focusPath: function(path) {
        return this._handleAPICall("focusPath", path);
    },

    blurPath: function(path) {
        return this._handleAPICall("blurPath", path);
    },

    getDOMNodeForPath: function(path) {
        return this._handleAPICall("getDOMNodeForPath", path);
    },

    getGrammarTypeForPath: function(path) {
        return this._handleAPICall("getGrammarTypeForPath", path);
    },

    getInputPaths: function() {
        const questionAreaInputPaths = this.questionRenderer.getInputPaths();
        return questionAreaInputPaths;
    },

    handleInteractWithWidget: function(widgetId) {
        const withRemoved = _.difference(
            this.state.questionHighlightedWidgets,
            [widgetId]
        );
        this.setState({
            answerState: "unanswered",
            questionHighlightedWidgets: withRemoved,
        });

        if (this.props.apiOptions.interactionCallback) {
            this.props.apiOptions.interactionCallback();
        }
    },

    focus: function() {
        return this.questionRenderer.focus();
    },

    blur: function() {
        if (this._currentFocus) {
            this.blurPath(this._currentFocus);
        }
    },

    showHint: function() {
        if (this.state.hintsVisible < this.getNumHints()) {
            console.log(`Hint ${this.state.hintsVisible + 1} shown`);
            this.setState({
                hintsVisible: this.state.hintsVisible + 1,
            });
        }
    },

    getNumHints: function() {
        return this.props.item.hints.length;
    },

    /**
     * Grades the item.
     *
     * Returns a KE-style score of {
     *     empty: bool,
     *     correct: bool,
     *     message: string|null,
     *     guess: Array
     * }
     */
    scoreInput: function() {
        const guessAndScore = this.questionRenderer.guessAndScore();
        const guess = guessAndScore[0];
        const score = guessAndScore[1];

        // Continue to include an empty guess for the now defunct answer area.
        // TODO(alex): Check whether we rely on the format here for
        //             analyzing ProblemLogs. If not, remove this layer.
        const maxCompatGuess = [guess, []];

        const keScore = Util.keScoreFromPerseusScore(
            score,
            maxCompatGuess,
            this.questionRenderer.getSerializedState()
        );

        const emptyQuestionAreaWidgets = this.questionRenderer.emptyWidgets();

        this.setState({
            answerState: keScore.correct ? "correct" : "incorrect",
            questionHighlightedWidgets: emptyQuestionAreaWidgets,
        });

        return keScore;
    },

    checkAnswer: function(e) {
        const score = this.scoreInput();
        e.preventDefault();
        console.log("Check answer:", score);
    },

    /**
     * Returns an array of all widget IDs in the order they occur in
     * the question content.
     */
    getWidgetIds: function() {
        return this.questionRenderer.getWidgetIds();
    },

    /**
     * Returns an object mapping from widget ID to KE-style score.
     * The keys of this object are the values of the array returned
     * from `getWidgetIds`.
     */
    scoreWidgets: function() {
        const qScore = this.questionRenderer.scoreWidgets();
        const qGuess = this.questionRenderer.getUserInputForWidgets();
        const state = this.questionRenderer.getSerializedState();
        return mapObject(qScore, (score, id) => {
            return Util.keScoreFromPerseusScore(score, qGuess[id], state);
        });
    },

    /**
     * Get a representation of the current state of the item.
     */
    getSerializedState: function() {
        return {
            question: this.questionRenderer.getSerializedState(),
            hints: this.hintsRenderer.getSerializedState(),
        };
    },

    restoreSerializedState: function(state, callback) {
        // We need to wait for both the question renderer and the hints
        // renderer to finish restoring their states.
        let numCallbacks = 2;
        const fireCallback = () => {
            --numCallbacks;
            if (callback && numCallbacks === 0) {
                callback();
            }
        };

        this.questionRenderer.restoreSerializedState(
            state.question,
            fireCallback
        );
        this.hintsRenderer.restoreSerializedState(state.hints, fireCallback);
    },

    showRationalesForCurrentlySelectedChoices() {
        this.questionRenderer.showRationalesForCurrentlySelectedChoices();
    },

    deselectIncorrectSelectedChoices() {
        this.questionRenderer.deselectIncorrectSelectedChoices();
    },

    render: function() {
        const apiOptions = {
            ...ApiOptions.defaults,
            ...this.props.apiOptions,
            onFocusChange: this._handleFocusChange,
        };

        const questionRenderer = (
            <Renderer
                keypadElement={this.keypadElement()}
                problemNum={this.props.problemNum}
                onInteractWithWidget={this.handleInteractWithWidget}
                highlightedWidgets={this.state.questionHighlightedWidgets}
                apiOptions={apiOptions}
                questionCompleted={this.state.answerState === "correct"}
                reviewMode={this.props.reviewMode}
                ref={elem => this.questionRenderer = elem}
                {...this.props.item.question}
            />
        );

        const hintsRenderer = (
            <HintsRenderer
                hints={this.props.item.hints}
                hintsVisible={this.state.hintsVisible}
                apiOptions={apiOptions}
                ref={elem => this.hintsRenderer = elem}
            />
        );

        const isOutOfHints = this.state.hintsVisible >= this.getNumHints()

        return (
            <form
                onSubmit={this.checkAnswer}
            >
                <div>
                    {questionRenderer}
                </div>
                <div style={{ paddingTop: 10, paddingBottom: 10 }}>
                    <button
                        type="submit"
                        style={{
                            padding: 10,
                            backgroundColor: "green",
                            color: "white",
                            fontSize: 14,
                            borderRadius: 5,
                        }}
                        disabled={this.state.answerState === "correct"}
                    >
                        {this.state.answerState === "correct" ?
                            "🌟 Yes! You got it!" :
                          this.state.answerState === "incorrect" ?
                            "Try again" :
                            "Check answer"
                        }
                    </button>
                    <div style={{ display: 'inline-block', width: 10 }} />
                    <button
                        type="button"
                        style={{
                            padding: 10,
                            backgroundColor: isOutOfHints ? "darkgray" : "orange",
                            color: "white",
                            fontSize: 14,
                            borderRadius: 5,
                        }}
                        disabled={isOutOfHints}
                        onClick={this.showHint}
                    >
                        {isOutOfHints ?
                            "We're out of hints!" :
                            "I'd like a hint!"
                        }
                    </button>
                </div>
                <div
                    className={
                        // Avoid adding any horizontal padding when applying the
                        // mobile hint styles, which are flush to the left.
                        // NOTE(charlie): We may still want to apply this
                        // padding for desktop exercises.
                        !apiOptions.isMobile && css(styles.hintsContainer)
                    }
                >
                    {hintsRenderer}
                </div>
            </form>
        );
    },
});

const styles = StyleSheet.create({
    hintsContainer: {
        marginLeft: 50,
    },
});

export default QuestionRenderer;
