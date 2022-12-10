import fs from 'fs';
import readPuzzle from '../readPuzzle.js';

export default () => {
  const puzzleString = readPuzzle('day10');
  
  const log = (x) => {
    console.dir(x, { maxArrayLength: 500 });

    return x;
  } 

  const replaceAddx = ([name, xVal]) => {
    if (xVal) {
      return [0, parseInt(xVal, 10)];
    }

    return 0;
  }

  const parseCycles = compose(
    flatten,
    map(
      compose(
        replaceAddx,
        split(' ')),
    ),
    dropLast(1),
    split('\n')
  );

  const cycles = parseCycles(puzzleString);

  // part 1
  const signalCycles = [20, 60, 100, 140, 180, 220];

  const cycleReducer = (acc, val, idx) => {
    const cycle = idx + 1;
    const signalIndex = indexOf(cycle, signalCycles);
    
    if (signalIndex > -1) {
      signalCycles[signalIndex] = cycle * acc;
    }

    return acc + val;
  }
  
  const reduceCycles = addIndex(reduce)(cycleReducer, 1);

  // reduceCycles(cycles);
  
  // part 1 solution
  // log(sum(signalCycles));

  // part 2
  const cycleMapAccum = (xReg, xRegAdd, px) => {
    const isLit = compose(
      both(
        gte(__, subtract(xReg, 1)),
        lte(__, add(1, xReg)),
      ),
      modulo(__, 40)
    );

    return [xReg + xRegAdd, isLit(px) ? '#' : '.'];
  }

  const mapAccumCycles = addIndex(mapAccum)(cycleMapAccum, 1);

  const [total, crt] = mapAccumCycles(cycles);
  const format = compose(
    join('\n'),
    map(join('')),
    splitEvery(40),
  )
  log(format(crt));
  // fs.writeFile('day10.js', JSON.stringify(crt), () => {});
}
