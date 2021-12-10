import Rule from "../rule.js";

var module = {
    exports: {}
};

var exports = module.exports;

module.exports = Rule.makeRule({
    name: "profanity",
    // This list could obviously be expanded a lot, but I figured we
    // could start with https://en.wikipedia.org/wiki/Seven_dirty_words
    pattern: /\b(shit|piss|fuck|cunt|cocksucker|motherfucker|tits)\b/i,
    message: "Avoid profanity",
});
export default module.exports;
