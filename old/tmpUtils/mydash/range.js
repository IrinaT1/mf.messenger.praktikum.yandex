/**
 * @param {number} start
 * @param {number} end
 * @param {number} step
 * @returns {array} 
 * @description returns an array of numbers from start to end by step
 * @example
 * range(4); // => [0, 1, 2, 3] 
 * range(-4); // => [0, -1, -2, -3]
 * range(1, 5); // => [1, 2, 3, 4]
 * range(0, 20, 5); // => [0, 5, 10, 15]
 * range(0, -4, -1); // => [0, -1, -2, -3]
 * range(1, 4, 0); // => [1, 1, 1]
 * range(0); // => []
 */

export function range(...args) {
  let start, end, step;

  if (args.length === 1) {
  [start, end, step] = [0, ...args, 1];
} else if (args.length === 2) {
  [start, end, step] = [...args, 1];
} else {
  [start, end, step] = args;
}

if (end < start) {
  step = -Math.abs(step);
}

if (step === 0) {
  return Array.from({ length: end - start }).fill(start);
}

let array = [];

if (start <= end) {
  let i = start;
  while (i < end) {
    array.push(i);        
    i += step;
  }  
} else {
  let i = start;
  while (i > end) {
    if (step0) {
      array.push(start);
    } else {
      array.push(i);          
    }
    i += step;
  }    
}
return array;
}