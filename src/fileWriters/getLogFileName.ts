import { jestResultsFileSuffix } from "./constants";
import { getLogFileNameMainPart } from "./getLogFileNameMainPart";
import { TestResult } from "../types/TestResult";

export const getLogFileName = (
  that,
  testResult: TestResult,
  isRename?: boolean
): string => {
  const logFileMainPart = getLogFileNameMainPart(that);
  const testResultPrepared = isRename ? `(${testResult})` : testResult;
  return `${logFileMainPart}${testResultPrepared}${jestResultsFileSuffix}`;
};
