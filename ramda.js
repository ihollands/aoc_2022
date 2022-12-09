import * as R from 'ramda';

export default () => {
  for (const prop of Object.getOwnPropertyNames(R)) {
    global[prop] = R[prop];
  }
}
