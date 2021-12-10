import { containerSizeClass, getInteractiveBoxFromSizeClass } from "../util/sizing-utils.js";
import { GrapherUtil, allTypes, typeToButton, DEFAULT_GRAPHER_PROPS } from "./grapher/util.jsx";
import _grapherJsx from "./grapher.jsx";
import _reactComponentsMultiButtonGroupJsx from "react-components/multi-button-group.jsx";
import _componentsInfoTipJsx from "../components/info-tip.jsx";
import _componentsGraphSettingsJsx from "../components/graph-settings.jsx";
import _mixinsChangeableJsx from "../mixins/changeable.jsx";
import _underscore from "underscore";
import _react from "react";

var module = {
    exports: {}
};

var exports = module.exports;
/* eslint-disable comma-dangle, no-redeclare, no-var, object-curly-spacing, react/jsx-closing-bracket-location, react/sort-comp */
/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = _react;
const _ = _underscore;

const Changeable = _mixinsChangeableJsx;

const GraphSettings = _componentsGraphSettingsJsx;
const InfoTip = _componentsInfoTipJsx;
const MultiButtonGroup = _reactComponentsMultiButtonGroupJsx;

const Grapher = _grapherJsx.widget;

const GrapherEditor = React.createClass({
    propTypes: {
        ...Changeable.propTypes,
    },

    getDefaultProps: function() {
        return {
            correct: DEFAULT_GRAPHER_PROPS.plot,
            graph: DEFAULT_GRAPHER_PROPS.graph,
            availableTypes: DEFAULT_GRAPHER_PROPS.availableTypes,
        };
    },

    change(...args) {
        return Changeable.change.apply(this, args);
    },

    render: function() {
        const sizeClass = containerSizeClass.SMALL;
        let equationString;
        let graph;
        if (this.props.graph.valid === true) {
            var graphProps = {
                graph: this.props.graph,
                plot: this.props.correct,
                availableTypes: this.props.availableTypes,
                onChange: (newProps, cb) => {
                    var correct = this.props.correct;
                    if (correct.type === newProps.plot.type) {
                        correct = _.extend({}, correct, newProps.plot);
                    } else {
                        // Clear options from previous graph
                        correct = newProps.plot;
                    }
                    this.props.onChange({correct: correct}, cb);
                },
                trackInteraction: function() {},
            };

            graph = (
                <Grapher
                    {...graphProps}
                    apiOptions={this.props.apiOptions}
                    containerSizeClass={sizeClass}
                />
            );
            equationString = GrapherUtil.getEquationString(graphProps);
        } else {
            graph = (
                <div className="perseus-error">
                    {this.props.graph.valid}
                </div>
            );
        }

        return (
            <div>
                <div>
                    Correct answer{" "}
                    <InfoTip>
                        <p>
                            Graph the correct answer in the graph below and
                            ensure the equation or point coordinates displayed
                            represent the correct answer.
                        </p>
                    </InfoTip>{" "}
                    : {equationString}
                </div>

                <GraphSettings
                    editableSettings={["graph", "snap", "image"]}
                    box={getInteractiveBoxFromSizeClass(sizeClass)}
                    range={this.props.graph.range}
                    labels={this.props.graph.labels}
                    step={this.props.graph.step}
                    gridStep={this.props.graph.gridStep}
                    snapStep={this.props.graph.snapStep}
                    valid={this.props.graph.valid}
                    backgroundImage={this.props.graph.backgroundImage}
                    markings={this.props.graph.markings}
                    rulerLabel={this.props.graph.rulerLabel}
                    rulerTicks={this.props.graph.rulerTicks}
                    showTooltips={this.props.graph.showTooltips}
                    onChange={this.change("graph")}
                />
                <div className="perseus-widget-row">
                    <label>Available functions:  </label>
                    <MultiButtonGroup
                        allowEmpty={false}
                        values={this.props.availableTypes}
                        buttons={_.map(allTypes, typeToButton)}
                        onChange={this.handleAvailableTypesChange}
                    />
                </div>
                {graph}
            </div>
        );
    },

    handleAvailableTypesChange: function(newAvailableTypes) {
        var correct = this.props.correct;

        // If the currently 'correct' type is removed from the list of types,
        // we need to change it to avoid impossible questions.
        if (!_.contains(newAvailableTypes, this.props.correct.type)) {
            var graph = this.props.graph;
            var newType = GrapherUtil.chooseType(newAvailableTypes);
            var correct = GrapherUtil.defaultPlotProps(newType, graph);
        }
        this.props.onChange({
            availableTypes: newAvailableTypes,
            correct: correct,
        });
    },

    serialize: function() {
        return _.chain(this.props)
            .pick("correct", "availableTypes")
            .extend({graph: _.omit(this.props.graph, "box")})
            .value();
    },
});

module.exports = GrapherEditor;
export default module.exports;
