import { StatusData } from "./status-emitter.js";
import { StatusTracker } from "./status-tracker.js";
import { formatDistance } from 'date-fns';

export type StatusFormatter<T extends StatusData = StatusData>  = (tracker: StatusTracker<T>) => string;

export const simpleStatus: StatusFormatter = (tracker: StatusTracker) => {
  const estimate = formatDistance(tracker.estimated + 65000, Date.now());
  return JSON.stringify({
    status: tracker.status,
    target: tracker.target,
    value: tracker.value,
    progress: tracker.progress,
    elapsed: tracker.elapsed,    
    estimated: tracker.estimated,
    message: tracker.message,
    output: estimate,
  }, undefined, 2);
}