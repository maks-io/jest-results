import { getUniqueKeyPerWorkerForLogOutput } from "./getUniqueKeyPerWorkerForLogOutput";
import { LogLevel } from "../types/LogLevel";

export const interceptLogger = (that, keepLoggingToConsole: boolean) => {
  that.consoleBackup = that.global.console;

  const key = getUniqueKeyPerWorkerForLogOutput(that.workerId);
  Object.keys(LogLevel).forEach((logLevel) => {
    const logFnOriginal = that.global.console[logLevel];
    that.global.console[logLevel] = keepLoggingToConsole
      ? (...data: any[]) => {
          logFnOriginal(`worker ${that.workerId}:`, ...data); // this makes sure to still log to the console
          that.global[key] = [...(that.global[key] || []), ...data];
        }
      : (...data: any[]) => {
          that.global[key] = [...(that.global[key] || []), ...data];
        };
  });
};
