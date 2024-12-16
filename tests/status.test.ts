import t from 'tap';
import { StatusTracker } from "../src/status-tracker.js";

t.test('status and progress', t => {
  const st = new StatusTracker({ target: 100 });

  t.equal(st.status, 'ready');
  t.equal(st.target, 100);
  t.equal(st.value, 0);
  t.equal(st.progress, 0);

  st.value = 25;

  t.equal(st.status, 'running');
  t.equal(st.target, 100);
  t.equal(st.value, 25);
  t.equal(st.progress, 25);

  st.target = 200;
  t.equal(st.status, 'running');
  t.equal(st.target, 200);
  t.equal(st.value, 25);
  t.equal(st.progress, 12.5);

  st.stop();
  t.equal(st.estimated, 0);

  st.target = 1000;
  t.equal(st.target, 200);

  t.end();
});
