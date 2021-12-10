import _utilJs from "../util.js";
import { buildMapper } from "./trees.js";
import _rendererJsx from "../renderer.jsx";
import _hintsRendererJsx from "../hints-renderer.jsx";
import { itemToTree } from "./items.js";
import _react from "react";
import _hubbleIndexJs from "../../hubble/index.js";
import { StyleSheet, css } from "aphrodite";

var module = {
    exports: {}
};

var exports = module.exports;
const lens = _hubbleIndexJs;
const React = _react;

const HintsRenderer = _hintsRendererJsx;
const Renderer = _rendererJsx;
const Util = _utilJs;



class MultiRenderer extends React.Component {
    constructor(props) {
        super(props);

        this.rendererDataTreeMapper = buildMapper()
            .setContentMapper((c, _, p) => this._makeContentRendererData(c, p))
            .setHintMapper(h => this._makeHintRendererData(h))
            .setTagsMapper(t => null);

        this.getRenderersMapper = buildMapper()
            .setContentMapper(c => c.makeRenderer())
            .setHintMapper(h => h.makeRenderer())
            .setArrayMapper(this._annotateRendererArray.bind(this));

        // Keep state in sync with props.
        this.state = this._tryMakeRendererState(this.props);
    }
    /* eslint-enable react/sort-comp */

    componentWillReceiveProps(nextProps) {
        // Keep state in sync with props.
        if (nextProps.item !== this.props.item) {
            this.setState(this._tryMakeRendererState(nextProps));
        }
    }

    /**
     * Attempt to build a State that includes a renderer tree corresponding to
     * the item provided in props. On error, return a state with `renderError`
     * set instead.
     */
    _tryMakeRendererState(props) {
        try {
            return {
                rendererDataTree: this._makeRendererDataTree(
                    props.item, props.shape),
                renderError: null,
            };
        } catch (e) {
            // NOTE(mdr): It's appropriate to log an error traceback in a
            //     caught error condition, and console.error is supported in
            //     all target browsers. Just do it, linter.
            // eslint-disable-next-line no-console
            console.error(e);
            return {
                rendererDataTree: null,
                renderError: e,
            };
        }
    }

    _handleSerializedStateUpdated = (path, newState) => {
        const {onSerializedStateUpdated} = this.props;

        if (onSerializedStateUpdated) {
            const oldState = this._getSerializedState(
                this.props.serializedState);
            onSerializedStateUpdated(
                lens(oldState).set(path, newState).freeze());
        }
    }

    /**
     * Props that aren't directly used by the MultiRenderer are delegated to
     * the underlying Renderers.
     */
    _getRendererProps() {
        /* eslint-disable no-unused-vars */
        // eslint is complaining that `item` and `children` are unused. I'm
        // explicitly pulling them out of `this.props` so I don't pass them to
        // `<Renderer>`. I'm not sure how else to do this.
        const {
            item,
            children,
            shape,
            ...otherProps
        } = this.props;
        /* eslint-enable no-unused-vars */

        return otherProps;
    }

    /**
     * Construct a Renderer and a ref placeholder for the given ContentNode.
     */
    _makeContentRendererData(content, path) {
        // NOTE(emily): The `findExternalWidgets` function here is computed
        //     inline and thus changes each time we run this function. If it
        //     were to change every render, it would cause the Renderer to
        //     re-render a lot more than is necessary. Don't re-compute this
        //     element unless it is necessary!
        // HACK(mdr): Flow can't prove that this is a ContentRendererData,
        //     because of how we awkwardly construct it in order to obtain a
        //     circular reference. But it is, I promise.
        const data = {ref: null, makeRenderer: null};

        const refFunc = e => data.ref = e;
        const findExternalWidgets =
            criterion => this._findWidgets(data, criterion);
        const handleSerializedState = state => this._handleSerializedStateUpdated(path, state);

        data.makeRenderer = () => <Renderer
            {...this._getRendererProps()}
            {...content}
            ref={refFunc}
            findExternalWidgets={findExternalWidgets}
            serializedState={this.props.serializedState
                ? lens(this.props.serializedState).get(path)
                : null}
            onSerializedStateUpdated={handleSerializedState}
        />;
        return data;
    }

    /**
     * Construct a Renderer for the given HintNode, and keep track of the hint
     * itself for future use, too.
     */
    _makeHintRendererData(hint) {
        // TODO(mdr): Once HintsRenderer supports inter-widget communication,
        //     give it a ref. Until then, leave the ref null forever, to avoid
        //     confusing the findWidgets functions.
        //
        // NOTE(davidflanagan): As a partial step toward inter-widget
        // communication we're going to pass a findExternalWidgets function
        // (using a dummy data object). This allows passage-ref widgets in
        // hints to use findWidget() to find the passage widgets they reference.
        // Note that this is one-way only, however. It does not allow
        // widgets in the question to find widgets in the hints, for example.
        const findExternalWidgets =
              criterion => this._findWidgets({}, criterion);

        return {
            hint,
            findExternalWidgets, // _annotateRendererArray() needs this
            ref: null,
            makeRenderer: () => <HintsRenderer
                {...this._getRendererProps()}
                findExternalWidgets={findExternalWidgets}
                hints={[hint]}
            />,
        };
    }

    /**
     * Construct a tree of interconnected RendererDatas, corresponding to the
     * given item. Called in `_tryMakeRendererState`, in order to store this
     * tree in the component state.
     */
    _makeRendererDataTree(item, shape) {
        const itemTree = itemToTree(item);
        return this.rendererDataTreeMapper.mapTree(itemTree, shape);
    }

    /**
     * Return all widgets that meet the given criterion, from all Renderers
     * except the Renderer that triggered this call.
     *
     * This function is provided to each Renderer's `findExternalWidgets` prop,
     * which enables widgets in different Renderers to discover each other and
     * communicate.
     */
    _findWidgets(callingData, filterCriterion) {
        const results = [];

        this._mapRenderers(data => {
            if (callingData !== data && data.ref) {
                results.push(...data.ref.findInternalWidgets(filterCriterion));
            }
        });

        return results;
    }

    /**
     * Copy the renderer tree, apply the given transformation to the leaf nodes
     * and the optional given transformation to the array nodes, and return the
     * result.
     *
     * Used to provide structured data to the call site (the Renderer tree on
     * `render`, the Score tree on `getScores`, etc.), and to traverse the
     * renderer tree even when we disregard the output (like in
     * `_findWidgets`).
     */
    _mapRenderers(leafMapper) {
        const {rendererDataTree} = this.state;

        if (!rendererDataTree) {
            return null;
        }

        const mapper = buildMapper()
            .setContentMapper(leafMapper)
            .setHintMapper(leafMapper);
        return mapper.mapTree(rendererDataTree, this.props.shape);
    }

    _scoreFromRef(ref) {
        if (!ref) {
            return null;
        }

        const [guess, score] = ref.guessAndScore();
        let state;
        if (ref.getSerializedState) {
            state = ref.getSerializedState();
        }
        return Util.keScoreFromPerseusScore(score, guess, state);
    }

    /**
     * Return a tree in the shape of the multi-item, with scores at each of
     * the content nodes and `null` at the other leaf nodes.
     */
    getScores() {
        return this._mapRenderers(data => this._scoreFromRef(data.ref));
    }

    /**
     * Return a single composite score for all rendered content nodes.
     * The `guess` is a tree in the shape of the multi-item, with an individual
     * guess at each content node and `null` at the other leaf nodes.
     */
    score() {
        const scores = [];
        const state = [];
        const guess = this._mapRenderers(data => {
            if (!data.ref) {
                return null;
            }

            if (data.ref.getSerializedState) {
                state.push(data.ref.getSerializedState());
            }

            scores.push(data.ref.score());
            return data.ref.getUserInput();
        });

        const combinedScore = scores.reduce(Util.combineScores);

        return Util.keScoreFromPerseusScore(combinedScore, guess, state);
    }

    /**
     * Return a tree in the shape of the multi-item, with serialized state at
     * each of the content nodes and `null` at the other leaf nodes.
     *
     * If the lastSerializedState argument is supplied, this function will fill
     * in the state of not-currently-rendered content and hint nodes with the
     * values from the previous serialized state. If no lastSerializedState is
     * supplied, `null` will be returned for not-currently-rendered content and
     * hint nodes.
     */
    _getSerializedState(lastSerializedState) {
        return this._mapRenderers((data, _, path) => {
            if (data.ref) {
                return data.ref.getSerializedState();
            } else if (lastSerializedState) {
                return lens(lastSerializedState).get(path);
            } else {
                return null;
            }
        });
    }

    /**
     * Given a tree in the shape of the multi-item, with serialized state at
     * each of the content nodes, restore each state to the corresponding
     * renderer if currently mounted.
     */
    restoreSerializedState(serializedState, callback) {
        // We want to call our async callback only once all of the childrens'
        // callbacks have run. We add one to this counter before we call out to
        // each renderer and decrement it when it runs our callback.
        let numCallbacks = 0;
        const countCallback = () => {
            numCallbacks--;
            if (callback && numCallbacks === 0) {
                callback();
            }
        };

        this._mapRenderers((data, _, path) => {
            if (!data.ref) {
                return;
            }

            const state = lens(serializedState).get(path);
            if (!state) {
                return;
            }

            numCallbacks++;
            data.ref.restoreSerializedState(state, countCallback);
        });
    }

    /**
     * Given an array of renderers, if it happens to be an array of *hint*
     * renderers, then attach a `firstN` method to the array, which allows the
     * layout to render the hints together in one HintsRenderer.
     */
    _annotateRendererArray(renderers, rendererDatas, shape) {
        if (shape.elementShape.type === "hint") {
            // The shape says that these are HintRendererDatas, even though
            // it's not provable at compile time, so perform a cast.
            const hintRendererDatas =
                (rendererDatas);

            renderers = [...renderers];
            (renderers).firstN = n => <HintsRenderer
                {...this._getRendererProps()}
                findExternalWidgets={
                    hintRendererDatas[0]
                        ? hintRendererDatas[0].findExternalWidgets
                        : undefined
                }
                hints={hintRendererDatas.map(d => d.hint)}
                hintsVisible={n}
            />;
        }
        return renderers;
    }

    /**
     * Return a tree in the shape of the multi-item, with a Renderer at each
     * content node and a HintRenderer at each hint node.
     *
     * This is generated by running each of the `makeRenderer` functions at the
     * leaf nodes.
     */
    _getRenderers() {
        return this.getRenderersMapper.mapTree(
            this.state.rendererDataTree, this.props.shape);
    }

    render() {
        if (this.state.renderError) {
            return <div className={css(styles.error)}>
                Error rendering: {String(this.state.renderError)}
            </div>;
        }

        // Pass the renderer tree to the `children` function, which will
        // determine the actual content of this component.
        return this.props.children({
            renderers: this._getRenderers(),
        });
    }
}

const styles = StyleSheet.create({
    error: {
        color: "red",
    },
});

module.exports = MultiRenderer;
export default module.exports;
