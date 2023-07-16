import NodeEnvironment from "jest-environment-node";
import { JestEnvironment } from "@jest/environment";
import { TestEnvironment } from "../types/TestEnvironment";
import { JestResultsTestEnvironmentOptions } from "../types/JestResultsTestEnvironmentOptions";

const getIsJestResultsEnabledDefault = () => process.env.CI !== "true";
const keepLoggingToConsoleDefault: boolean = false;

const testEnvironmentOptionsDefault = {
  getIsJestResultsEnabled: getIsJestResultsEnabledDefault,
  keepLoggingToConsole: keepLoggingToConsoleDefault,
};

export const getTestEnvironmentOptions = (
  testEnv: TestEnvironment
): JestResultsTestEnvironmentOptions => {
  if ((testEnv as unknown as NodeEnvironment)?.context) {
    return {
      ...testEnvironmentOptionsDefault,
      ...(testEnv as unknown as NodeEnvironment)?.context?.jestResults,
    };
  } else {
    return {
      ...testEnvironmentOptionsDefault,
      // @ts-ignore
      ...(testEnv as unknown as JestEnvironment)?.fakeTimersModern?._config
        ?.testEnvironmentOptions?.jestResults,
    };
  }
};
