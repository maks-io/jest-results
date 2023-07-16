import { createSafeString } from "../helpers/createSafeString";

export const getLogFileNameWithoutLineAndResult = (that): string => {
  const testNameSafe = createSafeString(that.currentTest.uniqueTestId);
  return `${that.currentTest.fileInfo.absolutePathName}${that.currentTest.fileInfo.fileName}--${testNameSafe}`;
};
