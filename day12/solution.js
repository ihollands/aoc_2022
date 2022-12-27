import readPuzzle from '../readPuzzle.js';

export default () => {
  const puzzleString = readPuzzle('day12');
  
  const log = (x) => {
    console.dir(x);

    return x;
  }

  const mapIndexed = addIndex(map);

  const alphaToNum = (str) => {
    if (str === 'S') {
      return 0;
    }

    if (str === 'E') {
      return 27;
    }

    return str.charCodeAt(0) - 96;
  }

  const parseRows = compose(
    map(
      compose(
        map(alphaToNum),
        split(''),
      ),
    ),
    dropLast(1),
    split('\n'),
  );

  const inRange = (val1, val2) => val2 <= val1 + 1 || val2 >= val1 - 1;

  const getMoves = (rows) => rows.map(row => row.map((pos, i, _row) => ({
    f: inRange(pos, _row[i + 1]),
    b: inRange(pos, _row[i - 1]),
  })));

  const rows = parseRows(puzzleString);
  const cols = transpose(rows);

  const moveData = [rows, cols];

  const solvePuzzle = compose(
    log,
    map(getMoves),
  );

  solvePuzzle(moveData);
}

