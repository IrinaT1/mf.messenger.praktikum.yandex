/**
 * @param {any} value
 * @returns {any}
 * @description returns the same object that was passed in as a parameter
 * @example
 * const object = {'a' : 1};
 * identity(object) === object; // => true
 */

function identity(value) {
    return value;
}