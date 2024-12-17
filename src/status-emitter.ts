import Emittery from 'emittery';

export type StatusData<Custom extends Record<string, unknown> = {}> = Custom & {
  target: number;
  value: number;
  message?: string;
}

/**
 * Standard events for progress functions
 */
export type StatusEvents<Data extends StatusData = StatusData> = {
  start: Partial<Data> | undefined;
  progress: Data;
  complete: Data;
}

export class StatusEmitter<Events = StatusEvents> extends Emittery<Events> {
  // Nothing to see here, folks, patching around a type definition issue.
  override bindMethods(target: object, methodNames?: readonly string[]) {
    super.bindMethods(target as Record<string, unknown>, methodNames)
  }
}