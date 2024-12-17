import t from 'tap';
import { sparkline } from './sparkline.js';

t.test('basic output', t => {
  const output = sparkline([0,1,2,3,4,5,6,7], { pad: '' });
  t.equal(output, '▁▂▃▄▅▆▇█');
  t.end();
});
