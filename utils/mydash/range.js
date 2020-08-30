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

    console.log("start", start);
    console.log("end", end);
    console.log("step", step);

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

/*
* range(4); // => [0, 1, 2, 3] 
* range(-4); // => [0, -1, -2, -3]
* range(1, 5); // => [1, 2, 3, 4]
* range(0, 20, 5); // => [0, 5, 10, 15]
* range(0, -4, -1); // => [0, -1, -2, -3]
* range(1, 4, 0); // => [1, 1, 1]
* range(0); // => []
*/