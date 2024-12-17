/**
 * Starting values for a Progress instance.
 */
export type TrackerOptions = {
  /**
   * The target total for progress calculations. This can be changed
   * while an operation is still running.
   */
  total: number;

  /**
   * The number of already-completed operations.
   */
  completed: number;

  /**
   * A status message with additional information about the current task.
   */
  message?: string;

  /**
   * Start the progress tracker's elapsed time marker as soon
   * as the object is created. If set to `false`, the `start()`
   * method must be called for elapsed and estimated time
   * calculations.
   */
  autostart: boolean;

  /**
   * If `true`, the progress tracker's internal elapsed time counter
   * will stop as soon as the `completed` value meets or exceeds the
   * `total` value.
   * 
   * If `false`, the `stop()` method must be called to end the timer.
   */
  autostop: boolean;
}

const defaults: TrackerOptions = {
  total: 0,
  completed: 0,
  autostart: true,
  autostop: true,
}

export class StatusTracker {
  protected _total = 0;
  protected _completed = 0;

  protected _started = 0;
  protected _finished = 0;

  protected autostop: boolean;

  constructor(options: Partial<TrackerOptions> = {}) {
    const opt = { ...defaults, ...options };

    this.completed = opt.completed;
    this.total = opt.total;

    this.autostop = opt.autostop;
    if (opt.autostart) {
      this.start();
    }
  }

  reset() {
    this._finished = 0;
    this._started = 0;
    this._completed = 0;
    this._total = 0;
  }

  get [Symbol.toStringTag]() {
    return 'Progress';
  }

  get total(): number {
    return this._total;
  }
  set total(input: number) {
    this._total = input;
  }

  get completed(): number {
    return this._completed;
  }
  set completed(input: number) {
    this._completed = input;
    if (this.autostop && this.completed >= this.total) {
      this.stop();
    }
  }

  get percentCompleted(): number {
    if (this.total <= 0) return 0;
    return this.completed / this.total;
  }

  get elapsedTime(): number {
    if (this._started) {
      return (this._finished || Date.now()) - this._started;
    } else {
      return 0;
    }
  }

  get estimatedTime(): number {
    return Math.round((this.elapsedTime/Math.max(this.completed, 1)) * this.total);
  }

  get estimatedRemainingTime(): number {
    return this.estimatedTime - this.elapsedTime;
  }

  get isRunning(): boolean {
    return (this._started > 0 && this._finished === 0);
  }

  get isComplete(): boolean {
    return (this.completed >= this.total);
  }

  start() {
    this._started ||= Date.now();
  }

  stop() {
    this._finished ||= Date.now();
  }
}