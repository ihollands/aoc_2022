import readPuzzle from '../readPuzzle.js';

export default () => {
  const puzzleString = readPuzzle('day8');
  
  const log = (x) => {
    console.dir(x);

    return x;
  }

  const mapIndexed = addIndex(map);

  const addXY = (row, yIdx) => mapIndexed(
    (height, xIdx) => ({
      xy: `${xIdx}:${yIdx}`,
      h: parseInt(height, 10)
    }),
    row
  ); 

  const logFirst = compose(log, head);

  const getTreeGrid = compose(
    mapIndexed(addXY),
    map(split('')),
    dropLast(1),
    split('\n')
  )

  const grid = getTreeGrid(puzzleString);
  const gridTp = transpose(grid);
  const allRows = [...grid, ...gridTp];

  const solutionSet = new Set();

  const testRow = curryN(2, (parser, rawRow) => {
    const row = parser(rawRow);
    let currMax = -1;

    const testItem = ({ xy, h }) => {
      if (h > currMax) {
        currMax = h;
        solutionSet.add(xy)
      }
    }
    
    forEach(testItem, row);
  });

  const solvePart1 = (rows) => {
    forEach(testRow(identity), allRows);
    forEach(testRow(reverse), allRows);

    log(solutionSet.size);
  }

  // solvePart1(allRows);

  const reverseRows = map(reverse);
  const gridRev = reverseRows(grid);
  const gridTpRev = reverseRows(gridTp);

  const mapAccumIndexed = addIndex(mapAccum);

  const mapScore = (val, idx, arr) => {
    const viewRange = slice(0, idx, arr);
    const lastBlockerIdx = findLastIndex(
      propSatisfies(
        gte(__, prop('h', val)),
        'h'
      ),
      viewRange
    );
    
    return {
      ...val,
      score: idx - (lastBlockerIdx > -1 ? lastBlockerIdx : 0) 
    }
  }

  const reducer = (acc, { score }) => acc * score;

  const solvePart2 = compose(
    log,
    apply(Math.max),
    map(reduce(reducer, 1)),
    collectBy(prop('xy')),
    flatten,
    map(
      map(
        compose(
          filter(propSatisfies(gt(__, 1), 'score')),
          mapIndexed(mapScore)
        )
      )
    )
  );

  solvePart2([grid, gridRev, gridTp, gridTpRev]);

}
