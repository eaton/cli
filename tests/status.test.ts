import t from 'tap';
import { StatusTracker } from "../src/status-tracker.js";

t.test('status and progress', t => {
  const st = new StatusTracker({ target: 100 });

  t.equal(st.isRunning, true);
  t.equal(st.total, 100);
  t.equal(st.target, 0);
  t.equal(st.progress, 0);

  st.target = 25;
  t.equal(st.isRunning, true);
  t.equal(st.total, 100);
  t.equal(st.target, 25);
  t.equal(st.progress, 0.25);

  st.total = 200;
  t.equal(st.isRunning, true);
  t.equal(st.total, 200);
  t.equal(st.target, 25);
  t.equal(st.progress, 0.125);

  t.end();
});

t.test('overflow', t => {
  const st = new StatusTracker({ target: 100 });

  t.equal(st.isRunning, true);
  t.equal(st.total, 100);
  t.equal(st.target, 0);
  t.equal(st.progress, 0);

  st.target = 25;
  t.equal(st.isRunning, true);
  t.equal(st.total, 100);
  t.equal(st.target, 25);
  t.equal(st.progress, 0.25);

  st.total = 200;
  t.equal(st.isRunning, true);
  t.equal(st.total, 200);
  t.equal(st.target, 25);
  t.equal(st.progress, 0.125);

  t.end();
});
