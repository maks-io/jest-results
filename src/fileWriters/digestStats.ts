import fs from "fs";
import { Stats } from "../types/Stats";
import { jestResultsFileSuffix, statsFileDetailsSeperator } from "./constants";
import { rememberWrittenFileName } from "../helpers/rememberWrittenFileName";

export const digestStats = (
  that,
  absolutePathInclFileName: string,
  statsRaw: Stats
) => {
  let totalNrOfTestsInFile = 0;
  let totalNrOfDoneTests = 0;
  let statFileContent = "";
  Object.keys(statsRaw).forEach((testResult) => {
    const nrOfOccurrences = statsRaw[testResult].count;
    totalNrOfTestsInFile += nrOfOccurrences;
    if (testResult === "success" || testResult === "fail") {
      totalNrOfDoneTests += nrOfOccurrences;
    }
    statFileContent += `${testResult}: ${nrOfOccurrences}\n`;
  });

  const totalNrMessage = `Total nr. of tests in file: ${totalNrOfTestsInFile}\n\n`;

  const percentage =
    totalNrOfDoneTests === 0
      ? 0
      : Math.floor((statsRaw["success"].count / totalNrOfDoneTests) * 100);
  const percentageMessage = `Success vs. Fail: ${percentage}%\n\n`;

  const testsCategorizedInfo = JSON.stringify(
    {
      success: statsRaw.success.uniqueTestIdentifiers,
      fail: statsRaw.fail.uniqueTestIdentifiers,
      todo: statsRaw.todo.uniqueTestIdentifiers,
      skip: statsRaw.skip.uniqueTestIdentifiers,
      notRunYet: statsRaw.notRunYet.uniqueTestIdentifiers,
    },
    null,
    2
  );

  statFileContent =
    totalNrMessage +
    percentageMessage +
    statFileContent +
    statsFileDetailsSeperator +
    testsCategorizedInfo;

  const desiredFileName = `${absolutePathInclFileName}---${percentage}%-${jestResultsFileSuffix}`;

  fs.writeFileSync(desiredFileName, statFileContent, "utf-8");

  rememberWrittenFileName(that.global, that.workerId, desiredFileName);
};
