import Rule from "../rule.js";

var _module_ = {
    exports: {}
};

var exports = _module_.exports;

_module_.exports = Rule.makeRule({
    name: "profanity",
    // This list could obviously be expanded a lot, but I figured we
    // could start with https://en.wikipedia.org/wiki/Seven_dirty_words
    pattern: /\b(shit|piss|fuck|cunt|cocksucker|motherfucker|tits)\b/i,
    message: "Avoid profanity",
});
export default _module_.exports;
