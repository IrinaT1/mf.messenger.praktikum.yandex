/**
 * @description sets value by string path
 * @example
 * set({ foo: 5 }, 'bar.baz', 10); // returns { foo: 5, bar: { baz: 10 } }
 * set(3, 'foo.bar', 'baz'); // returns 3
 */
import { merge, isObject } from "./merge-deep.js";
function set(object, path, value) {
    if (!isObject(object)) {
        return object;
    }
    var pathArr = path.split(".").reverse();
    var resObj = {};
    resObj[pathArr[0]] = value;
    pathArr.forEach(function (p, index) {
        var _a;
        if (index > 0) {
            resObj = (_a = {}, _a[p] = resObj, _a);
        }
    });
    var resFinal = merge(object, resObj);
    return resFinal;
}
/**
  * set({ foo: 5 }, 'bar.baz', 10); // { foo: 5, bar: { baz: 10 } }
  * set(3, 'foo.bar', 'baz'); // 3
*/ 
//# sourceMappingURL=set.js.map