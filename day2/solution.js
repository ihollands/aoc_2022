import readPuzzle from '../readPuzzle.js';

export default () => {
  const puzzleString = readPuzzle('day2');
  
  const log = (x) => {
    console.dir(x);

    return x;
  }

  const options = [1,2,3];

  const getLose = (oppScore) => {
    const newScore = oppScore - 1;

    if (newScore < head(options)) {
      return last(options);
    }

    return newScore;
  }

  const getWin = (oppScore) => {
    const newScore = oppScore + 1;

    if (newScore > last(options)) {
      return head(options) + 6;
    }

    return newScore + 6;
  }

  const getTie = (oppScore) => {
    return oppScore + 3;
  }

  const moveMap = {
    A: 1,
    B: 2,
    C: 3,
    X: getLose,
    Y: getTie,
    Z: getWin,
  };

  const getScore = ([score, fn]) => {
    return fn ? fn(score) : null; 
  } 

  const formatData = compose(
    log,
    sum,
    filter(val => !Number.isNaN(val)),
    reverse,
    log,
    map(
      compose(
        getScore,
        map(prop(__, moveMap)),
        split(' '),
      )
    ),
    split(/\n/g),
  )

  formatData(puzzleString);
}

