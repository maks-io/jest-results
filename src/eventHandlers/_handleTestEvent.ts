import { Event, State } from "jest-circus";
import type { Circus } from "@jest/types";
import { handleTestEventStart } from "./handleTestEventStart";
import { handleTestEventDone } from "./handleTestEventDone";
import { handleTestEventFailure } from "./handleTestEventFailure";
import { handleTestEventSkip } from "./handleTestEventSkip";
import { handleTestEventTodo } from "./handleTestEventTodo";
import { TestEnvironment } from "../types/TestEnvironment";

export const _handleTestEvent = (
  that: TestEnvironment,
  event: Event,
  state: State
): void => {
  if (event.name === "test_start") {
    handleTestEventStart(that, event.test);
  } else if (event.name === "test_done") {
    handleTestEventDone(that, event.test);
  } else if (event.name === "test_skip") {
    handleTestEventSkip(that, event.test, event, state);
  } else if (event.name === "test_todo") {
    handleTestEventTodo(that);
  } else if (event.name === "test_fn_failure") {
    handleTestEventFailure(
      that,
      event as {
        name: "test_fn_failure";
        error: Circus.Exception;
        test: Circus.TestEntry;
      }
    );
  }
};
