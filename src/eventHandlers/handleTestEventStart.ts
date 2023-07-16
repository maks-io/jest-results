import type { Circus } from "@jest/types";
import { getTestNamePretty } from "../helpers/getTestNamePretty";
import { extractTestFileInfos } from "../helpers/extractTestFileInfos";
import { getUniqueKeyPerWorkerForLogOutput } from "../helpers/getUniqueKeyPerWorkerForLogOutput";
import { getPreviousTestRunInfosIfNotAvailableYet } from "../helpers/getPreviousTestRunInfosIfNotAvailableYet";

export const handleTestEventStart = (
  that: any,
  test: Circus.TestEntry
): void => {
  that.currentTest = {};

  const testPath = test.asyncError.stack.split("\n")[1];

  that.currentTest.fileInfo = extractTestFileInfos(testPath);

  getPreviousTestRunInfosIfNotAvailableYet(that);

  const testNameHierarchy: string[] = getTestNamePretty(test);
  that.currentTest.uniqueTestId = testNameHierarchy.join("--");
  that.currentTest.testNamePretty = testNameHierarchy.pop();

  that.currentTest.parents = testNameHierarchy;

  that.currentTest.logOutput = "";

  const keyForLogOutput = getUniqueKeyPerWorkerForLogOutput(that.workerId);
  that.global[keyForLogOutput] = "";
};
