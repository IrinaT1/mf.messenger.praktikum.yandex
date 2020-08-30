function rangeRight(...args) {
	return array = range(...args).reverse();
}

function range(...args) {
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

let array = [];

let step0 = false;
if (step === 0) {
    step0 = true;
    step = 1;
}

if (start <= end) {
  let i = start;
  while (i < end) {
      if (step0) {
        array.push(start);
    } else {
        array.push(i);        
    }
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

/*console.log(rangeRight(4)); // => [3, 2, 1, 0]
console.log(rangeRight(-4)); // => [-3, -2, -1, 0]
console.log(rangeRight(1, 5)); // => [4, 3, 2, 1]
console.log(rangeRight(0, 20, 5)); // => [15, 10, 5, 0]
console.log(rangeRight(0, -4, -1)); // => [-3, -2, -1, 0]
console.log(rangeRight(1, 4, 0)); // => [1, 1, 1]
console.log(rangeRight(0)); // => [] */
