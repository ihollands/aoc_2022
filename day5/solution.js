import clipboardy from 'clipboardy';
import readPuzzle from '../readPuzzle.js';

export default () => {
  const puzzleString = readPuzzle('day5');
  
  const log = (x) => {
    console.dir(x);

    return x;
  }

  const getPuzzleComponents = compose(
    map(
      compose(
        reject(not),
        split('\n'),
      )
    ),
    split('\n\n')
  )

  const parseMoves = compose(
    map(
      compose(
        values,
        pick([1,3,5]),
        split(' '),
      )
    )
  )

  const getBoxIndexes = compose(
    map(
      compose(
        add(1),
        multiply(4)
      )
    )
  )

  const targetIndexes = getBoxIndexes(range(0,9));

  const parseStacks = compose(
    map(
      reject(
        either(
          not,
          equals(' ')
        )
      )
    ),
    transpose,
    reverse,
    dropLast(1),
    map(
      compose(
       values,                    
       pick(targetIndexes),     
       split('')
      )
    )
  )

  const [stacksRaw, movesRaw] = getPuzzleComponents(puzzleString);

  const moves = parseMoves(movesRaw);
  const stacks = parseStacks(stacksRaw);

  const moveBoxes = ([num, fromId, toId]) => {
    const fromIndex = fromId - 1;
    const toIndex = toId - 1;
    const boxCount = parseInt(num, 10);

    const moveBoxes = stacks[fromIndex].slice(-boxCount);

    stacks[fromIndex] = stacks[fromIndex].slice(0, stacks[fromIndex].length - boxCount);
    stacks[toIndex] = [...stacks[toIndex], ...moveBoxes ];
  }

  moves.forEach(moveBoxes);

  const solution = stacks.reduce((acc, val) => acc + last(val), '');

  log(solution);
}
