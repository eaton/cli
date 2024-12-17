import logUpdate from 'log-update';
import { progressBar, sparkline, dotline } from '../dist/index.mjs';

const values = [];
const max = 500;

const sl = setInterval(() => {
  if (values.length > max) clearInterval(sl);
  values.push(Math.random() * 150);
  logUpdate(`
Sparkline: ${sparkline(values, { width: 20 })}
  Dotline: ${dotline(values, { width: 20 })}
 Progress: ${progressBar(values.length, max, { width: 20 })}
`);
}, 50);
