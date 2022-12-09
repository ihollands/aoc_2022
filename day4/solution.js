import readPuzzle from '../readPuzzle.js';

export default () => {
  const puzzleString = readPuzzle('day4');
  
  const log = (x) => {
    console.dir(x);

    return x;
  }

  const sorter = ([a1, a2], [b1, b2]) => {
    const lastDiff = subtract(a2, b2);

    return equals(lastDiff, 0) ? a1 - b1 : lastDiff;
  };

  const getSortedVals = compose(
    reverse,
    sort(sorter),
    map(split('-')),
    split(',')
  )
    
  const reducer = (acc, val) => {
    const ranges = getSortedVals(val);
    const [[a1, a2], [b1, b2]] = ranges;

    if (equals(a1, b1) || equals(a2, b2)) {
      log([ranges, 'equals']);
      return acc + 1;
    }

    if (a1 - b2 <= 0) {
      log([ranges, true]);
      return acc + 1;
    }

    log([ranges, true]);
    return acc;
  }

  const solvePuzzle = compose(
    log,
    reduce(reducer, 0),
    dropLast(1),
    split('\n')
  );

  solvePuzzle(puzzleString);
}
