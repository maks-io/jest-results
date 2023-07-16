import { TestResult } from "../types/TestResult";
import { getUniqueKeyPerWorkerForStats } from "./getUniqueKeyPerWorkerForStats";
import { getLogFileNameWithoutLineAndResult } from "../fileWriters/getLogFileNameWithoutLineAndResult";

export const tryToGetPreviousTestResult = (that): TestResult => {
  const keyForStats = getUniqueKeyPerWorkerForStats(that.workerId);
  const stats = that.global[keyForStats];
  const fileNameUnique = getLogFileNameWithoutLineAndResult(that);
  console.log("COMPARE", fileNameUnique)
  if (
    stats.success.uniqueTestIdentifiersFromPreviousRun
      .map((r) => r.uniqueId)
      .includes(fileNameUnique)
  ) {
    return "OK";
  } else if (
    stats.fail.uniqueTestIdentifiersFromPreviousRun
      .map((r) => r.uniqueId)
      .includes(fileNameUnique)
  ) {
    return "FAIL";
  } else if (
    stats.skip.uniqueTestIdentifiersFromPreviousRun
      .map((r) => r.uniqueId)
      .includes(fileNameUnique)
  ) {
    return "SKIP";
  } else if (
    stats.todo.uniqueTestIdentifiersFromPreviousRun
      .map((r) => r.uniqueId)
      .includes(fileNameUnique)
  ) {
    return "TODO";
  } else if (
    stats.notRunYet.uniqueTestIdentifiersFromPreviousRun
      .map((r) => r.uniqueId)
      .includes(fileNameUnique)
  ) {
    return "NOT_RUN_YET";
  }

  return null;
};
