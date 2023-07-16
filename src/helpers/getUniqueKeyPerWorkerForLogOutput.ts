export const keyPrefix = "JEST_RESULTS__PRINT_OUTPUT_FOR_";

export const getUniqueKeyPerWorkerForLogOutput = (workerId: number): string => {
  return `${keyPrefix}${workerId}`;
};
