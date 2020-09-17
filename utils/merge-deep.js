/**
 * @description merges objects deeply
 * @example
 * merge({ a: { b: { a: 2 } }, d: 5 }, { a: { b: { c: 1 } } }); //returns { a: { b: { a: 2, c: 1, } }, d: 5, }
 */

export function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

export function merge(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                merge(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    let m = merge(target, ...sources);
    return m;
}