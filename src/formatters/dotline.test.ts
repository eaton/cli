import t from 'tap';
import { dotline } from './dotline.js';

t.test('basic output', t => {
  const output = dotline([0,1,2,3,4,5,6,7], { pad: '' });
  t.equal(output.length, '⣀⣤⣶⣿'.length);
  t.end();
});
