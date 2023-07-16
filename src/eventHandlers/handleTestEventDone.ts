import type { Circus } from "@jest/types";
import { writeTestLog } from "../fileWriters/writeTestLog";
import { getUniqueKeyPerWorkerForStats } from "../helpers/getUniqueKeyPerWorkerForStats";
import { rememberWrittenFileName } from "../helpers/rememberWrittenFileName";
import { getLogFileNameWithoutLineAndResult } from "../fileWriters/getLogFileNameWithoutLineAndResult";

export const handleTestEventDone = (
  that: any,
  test: Circus.TestEntry,
): void => {
  const { errors } = test;
  const error = errors?.[0]?.[0];

  const writtenFileName = writeTestLog(that, undefined, error);

  rememberWrittenFileName(that.global, that.workerId, writtenFileName);

  const keyForStats = getUniqueKeyPerWorkerForStats(that.workerId);
  const uniqueTestFileName = getLogFileNameWithoutLineAndResult(that);
  if (error) {
    that.global[keyForStats].fail.count =
      that.global[keyForStats].fail.count + 1;
    that.global[keyForStats].fail.uniqueTestIdentifiers.push({
      uniqueId: uniqueTestFileName,
      writtenFileName,
    });
  } else {
    that.global[keyForStats].success.count =
      that.global[keyForStats].success.count + 1;
    that.global[keyForStats].success.uniqueTestIdentifiers.push({
      uniqueId: uniqueTestFileName,
      writtenFileName,
    });
  }
};
