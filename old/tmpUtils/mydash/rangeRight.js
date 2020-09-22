/**
 * @param {number} start
 * @param {number} end
 * @param {number} step
 * @returns {array} 
 * @description returns an array of numbers from end to start by step
 * @example
 * rangeRight(4); // => [3, 2, 1, 0]
 * rangeRight(-4); // => [-3, -2, -1, 0]
 * rangeRight(1, 5); // => [4, 3, 2, 1]
 * rangeRight(0, 20, 5); // => [15, 10, 5, 0]
 * rangeRight(0, -4, -1); // => [-3, -2, -1, 0]
 * rangeRight(1, 4, 0); // => [1, 1, 1]
 * rangeRight(0); // => [] 
 */

import {range} from './range.js';

function rangeRight(...args) {
	return array = range(...args).reverse();
}