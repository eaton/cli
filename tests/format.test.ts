import t from 'tap';
import { StatusTracker } from "../src/status-tracker.js";
import { simpleStatus } from "../src/base-formatter.js";

t.test('console output', t => {
  const st = new StatusTracker({ target: 100, value: 63, message: 'Test message' }, { autoStart: true});
  const output = simpleStatus(st);
  t.ok(output);
  console.log(output);
  t.end();
});
