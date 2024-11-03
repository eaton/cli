import test from 'ava';
import { Progress } from "./progress.js";

test('basic bar', (t) => {
  const p = new Progress({ total: 100, completed: 50, width: 10 });
  t.is(p.bar(), '█████░░░░░');
  t.is(p.percentCompleted, .5);
});

test('trimmed bar', (t) => {
  const p = new Progress({ total: 100, completed: 50, width: 10, style: ['', '█'] });
  t.is(p.bar(), '█████');
  t.is(p.percentCompleted, .5);
});

test('auto start / stop', (t) => {
  const p = new Progress({ total: 100, completed: 50, width: 10 });
  t.is(p.isRunning, true);
  p.completed = p.total;
  t.is(p.isRunning, false);
  t.is(p.isComplete, true);
});

test('manual start / stop', (t) => {
  const p = new Progress({ total: 100, completed: 50, width: 10, autostart: false, autostop: false });
  t.is(p.isRunning, false);
  t.is(p.isComplete, false);

  p.start();
  t.is(p.isRunning, true);
  t.is(p.isComplete, false);

  p.completed = p.total;
  t.is(p.isRunning, true);
  t.is(p.isComplete, true);

  p.stop();
  t.is(p.isRunning, false);
});


test('incrementing & decrementing', (t) => {
  const p = new Progress({ total: 10, completed: 5, width: 10 });
  p.completed++;
  p.total--;

  t.is(p.completed, 6);
  t.is(p.total, 9);

  p.completed ||= p.total;
  t.is(p.completed, 6);

  p.failures = 1;
  t.is(p.completed, 7);
  t.is(p.successes, 6);

  p.completed++;
  t.is(p.completed, 8);
  t.is(p.successes, 7);
  t.is(p.failures, 1);
});
