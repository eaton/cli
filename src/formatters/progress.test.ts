import t from 'tap';
import { progressBar } from './progress.js';

t.test('basic output', t => {
  const output = progressBar(50);
  t.equal(output, '█'.repeat(20) + ' '.repeat(20));
  t.end();
});