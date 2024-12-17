import logUpdate from 'log-update';
import { progressBar, ProgressStyles } from './src/formatters/progress.ts';
import { sparkline } from './src/formatters/sparkline.ts';
import { dotline } from './src/formatters/dotline.ts';
import chalk from 'chalk';

/*
let progress = 0;
const pb = setInterval(() => {
  if (progress > 100) clearInterval(pb);
  logUpdate(progressBar(progress++, 100, { debug: true }));
}, 100);
*/

const values = [];
const sl = setInterval(() => {
  values.push(Math.random() * 150);
  logUpdate((sparkline(values, { debug: true })));
}, 100);
 