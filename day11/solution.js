import readPuzzle from '../readPuzzle.js';

export default () => {
  const puzzleString = readPuzzle('day11');
  
  const log = (x) => {
    console.dir(x, { maxArrayLength: 500 });

    return x;
  }
  const toNumber = unary(parseInt);
  const forEachIndexed = addIndex(forEach);
  const rejectIndexed = addIndex(reject);

  const firstOrNil = (val, idx) => equals(idx, 0) || not(val);
  const parseItems = compose(
    map(toNumber),
    split(', ')
  );
  const parseOpx = compose(
    replace(/old/g, 'x'),
    last,
    split('= '),
  );
  const getNumArg = compose(
    toNumber,
    prop(0),
    match(/\d+/)
  );
  const evalFnPred = (val) => eval(`(x) => ${val}`);
  const stringParsers = {
  items: parseItems,
    opx: compose(evalFnPred, parseOpx),
    test: getNumArg,
    T: getNumArg,
    F: getNumArg,
    count: identity, 
  };
  const parseProps = (val, key) => stringParsers[key](val);

  const parsePuzzle = compose(
    map(
      compose(
        mapObjIndexed(parseProps),
        zipObj(keys(stringParsers)),
        append(0),
        rejectIndexed(firstOrNil),
        map(
          compose(
            last,
            split(': '),
          )
        ),
        split('\n'),
      )
    ),
    split('\n\n')
  );

  const monkeys = parsePuzzle(puzzleString);
  const commonMod = compose(
    reduce(multiply, 1),
    map(prop('test')),
  )(monkeys);
  const monkeyTurn = (monkey, worryDivider, idx) => {
    const { items, opx, test, T, F } = monkey;

    items.forEach(item => {
      let newItem;
      if (worryDivider) {
        newItem = Math.floor((opx(item) / worryDivider));
        monkeys[newItem % test === 0 ? T : F].items.push(newItem);
      } else {
        newItem = opx(item);
        monkeys[newItem % test === 0 ? T : F].items.push(newItem % commonMod);
      }
      monkeys[idx].count += 1;
    });

    monkeys[idx].items = [];
  }

  const solvePart = (rounds, worryDivider) => {
    for (let i = 0; i < rounds; i++) {
      for (let j = 0; j < monkeys.length; j++) {
        monkeyTurn(monkeys[j], worryDivider, j);
      }
    }

    const getSolution = compose(
      log,
      apply(multiply),
      take(2),
      reverse,
      map(prop('count')),
      sortBy(prop('count')),
      log,
    );

    getSolution(monkeys);
  }

  // part 1
  // solvePart(20, 3);

  // part 2
  solvePart(10_000, null);
}
