var _module_ = {
    exports: {}
};

var exports = _module_.exports;
/**
 * Simple version of jQuery's Deferred.
 */

class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }

    then(callback) {
        return this.promise.then(callback);
    }
}

_module_.exports = Deferred;
export default _module_.exports;
