/**
 * @description sets value by string path
 * @example
 * set({ foo: 5 }, 'bar.baz', 10); // returns { foo: 5, bar: { baz: 10 } }
 * set(3, 'foo.bar', 'baz'); // returns 3
 */

import {merge, isObject} from "./merge-deep.js";

type Indexed<T = unknown> = {
    [key in string]: T;
};

function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
	if (!isObject(object)) {
        return object;
    }
  
    let pathArr = path.split(".").reverse();
    let resObj: Indexed = {};
    resObj[pathArr[0]] = value;
    pathArr.forEach((p, index) => {
         if (index > 0) {
            resObj = {[p]: resObj};
         }
    });

    let resFinal = merge(object, resObj);

    return resFinal;
}


/**
  * set({ foo: 5 }, 'bar.baz', 10); // { foo: 5, bar: { baz: 10 } }
  * set(3, 'foo.bar', 'baz'); // 3
*/