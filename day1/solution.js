import readPuzzle from '../readPuzzle.js';

export default () => {
  const puzzleString = readPuzzle('day1');
  
  const log = (x) => {
    console.log(x);

    return x;
  }

  const elfTotal = compose(
    sum,
    split(/\n/)
  )

  const diff = (a,b) => b - a;

  const test = compose(
    log,
    sum,
    log,
    take(3),
    log,
    sort(diff),
    map(elfTotal),
    split(/\n\n/g),
  )

  test(puzzleString);
}

