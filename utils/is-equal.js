/**
 * @description deeply compares objects by value
 * @example
 * const a = {a: 1, b: {c: 3, d: 5}};
 * const b = {b: {c: 3, d: 5}, a: 1};
 * isEqual(a, b) // returns true
 */
function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}
function isArray(item) {
    return (item && typeof item === 'object' && Array.isArray(item));
}
function isEqual(a, b) {
    if (!isObject(a) || !isObject(b)) {
        throw Error("not an objct");
    }
    function compare(a, b) {
        var res = true;
        Object.keys(a).forEach(function (ka) {
            var found = false;
            Object.keys(b).forEach(function (kb) {
                if (ka === kb && typeof a[ka] === typeof b[kb] && !isObject(a[ka]) && !isArray(a[ka]) && a[ka] === b[kb]) {
                    found = true;
                }
                else if (ka === kb && typeof a[ka] === typeof b[kb] && isObject(a[ka]) && isObject(b[kb])) {
                    found = compare(a[ka], b[kb]);
                }
            });
            res = res && found;
        });
        console.log("res: ", res);
        return res;
    }
    return compare(a, b) && compare(b, a);
}
//# sourceMappingURL=is-equal.js.map