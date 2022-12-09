import readPuzzle from '../readPuzzle.js';

export default () => {
  const puzzleString = readPuzzle('day9');
  
  const log = (x) => {
    console.dir(x);

    return x;
  }

  const getKnots = repeat({ x: 0, y: 0 });
  const moveMap = new Map([
    ['L', { x: -1 }],
    ['R', { x: 1 }],
    ['U', { y: -1 }],
    ['D', { y: 1 }],
  ]);
  const solutionSet = new Set(['0|0']);

  const mapMoves = (move) => move[1] > 1 ? repeat(move[0], move[1]) : move[0];

  const getMoveList = compose(
    log,
    flatten,
    map(
      compose(
        mapMoves,
        split(' '),
      )
    ),
    dropLast(1),
    split('\n'),
  )
  
  const absVal = (val) => Math.abs(val);

  const moveList = getMoveList(puzzleString);
  const isChainMove = compose(
    any(equals(2)),
    map(absVal),
    values,
  );

  const solve = (knots, moveList) => {
    const makeMove = (dir) => {
      knots.forEach((knot, i, arr) => {
        log([knot, i]);
        if (!knots[i + 1]) {
          return;
        }

        if (i === 0) {
          knots[i] = mergeWith(add, knots[i], moveMap.get(dir));
        }

        const diff = mergeWith(subtract, knots[i], knots[i + 1])
        
        if (isChainMove(diff)) {
          const applyDiff = map(val => val / (absVal(val) || 1), diff);
          knots[i + 1] = mergeWith(add, knots[i + 1], applyDiff);

          if (i === knots.length - 2) {
            solutionSet.add(`${knots[i + 1].x}|${knots[i + 1].y}`);
          }
        }
      });
    }

    moveList.forEach(makeMove);

    log(solutionSet.size);
  } 

  // part 1
  solve(getKnots(10), moveList);
}
