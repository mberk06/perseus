import _reactAddonsTestUtils from "react-addons-test-utils";
import _inputNumberJsx from "../input-number.jsx";
import _underscore from "underscore";
import _react from "react";
import _assert from "assert";

var module = {
    exports: {}
};

var exports = module.exports;
/* eslint-disable comma-dangle, no-unused-vars, no-var */
/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

/**
 * Disclaimer: Definitely not thorough enough
 */

var assert = _assert;
var React = _react;
const _ = _underscore;
var InputNumber = _inputNumberJsx;

var TestUtils = _reactAddonsTestUtils;

var transform = InputNumber.transform;

describe("input-number", function() {
    it("transform should remove the `value` field", function() {
        var editorProps = {
            value: 5,
            simplify: "required",
            size: "normal",
            inexact: false,
            maxError: 0.1,
            answerType: "number",
        };
        var widgetProps = transform(editorProps);
        assert.strictEqual(_.has(widgetProps, "value"), false);
    });
});
export default module.exports;
