import fs from 'fs';
import path from 'path';

export default (dir) => {
  const filePath = path.resolve(dir, 'puzzle_input.txt');

  const buffer = fs.readFileSync(filePath);

  return buffer.toString();
}
