import logUpdate from 'log-update';
import { progressBar, ProgressStyles } from './src/formatters/progress.ts';
import { sparkline } from './src/formatters/sparkline.ts';
import { dotline } from './src/formatters/dotline.ts';

let current = 0;
const max = 100;

const pb = setInterval(() => {
  if (current >= max) clearInterval(pb);
  logUpdate(progressBar(current++, max));
}, 100);

/*
const values = [];
const sl = setInterval(() => {
  values.push(Math.random() * 150);
  logUpdate((sparkline(values, { debug: true })));
}, 100);
*/
