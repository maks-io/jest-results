import fs from "fs";
import { getUniqueKeyPerWorkerForLogOutput } from "../helpers/getUniqueKeyPerWorkerForLogOutput";
import { getLogFileName } from "./getLogFileName";
import { TestResult } from "../types/TestResult";

export const writeTestLog = (
  that: any,
  knownTestResult?: TestResult,
  error?: any,
  logFromPrevRun?: string
): string => {
  const workerId = that.workerId;

  const errorLine =
    that.currentTest?.errorLine?.split("/")?.pop() || "(no errorline found)";
  let errorMessage = "";
  if (error) {
    if (error.matcherResult) {
      // dealing with a jest assertion error
      errorMessage = `Jest Assertion Error at:\n${errorLine}\n\n${
        error.matcherResult?.message || ""
      }`;
    } else if (error.message) {
      // dealing with an exception during test
      errorMessage = `Exception/Error at:\n${errorLine}\n\n${error.message}`;
    }
  }

  errorMessage = errorMessage.replace(
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    ""
  );

  const collectedLogOutput =
    that.global[getUniqueKeyPerWorkerForLogOutput(workerId)];

  let testLog;
  if (!collectedLogOutput) {
    if (errorMessage) {
      testLog =
        "(no log output collected during test run, at least not until test threw the error below)\n";
    } else {
      testLog = "(no log output collected during test run)\n";
    }
  } else {
    testLog = collectedLogOutput.join("\n") + "\n";
  }

  const contentToWriteToFile = logFromPrevRun ?? `${testLog}\n${errorMessage}`;

  const testResult: TestResult = error ? "FAIL" : knownTestResult ?? "OK";
  const desiredFileName = getLogFileName(
    that,
    testResult,
    logFromPrevRun !== undefined
  );

  fs.writeFileSync(desiredFileName, contentToWriteToFile, "utf-8");

  return desiredFileName;
};
