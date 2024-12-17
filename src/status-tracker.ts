/**
 * Starting values for a Progress instance.
 */
export type TrackerOptions = {
  /**
   * The target total for progress calculations. This can be changed
   * while an operation is still running.
   */
  target: number;

  /**
   * The number of already-completed operations.
   */
  value: number;

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
  target: 0,
  value: 0,
  autostart: true,
  autostop: true,
}

export class StatusTracker {
  protected _target = 0;
  protected _value = 0;

  protected _started = 0;
  protected _finished = 0;

  protected autostop: boolean;

  constructor(options: Partial<TrackerOptions> = {}) {
    const opt = { ...defaults, ...options };

    this.target = opt.value;
    this.total = opt.target;

    this.autostop = opt.autostop;
    if (opt.autostart) {
      this.start();
    }
  }

  reset() {
    this._finished = 0;
    this._started = 0;
    this._value = 0;
    this._target = 0;
  }

  get [Symbol.toStringTag]() {
    return 'Progress';
  }

  get total(): number {
    return this._target;
  }
  set total(input: number) {
    this._target = input;
  }

  get value(): number {
    return this._value;
  }
  set value(input: number) {
    this.start();
    this._value = input;
    if (this.total < input) this.total = input;
  }

  get target(): number {
    return this._value;
  }
  set target(input: number) {
    this._value = input;
    if (this.autostop && this.target >= this.total) {
      this.stop();
    }
  }

  get progress(): number {
    if (this.total <= 0) return 0;
    return this.target / this.total;
  }

  get elapsedTime(): number {
    if (this._started) {
      return (this._finished || Date.now()) - this._started;
    } else {
      return 0;
    }
  }

  get estimatedTime(): number {
    return Math.round((this.elapsedTime/Math.max(this.target, 1)) * this.total);
  }

  get estimatedRemainingTime(): number {
    return this.estimatedTime - this.elapsedTime;
  }

  get isRunning(): boolean {
    return (this._started > 0 && this._finished === 0);
  }

  get isComplete(): boolean {
    return (this.target >= this.total);
  }

  start() {
    this._started ||= Date.now();
  }

  stop() {
    this._finished ||= Date.now();
  }
}