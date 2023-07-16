import { createSafeString } from "../helpers/createSafeString";

export const getLogFileNameRaw = (that): string => {
  const testNameSafe = createSafeString(that.currentTest.testNamePretty);
  return `${that.currentTest.fileInfo.fileName}--line${that.currentTest.fileInfo.line}--${testNameSafe}--`;
};
