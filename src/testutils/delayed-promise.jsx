import _underscore from "underscore";

var module = {
    exports: {}
};

var exports = module.exports;
/* eslint-disable no-undef, no-var */
/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* To fix, remove an entry above, run ka-lint, and fix errors. */


const _ = _underscore;

// Returns a promise that will resolve shortly after the end of this
// browser tick (roughly a `setTimeout(0)`)
var delayedPromise = value => {
    var deferred = $.Deferred();
    _.defer(() => {
        deferred.resolve(value);
    });
    if (typeof jest !== "undefined") {
        jest.runAllTimers();
    }
    return deferred.promise();
};

module.exports = delayedPromise;
export default module.exports;
