import type { Circus } from "@jest/types";
import { getUniqueKeyPerWorkerForStats } from "../helpers/getUniqueKeyPerWorkerForStats";
import { tryToGetPreviousTestResult } from "../helpers/tryToGetPreviousTestResult";
import { writeTestLog } from "../fileWriters/writeTestLog";
import { rememberWrittenFileName } from "../helpers/rememberWrittenFileName";
import { getLogFileNameWithoutLineAndResult } from "../fileWriters/getLogFileNameWithoutLineAndResult";
import fs from "fs";
import { TestResult, TestResultSimple } from "../types/TestResult";
import { mapTestResultToTestResultSimple } from "../helpers/mapTestResultToTestResultSimple";
import { TestEnvironment } from "../types/TestEnvironment";
import { getTestEnvironmentOptions } from "../helpers/getTestEnvironmentOptions";

export const handleTestEventSkip = (
  that: TestEnvironment,
  test: Circus.TestEntry,
  event,
  state
): void => {
  const uniqueTestFileName = getLogFileNameWithoutLineAndResult(that);

  // the following is 'true', if test was skipped via .skip()
  // if 'false' it means test was just filtered out, therefore 'implicitly' skipped
  const testIsSkippedExplicitly = state.currentlyRunningTest.mode === "skip";

  const options = getTestEnvironmentOptions(that);
  const ignoreExplicitlySkippedTests =
    options.ignoreExplicitlySkippedTests ?? false;
  const ignoreImplicitlySkippedTests =
    options.ignoreImplicitlySkippedTests ?? true;
  const ignoreNotRunTests = options.ignoreNotRunTests ?? false;

  const keyForStats = getUniqueKeyPerWorkerForStats(that.workerId);

  const ignoreSkip =
    (testIsSkippedExplicitly && ignoreExplicitlySkippedTests) ||
    (!testIsSkippedExplicitly && ignoreImplicitlySkippedTests);

  const stats: any = that.global[keyForStats];

  if (ignoreSkip) {
    const previousTestResult: TestResult | null =
      tryToGetPreviousTestResult(that);

    if (!previousTestResult || previousTestResult === "NOT_RUN_YET") {
      if (!ignoreNotRunTests) {
        const writtenFileName = writeTestLog(that, "NOT_RUN_YET", undefined);

        rememberWrittenFileName(that.global, that.workerId, writtenFileName);

        stats.notRunYet.count = stats.notRunYet.count + 1;

        stats.notRunYet.uniqueTestIdentifiers.push({
          uniqueId: uniqueTestFileName,
          writtenFileName,
        });
      }
    } else {
      // in this case the previous result counts in the stats...
      const result: TestResultSimple =
        mapTestResultToTestResultSimple(previousTestResult);
      stats[result].count = stats[result].count + 1;

      const logFromPrevRun = fs.readFileSync(
        stats[result].uniqueTestIdentifiersFromPreviousRun.find(
          (l) => l.uniqueId === uniqueTestFileName
        ).writtenFileName,
        "utf-8"
      );

      const writtenFileName = writeTestLog(
        that,
        previousTestResult,
        undefined,
        logFromPrevRun
      );
      stats[result].uniqueTestIdentifiers.push({
        uniqueId: uniqueTestFileName,
        writtenFileName,
      });

      rememberWrittenFileName(that.global, that.workerId, writtenFileName);
    }
  } else {
    const writtenFileName = writeTestLog(that, "SKIP", undefined);

    rememberWrittenFileName(that.global, that.workerId, writtenFileName);

    stats.skip.count = stats.skip.count + 1;

    stats.skip.uniqueTestIdentifiers.push({
      uniqueId: uniqueTestFileName,
      writtenFileName,
    });
  }
};
