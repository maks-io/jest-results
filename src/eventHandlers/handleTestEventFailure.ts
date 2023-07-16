import type { Circus } from "@jest/types";

export const handleTestEventFailure = (
  that: any,
  event: {
    name: "test_fn_failure";
    error: Circus.Exception;
    test: Circus.TestEntry;
  }
): void => {
  const errorLine = event.error?.stack?.split("    at ")[1];
  that.currentTest.errorLine = errorLine.split(")\n")[0].split("(").pop();
};
