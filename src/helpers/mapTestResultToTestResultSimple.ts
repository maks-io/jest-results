import { TestResult, TestResultSimple } from "../types/TestResult";

export const mapTestResultToTestResultSimple = (
  testResult: TestResult
): TestResultSimple => {
  if (testResult === "OK") {
    return "success";
  } else if (testResult === "FAIL") {
    return "fail";
  } else if (testResult === "SKIP") {
    return "skip";
  } else if (testResult === "TODO") {
    return "todo";
  } else {
    return "notRunYet";
  }
};
