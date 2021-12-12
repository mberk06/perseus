import _categorizerJsx from "./categorizer.jsx";
import _componentsTextListEditorJsx from "../components/text-list-editor.jsx";
import _componentsPropCheckBoxJsx from "../components/prop-check-box.jsx";
import _mixinsEditorJsonifyJsx from "../mixins/editor-jsonify.jsx";
import _perseusApiJsx from "../perseus-api.jsx";
import _underscore from "underscore";
import _mixinsChangeableJsx from "../mixins/changeable.jsx";
import _react from "react";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;
/* eslint-disable brace-style, comma-dangle, indent, react/jsx-closing-bracket-location, react/sort-comp */
/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = _react;
const Changeable = _mixinsChangeableJsx;
const _ = _underscore;

const ApiOptions = _perseusApiJsx.Options;
const EditorJsonify = _mixinsEditorJsonifyJsx;
const PropCheckBox = _componentsPropCheckBoxJsx;
const TextListEditor = _componentsTextListEditorJsx;

const Categorizer = _categorizerJsx.widget;

const CategorizerEditor = React.createClass({
    propTypes: {
        ...Changeable.propTypes,
        apiOptions: ApiOptions.propTypes,
        items: React.PropTypes.arrayOf(React.PropTypes.string),
        categories: React.PropTypes.arrayOf(React.PropTypes.string),
        values: React.PropTypes.arrayOf(React.PropTypes.number),
        randomizeItems: React.PropTypes.bool,
    },

    getDefaultProps: function() {
        return {
            items: [],
            categories: [],
            values: [],
            randomizeItems: false,
        };
    },

    change(...args) {
        return Changeable.change.apply(this, args);
    },

    render: function() {
        return (
            <div>
                <div className="perseus-widget-row">
                    <PropCheckBox
                        label="Randomize item order"
                        labelAlignment="right"
                        randomizeItems={this.props.randomizeItems}
                        onChange={this.props.onChange}
                    />
                </div>
                Categories:
                <TextListEditor
                    options={this.props.categories}
                    onChange={cat => {
                        this.change("categories", cat);
                    }}
                    layout="horizontal"
                />
                Items:
                <TextListEditor
                    options={this.props.items}
                    onChange={items => {
                        this.change({
                            items: items,
                            // TODO(eater): This truncates props.values so there
                            // are never more correct answers than items,
                            // ensuring the widget is possible to answer
                            // correctly. It doesn't necessarly keep each
                            // answer with its corresponding item if an item
                            // is deleted from the middle. Inconvenient, but
                            // it's at least possible for content creators to
                            // catch and fix.
                            values: _.first(this.props.values, items.length),
                        });
                    }}
                    layout="vertical"
                />
                <Categorizer
                    apiOptions={this.props.apiOptions}
                    items={this.props.items}
                    categories={this.props.categories}
                    values={this.props.values}
                    onChange={newProps => {
                        this.props.onChange(newProps);
                    }}
                    trackInteraction={function() {}}
                />
            </div>
        );
    },

    serialize() {
        return EditorJsonify.serialize.call(this);
    },
});

_module_.exports = CategorizerEditor;
export default _module_.exports;
