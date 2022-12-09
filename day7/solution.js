import readPuzzle from '../readPuzzle.js';

export default () => {
  const puzzleString = readPuzzle('day7');
  
  const log = (x) => {
    console.dir(x);

    return x;
  }

  const $cd = '$ cd ';
  const pathMap = new Map();
  let currentDir = [];

  const handleCd = (line) => {
    const dir = line.substring($cd.length);

    if (dir === '..') {
      currentDir.pop();

      return;
    }

    if (dir === '/') {
      currentDir = [];
    }

    currentDir.push(dir);

    const currentPath = currentDir.join('|');

    const mapValue = pathMap.get(currentPath);

    pathMap.set(currentPath, mapValue || 0);
  }

  const handleFile = (size) => {
    const activePath = currentDir.join('|');
    const mapValue = pathMap.get(activePath);

    pathMap.set(activePath, mapValue + size);
  }

  const directLine = (line) => {
    if (line.startsWith($cd)) {
      handleCd(line);

      return;
    }

    const file = line.match(/^\d*/gm);

    if (file?.[0]) {
      const fileSize = parseInt(file[0], 10);

      handleFile(fileSize);

      return;
    }
  }    
       
  const refinePuzzle = compose(
    forEach(directLine),
    dropLast(1),
    split('\n')
  );

  refinePuzzle(puzzleString);

  const toObject = (map) => Object.fromEntries(map);
  const max100k = (val, key) => val <= 100_000;
  const isRelated = (path) => (val, key) => key.includes(path);
  const sumValues = compose(sum, values);
  const sumDirTotal = (val, key, obj) => {
    const related = pickBy(isRelated(key), obj);

    return sumValues(related);
  }

  const getDirTotals = compose(
    mapObjIndexed(sumDirTotal),
    toObject,
  )

  const dirTotals = getDirTotals(pathMap);

  const solvePart1 = compose(
    log,
    sumValues,
    pickBy(max100k),
  )

  const disk = {
    total: 70_000_000,
    needed: 30_000_000,
    used: prop('/', dirTotals),
  };
  const excess = disk.used - (disk.total - disk.needed);

  log(excess);

  const solvePart2 = compose(
    log,
    apply(min),
    log,
    sort((a,b) => a - b),
    values,
    pickBy(gte(__, excess)),
  )

  // solvePart1(dirTotals);

  solvePart2(dirTotals);
}
