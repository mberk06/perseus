import _tableJsx from "./table.jsx";
import _editorJsx from "../editor.jsx";
import _componentsNumberInputJsx from "../components/number-input.jsx";
import _componentsInfoTipJsx from "../components/info-tip.jsx";
import _utilJs from "../util.js";
import _underscore from "underscore";
import _reactDom from "react-dom";
import _react from "react";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;
/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/prop-types, react/sort-comp */
/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = _react;
const ReactDOM = _reactDom;
const _ = _underscore;

const Util = _utilJs;

const InfoTip = _componentsInfoTipJsx;
const NumberInput = _componentsNumberInputJsx;
const Editor = _editorJsx;

const Table = _tableJsx.widget;

const TableEditor = createReactClass({
    propTypes: {
        rows: PropTypes.number,
        columns: PropTypes.number,
        headers: PropTypes.arrayOf(PropTypes.string),
        answers: PropTypes.arrayOf(
            PropTypes.arrayOf(PropTypes.string)
        ),
    },

    getDefaultProps: function() {
        var defaultRows = 4;
        var defaultColumns = 1;
        var blankAnswers = _.times(defaultRows, function() {
            return Util.stringArrayOfSize(defaultColumns);
        });
        return {
            headers: [""],
            rows: defaultRows,
            columns: defaultColumns,
            answers: blankAnswers,
        };
    },

    focus: function() {
        ReactDOM.findDOMNode(this.refs.numberOfColumns).focus();
    },

    render: function() {
        var tableProps = _.pick(
            this.props,
            "headers",
            "answers",
            "onChange",
            "apiOptions"
        );
        _.extend(tableProps, {
            editableHeaders: true,
            Editor,
            onFocus: () => {},
            onBlur: () => {},
            trackInteraction: () => {},
        });

        return (
            <div>
                <div className="perseus-widget-row">
                    <label>
                        Number of columns:{" "}
                        <NumberInput
                            ref="numberOfColumns"
                            value={this.props.columns}
                            onChange={val => {
                                if (val) {
                                    this.onSizeInput(this.props.rows, val);
                                }
                            }}
                            useArrowKeys={true}
                        />
                    </label>
                </div>
                <div className="perseus-widget-row">
                    <label>
                        Number of rows:{" "}
                        <NumberInput
                            ref="numberOfRows"
                            value={this.props.rows}
                            onChange={val => {
                                if (val) {
                                    this.onSizeInput(val, this.props.columns);
                                }
                            }}
                            useArrowKeys={true}
                        />
                    </label>
                </div>
                <div>
                    {" "}Table of answers:{" "}
                    <InfoTip>
                        <p>
                            The student has to fill out all cells in the table.
                            For partially filled tables create a table using the
                            template, and insert text input boxes as desired.
                        </p>
                    </InfoTip>
                </div>
                <div>
                    <Table {...tableProps} />
                </div>
            </div>
        );
    },

    onSizeInput: function(numRawRows, numRawColumns) {
        var rows = +numRawRows || 0;
        var columns = +numRawColumns || 0;
        rows = Math.min(Math.max(1, rows), 30);
        columns = Math.min(Math.max(1, columns), 6);
        var oldColumns = this.props.columns;
        var oldRows = this.props.rows;

        var answers = this.props.answers;
        // Truncate if necessary; else, append
        if (rows <= oldRows) {
            answers.length = rows;
        } else {
            _.times(rows - oldRows, function() {
                answers.push(Util.stringArrayOfSize(oldColumns));
            });
        }

        function fixColumnSizing(array) {
            // Truncate if necessary; else, append
            if (columns <= oldColumns) {
                array.length = columns;
            } else {
                _.times(columns - oldColumns, function() {
                    array.push("");
                });
            }
        }

        var headers = this.props.headers;
        fixColumnSizing(headers);
        _.each(answers, fixColumnSizing);

        this.props.onChange({
            rows: rows,
            columns: columns,
            answers: answers,
            headers: headers,
        });
    },

    serialize: function() {
        var json = _.pick(this.props, "headers", "rows", "columns");

        return _.extend({}, json, {
            answers: _.map(this.props.answers, _.clone),
        });
    },
});

_module_.exports = TableEditor;
export default _module_.exports;
