import _imageWidgetJs from "./image-widget.js";
import _imageSpacesAroundUrlsJs from "./image-spaces-around-urls.js";
import _unbalancedCodeDelimitersJs from "./unbalanced-code-delimiters.js";
import _mathWithoutDollarsJs from "./math-without-dollars.js";
import _profanityJs from "./profanity.js";
import _widgetInTableJs from "./widget-in-table.js";
import _unescapedDollarJs from "./unescaped-dollar.js";
import _tableMissingCellsJs from "./table-missing-cells.js";
import _nestedListsJs from "./nested-lists.js";
import _mathTextEmptyJs from "./math-text-empty.js";
import _mathStartsWithSpaceJs from "./math-starts-with-space.js";
import _mathNestedJs from "./math-nested.js";
import _mathFracJs from "./math-frac.js";
import _mathFontSizeJs from "./math-font-size.js";
import _mathEmptyJs from "./math-empty.js";
import _mathAlignLinebreaksJs from "./math-align-linebreaks.js";
import _mathAlignExtraBreakJs from "./math-align-extra-break.js";
import _mathAdjacentJs from "./math-adjacent.js";
import _longParagraphJs from "./long-paragraph.js";
import _linkClickHereJs from "./link-click-here.js";
import _imageInTableJs from "./image-in-table.js";
import _imageAltTextJs from "./image-alt-text.js";
import _headingTitleCaseJs from "./heading-title-case.js";
import _headingSentenceCaseJs from "./heading-sentence-case.js";
import _headingLevelSkipJs from "./heading-level-skip.js";
import _headingLevel1Js from "./heading-level-1.js";
import _extraContentSpacingJs from "./extra-content-spacing.js";
import _doubleSpacingAfterTerminalJs from "./double-spacing-after-terminal.js";
import _blockquotedWidgetJs from "./blockquoted-widget.js";
import _blockquotedMathJs from "./blockquoted-math.js";
import _absoluteUrlJs from "./absolute-url.js";

var module = {
    exports: {}
};

var exports = module.exports;
// TODO(davidflanagan):
// This should probably be converted to use import and to export
// and object that maps rule names to rules. Also, maybe this should
// be an auto-generated file with a script that updates it any time
// we add a new rule?
module.exports = [
    _absoluteUrlJs,
    _blockquotedMathJs,
    _blockquotedWidgetJs,
    _doubleSpacingAfterTerminalJs,
    _extraContentSpacingJs,
    _headingLevel1Js,
    _headingLevelSkipJs,
    _headingSentenceCaseJs,
    _headingTitleCaseJs,
    _imageAltTextJs,
    _imageInTableJs,
    _linkClickHereJs,
    _longParagraphJs,
    _mathAdjacentJs,
    _mathAlignExtraBreakJs,
    _mathAlignLinebreaksJs,
    _mathEmptyJs,
    _mathFontSizeJs,
    _mathFracJs,
    _mathNestedJs,
    _mathStartsWithSpaceJs,
    _mathTextEmptyJs,
    _nestedListsJs,
    _tableMissingCellsJs,
    _unescapedDollarJs,
    _widgetInTableJs,
    _profanityJs,
    _mathWithoutDollarsJs,
    _unbalancedCodeDelimitersJs,
    _imageSpacesAroundUrlsJs,
    _imageWidgetJs,
];
export default module.exports;
