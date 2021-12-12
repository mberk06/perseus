import Rule from "../rule.js";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;

// Because no selector is specified, this rule only applies to text nodes.
// Math and code hold their content directly and do not have text nodes
// beneath them (unlike the HTML DOM) so this rule automatically does not
// apply inside $$ or ``.
_module_.exports = Rule.makeRule({
    name: "math-without-dollars",
    severity: Rule.Severity.GUIDELINE,
    pattern: /\\\w+{[^}]*}|{|}/,
    message: `This looks like LaTeX:
did you mean to put it inside dollar signs?`,
});
export default _module_.exports;
