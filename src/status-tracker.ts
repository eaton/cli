import { StatusData } from "./status-emitter.js";

export type Options = {
  autoStart: boolean;
  autoStop: boolean;
}

const defaults: Options = {
  autoStart: false,
  autoStop: true,
}

export class StatusTracker<T extends StatusData = StatusData> {
  private _data: Partial<T>;
  private _options: Options;

  private _started: number = 0;
  private _finished: number = 0;

  private _status: 'ready' | 'running' | 'complete' = 'ready';

  constructor(data: Partial<T> = {}, options: Partial<Options> = {}) {
    this._options = { ...defaults, ...options };
    this._data = { target: 0, value: 0, ...data };

    if (this._options.autoStart) {
      this.start();
    }
  };

  /**
   * Timestamp of the tracker's starting point, in ms
   * 
   * Note: Returns 0 if the tracker's status is 'ready'
   */
  get status() {
    return this._status;
  }
  
  /**
   * Starts the tracker.
   */
  start() {
    if (this._status === 'ready') {
      this._started = Date.now();
      this._status = 'running';
    }
  }

  /**
   * Stops the tracker, freezing its progress and time estimates.
   */
  stop() {
    if (this._status === 'running') {
      this._finished = Date.now();
      this._status = 'complete';
    }
  }

  /**
   * Resets the tracker, setting internal data values to 0 if none are provided.
   */
  reset(data: Partial<T> = {}) {
    this._status = 'ready';
    this._started = 0;
    this.update({ value: 0, target: 0, message: undefined, ...data }); 
  }

  /**
   * Force-updates all tracked status values using a data object.
   */
  update(input: Partial<T>) {
    this.start();
    if (this._status === 'running') {
      this._data = {
        ...this._data,
        ...input
      };
      if (this.target <= this.value && this._options.autoStop) {
        this.stop();
      }
    }
  }

  /**
   * Gets the current status message, if one exists.
   */
  get message() {
    return this._data.message;
  }

  /**
   * Sets the current status message; setting to `undefined` will clear the message.
   */
  set message(input: string | undefined) {
    this._data.message = input;
  }

  /**
   * The current value; usually represents the number of records processed, bytes
   * transferred, etc.
   */
  get value() {
    return Math.max(this._data.value ?? 0, 0);
  }
  set value(input: number) {
    this.start();
    if (this._status === 'running') {
      this._data.value = Math.max(input, 0);
      this._data.target = Math.max(this.target, this.value);
    }
  }

  /**
   * The current target number
   */
  get target() {
    return Math.max(this._data.target ?? 0, 0);
  }
  set target(input: number) {
    this.start();
    if (this._status === 'running') {
      this._data.target = Math.max(input, this.value);
    }
  }

  /**
   * Completion percentage, from 0 to 100.
   * 
   * Note: Returns 0 if the tracker's status is 'ready'
   */
  get progress() {
    if (this.target === 0) return 0;
    return Math.min(100 * this.value / this.target, 100);
  }

  /**
   * Timestamp of the tracker's starting point, in ms
   * 
   * Note: Returns 0 if the tracker's status is 'ready'
   */
  get started() {
    return this._started;
  }

  /**
   * Timestamp of the tracker's completion, in ms
   * 
   * Note: Returns 0 if the tracker's status is 'ready' or 'running'
   */
  get finished() {
    return this._finished;
  }

  /**
   * The elapsed time in ms
   * 
   * Note: Returns 0 if the tracker's status is 'ready'
   */
  get elapsed() {
    if (this._status === 'running') {
      return Date.now() - this._started;
    } else if (this._status === 'complete') {
      return this._finished - this._started;
    }
    return 0;
  }

  
  /**
   * The estimated time remaining in ms
   * 
   * Note: Returns 0 if the tracker's status is 'ready' or 'complete'
   */
  get estimated() {
    if (this.value > 0 && this._status === 'running') {
      return Math.round(this.target * (this.elapsed/this.value));
    } else {
      return 0;
    }
  }
}

const st = new StatusTracker();
