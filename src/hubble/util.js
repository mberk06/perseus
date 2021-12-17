var isObject = function(obj) {
    return obj === Object(obj);;
}

var merge = function() {
    var obj = {};

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i];
        if (source) {
            for (var prop in source) {
                obj[prop] = source[prop];
            }
        }
    }

    return obj;
};

var clone = function(obj) {
    if (!isObject(obj)) {
        return obj;
    }

    return Array.isArray(obj) ? obj.slice() : merge(obj);
};

export { isObject, merge, clone };
export default { isObject, merge, clone };
