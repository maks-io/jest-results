import { getLogFileNameRaw } from "./getLogFileNameRaw";

export const getLogFileNameMainPart = (that): string => {
  const logFileNameRaw = getLogFileNameRaw(that);
  return `${that.currentTest.fileInfo.absolutePathName}${logFileNameRaw}`;
};
