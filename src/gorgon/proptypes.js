import _react from "react";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;
// Define the shape of the linter context object that is passed through the
// tree with additional information about what we are checking.

const React = _react;

export const linterContextProps = PropTypes.shape({
    contentType: PropTypes.string,
    highlightLint: PropTypes.bool,
    paths: PropTypes.arrayOf(PropTypes.string),
    stack: PropTypes.arrayOf(PropTypes.string),
});

export const linterContextDefault = {
    contentType: '',
    highlightLint: false,
    paths: [],
    stack: [],
};
export default _module_.exports;
