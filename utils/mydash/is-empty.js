/**
 * @param {any} value
 * @returns {boolean} 
 * @description returns true is value is empty
 * @example
 * isEmpty(null); // => true
 * isEmpty(true); // => true
 * isEmpty(1); // => true
 * isEmpty([1, 2, 3]); // => false
 * isEmpty({ 'a': 1 }); // => false
 * isEmpty('123'); // => false
 * isEmpty(''); // => true
 * isEmpty(0); // => true
 */

function isEmpty(value) {
    if (value === null) {
        return true;
    } else if (typeof value === "object") {
        if (Object.keys(value).length > 0 || value.length > 0 ) {
            return false;
        } else {
            return true;
        }
    } else if (typeof value === "string") {
        return value === "";
    } else {
        return true;
    }
}