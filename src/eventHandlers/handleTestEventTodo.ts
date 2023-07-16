import { getUniqueKeyPerWorkerForStats } from "../helpers/getUniqueKeyPerWorkerForStats";
import { writeTestLog } from "../fileWriters/writeTestLog";
import { rememberWrittenFileName } from "../helpers/rememberWrittenFileName";
import { getLogFileNameWithoutLineAndResult } from "../fileWriters/getLogFileNameWithoutLineAndResult";

export const handleTestEventTodo = (that: any): void => {
  that.currentTest.todo = true;

  const writtenFileName = writeTestLog(that, "TODO", undefined);

  rememberWrittenFileName(that.global, that.workerId, writtenFileName);

  const keyForStats = getUniqueKeyPerWorkerForStats(that.workerId);
  that.global[keyForStats].todo.count = that.global[keyForStats].todo.count + 1;

  const uniqueTestFileName = getLogFileNameWithoutLineAndResult(that);
  that.global[keyForStats].todo.uniqueTestIdentifiers.push({
    uniqueId: uniqueTestFileName,
    writtenFileName,
  });
};
