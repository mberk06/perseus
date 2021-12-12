// TODO(aria): Re-enable all widgets

//import _widgetsSimpleMarkdownTesterEditorJsx from "./widgets/simple-markdown-tester-editor.jsx";
//import _widgetsSimpleMarkdownTesterJsx from "./widgets/simple-markdown-tester.jsx";
//import _widgetsExampleWidgetEditorJsx from "./widgets/example-widget-editor.jsx";
//import _widgetsExampleWidgetJsx from "./widgets/example-widget.jsx";
//import _widgetsExampleGraphieWidgetEditorJsx from "./widgets/example-graphie-widget-editor.jsx";
//import _widgetsExampleGraphieWidgetJsx from "./widgets/example-graphie-widget.jsx";
//import _widgetsVideoEditorJsx from "./widgets/video-editor.jsx";
//import _widgetsVideoJsx from "./widgets/video.jsx";
//import _widgetsUnitEditorJsx from "./widgets/unit-editor.jsx";
//import _widgetsUnitJsx from "./widgets/unit.jsx";
//import _widgetsTransformerEditorJsx from "./widgets/transformer-editor.jsx";
//import _widgetsTransformerJsx from "./widgets/transformer.jsx";
//import _widgetsTableEditorJsx from "./widgets/table-editor.jsx";
//import _widgetsTableJsx from "./widgets/table.jsx";
//import _widgetsSorterEditorJsx from "./widgets/sorter-editor.jsx";
//import _widgetsSorterJsx from "./widgets/sorter.jsx";
//import _widgetsSimulatorEditorJsx from "./widgets/simulator-editor.jsx";
//import _widgetsSimulatorJsx from "./widgets/simulator.jsx";
//import _widgetsSequenceEditorJsx from "./widgets/sequence-editor.jsx";
//import _widgetsSequenceJsx from "./widgets/sequence.jsx";
//import _widgetsReactionDiagramEditorJsx from "./widgets/reaction-diagram-editor.jsx";
//import _widgetsReactionDiagramJsx from "./widgets/reaction-diagram.jsx";
//import _widgetsPlotterEditorJsx from "./widgets/plotter-editor.jsx";
//import _widgetsPlotterJsx from "./widgets/plotter.jsx";
//import _widgetsPassageRefTargetEditorJsx from "./widgets/passage-ref-target-editor.jsx";
//import _widgetsPassageRefTargetJsx from "./widgets/passage-ref-target.jsx";
//import _widgetsPassageRefEditorJsx from "./widgets/passage-ref-editor.jsx";
//import _widgetsPassageRefJsx from "./widgets/passage-ref.jsx";
//import _widgetsPassageEditorJsx from "./widgets/passage-editor.jsx";
//import _widgetsPassageJsx from "./widgets/passage.jsx";
//import _widgetsOrdererEditorJsx from "./widgets/orderer-editor.jsx";
//import _widgetsOrdererJsx from "./widgets/orderer.jsx";
//import _widgetsNumberLineEditorJsx from "./widgets/number-line-editor.jsx";
//import _widgetsNumberLineJsx from "./widgets/number-line.jsx";
//import _widgetsMoleculeEditorJsx from "./widgets/molecule-editor.jsx";
//import _widgetsMoleculeJsx from "./widgets/molecule.jsx";
//import _widgetsMeasurerEditorJsx from "./widgets/measurer-editor.jsx";
//import _widgetsMeasurerJsx from "./widgets/measurer.jsx";
//import _widgetsMatcherEditorJsx from "./widgets/matcher-editor.jsx";
//import _widgetsMatcherJsx from "./widgets/matcher.jsx";
//import _widgetsMatrixEditorJsx from "./widgets/matrix-editor.jsx";
//import _widgetsMatrixJsx from "./widgets/matrix.jsx";
//import _widgetsLightsPuzzleEditorJsx from "./widgets/lights-puzzle-editor.jsx";
//import _widgetsLightsPuzzleJsx from "./widgets/lights-puzzle.jsx";
//import _widgetsInteractiveGraphEditorJsx from "./widgets/interactive-graph-editor.jsx";
//import _widgetsInteractiveGraphJsx from "./widgets/interactive-graph.jsx";
//import _widgetsInteractionEditorJsx from "./widgets/interaction-editor.jsx";
//import _widgetsInteractionJsx from "./widgets/interaction.jsx";
//import _widgetsImageEditorJsx from "./widgets/image-editor.jsx";
//import _widgetsImageJsx from "./widgets/image.jsx";
//import _widgetsIframeEditorJsx from "./widgets/iframe-editor.jsx";
//import _widgetsIframeJsx from "./widgets/iframe.jsx";
//import _widgetsGroupEditorJsx from "./widgets/group-editor.jsx";
//import _widgetsGroupJsx from "./widgets/group.jsx";
//import _widgetsGradedGroupSetEditorJsx from "./widgets/graded-group-set-editor.jsx";
//import _widgetsGradedGroupSetJsx from "./widgets/graded-group-set.jsx";
//import _widgetsGradedGroupEditorJsx from "./widgets/graded-group-editor.jsx";
//import _widgetsGradedGroupJsx from "./widgets/graded-group.jsx";
//import _widgetsGrapherEditorJsx from "./widgets/grapher-editor.jsx";
//import _widgetsGrapherJsx from "./widgets/grapher.jsx";
//import _widgetsDefinitionEditorJsx from "./widgets/definition-editor.jsx";
//import _widgetsDefinitionJsx from "./widgets/definition.jsx";
//import _widgetsExplanationEditorJsx from "./widgets/explanation-editor.jsx";
//import _widgetsExplanationJsx from "./widgets/explanation.jsx";
//import _widgetsDropdownEditorJsx from "./widgets/dropdown-editor.jsx";
//import _widgetsDropdownJsx from "./widgets/dropdown.jsx";
//import _widgetsCsProgramEditorJsx from "./widgets/cs-program-editor.jsx";
//import _widgetsCsProgramJsx from "./widgets/cs-program.jsx";
//import _widgetsCategorizerEditorJsx from "./widgets/categorizer-editor.jsx";
//import _widgetsCategorizerJsx from "./widgets/categorizer.jsx";
//
//// TODO(aria): Env variable & bundling magic?
//const __EDITOR__ = true;
//
//// As new widgets get added here, please also make sure they get added in
//// webapp perseus/traversal.py so they can be properly translated.
//const allWidgets = [
//    _widgetsCategorizerEditorJsx,
//    _widgetsCsProgramEditorJsx,
//    _widgetsDropdownEditorJsx,
//    _widgetsExplanationEditorJsx,
//    _widgetsDefinitionEditorJsx,
//    _widgetsGrapherEditorJsx,
//    _widgetsGradedGroupEditorJsx,
//    _widgetsGradedGroupSetEditorJsx,
//    _widgetsGroupEditorJsx,
//    _widgetsIframeEditorJsx,
//    _widgetsImageEditorJsx,
//    _widgetsInteractionEditorJsx,
//    _widgetsInteractiveGraphEditorJsx,
//    _widgetsLightsPuzzleEditorJsx,
//    _widgetsMatrixEditorJsx,
//    _widgetsMatcherEditorJsx,
//    _widgetsMeasurerEditorJsx,
//    _widgetsMoleculeEditorJsx,
//    _widgetsNumberLineEditorJsx,
//    _widgetsOrdererEditorJsx,
//    _widgetsPassageEditorJsx,
//    _widgetsPassageRefEditorJsx,
//    _widgetsPassageRefTargetEditorJsx,
//    _widgetsPlotterEditorJsx,
//    _widgetsReactionDiagramEditorJsx,
//    _widgetsSequenceEditorJsx,
//    _widgetsSimulatorEditorJsx,
//    _widgetsSorterEditorJsx,
//    _widgetsTableEditorJsx,
//    _widgetsTransformerEditorJsx,
//    _widgetsUnitEditorJsx,
//    _widgetsVideoEditorJsx,
//    // These widgets are only used when testing things, so remove them in the
//    // non-editor bundle.
//    //__EDITOR__ && [
//    //    _widgetsExampleGraphieWidgetJsx,
//    //    _widgetsExampleGraphieWidgetEditorJsx,
//    //],
//    //__EDITOR__ && [
//    //    _widgetsExampleWidgetJsx,
//    //    _widgetsExampleWidgetEditorJsx,
//    //],
//    //__EDITOR__ && [
//    //    _widgetsSimpleMarkdownTesterJsx,
//    //    _widgetsSimpleMarkdownTesterEditorJsx,
//    //],
//];
//export default allWidgets;

export default [];
