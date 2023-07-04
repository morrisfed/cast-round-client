import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/lib/TaskEither";

import {
  getEventTellors as apiGetEventTellors,
  createEventTellor as apiCreateEventTellor,
} from "api/tellors";
import { EventTellor } from "interfaces/tellors";

export const getEventTellors = (
  eventId: string
): TE.TaskEither<Error | "not-found", readonly EventTellor[]> => {
  return apiGetEventTellors(eventId);
};

export const createEventTellor = (
  eventId: number,
  label: string
): TE.TaskEither<Error | "forbidden", EventTellor> => {
  return pipe(apiCreateEventTellor(eventId, label));
};
