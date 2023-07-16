import {getUniqueKeyPerWorkerForStats} from "./getUniqueKeyPerWorkerForStats";
import fs from "fs";
import {statsFileDetailsSeperator, statsFileSuffix,} from "../fileWriters/constants";

export const getPreviousTestRunInfosIfNotAvailableYet = (that) => {
  const keyForStats = getUniqueKeyPerWorkerForStats(that.workerId);
  if (!that.global[keyForStats].success.uniqueTestIdentifiersFromPreviousRun) {
    const absolutePath = that.currentTest.fileInfo.absolutePathName;
    const files = fs.readdirSync(absolutePath);
    const prevStatFile = files.find(
      (file) =>
        file.endsWith(statsFileSuffix) &&
        file.includes(that.currentTest.fileInfo.fileName)
    );
    let prevData;
    if (prevStatFile) {
      try {
        const prevDataFileName = `${absolutePath}/${prevStatFile}`;
        prevData = JSON.parse(
          fs
            .readFileSync(prevDataFileName, "utf-8")
            .split(statsFileDetailsSeperator)[1]
        );
      } catch (e) {
        throw new Error(
          `Failed to parse old state file '${prevStatFile}', with the following error: ${e}`
        );
      }

      that.global[keyForStats].success.uniqueTestIdentifiersFromPreviousRun =
        prevData.success;
      that.global[keyForStats].fail.uniqueTestIdentifiersFromPreviousRun =
        prevData.fail;
      that.global[keyForStats].skip.uniqueTestIdentifiersFromPreviousRun =
        prevData.skip;
      that.global[keyForStats].todo.uniqueTestIdentifiersFromPreviousRun =
        prevData.todo;
      that.global[keyForStats].notRunYet.uniqueTestIdentifiersFromPreviousRun =
        prevData.notRunYet;
    } else {
      that.global[keyForStats].success.uniqueTestIdentifiersFromPreviousRun =
        [];
      that.global[keyForStats].fail.uniqueTestIdentifiersFromPreviousRun = [];
      that.global[keyForStats].skip.uniqueTestIdentifiersFromPreviousRun = [];
      that.global[keyForStats].todo.uniqueTestIdentifiersFromPreviousRun = [];
      that.global[keyForStats].notRunYet.uniqueTestIdentifiersFromPreviousRun =
        [];
    }
  }
};
