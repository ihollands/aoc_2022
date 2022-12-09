import readPuzzle from '../readPuzzle.js';

export default () => {
  const puzzleString = readPuzzle('day3');
  
  const log = (x) => {
    console.dir(x);

    return x;
  }

  const halve = (str) => splitAt(length(str) / 2, str);
  const getPriority = ([letter]) => {
    const charCode = letter.charCodeAt(0);

    return charCode - 96 > 0 ? charCode - 96 : charCode - 38;
  }
  const intersectionApplied = apply(intersection);

  // part 1
  // const getSolution = compose(
    // log,
    // sum,
    // map(
      // compose(
        // getPriority,
        // intersectionApplied,
        // map(split('')),
        // halve,
      // )
    // ),
    // dropLast(1),
    // split('\n'),
  // )
// 
  // getSolution(puzzleString);

  const getIntersection = (groups) => {
    const shared = intersectionApplied(groups);

    return length(shared) === 1 ? shared : getIntersection([shared, groups[2]]);
  }
  
  const getSolution = compose(
    log,
    sum,
    map(
      compose(
        getPriority,
        getIntersection,
        map(split('')),
      )
    ),
    splitEvery(3),
    dropLast(1),
    split('\n'),
  )

  getSolution(puzzleString);
}

