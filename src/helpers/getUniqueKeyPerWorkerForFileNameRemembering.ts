export const keyPrefix = "JEST_RESULTS__FILE_NAMES_REMEMBERING_FOR_";
export const getUniqueKeyPerWorkerForFileNameRemembering = (
  workerId: number
): string => {
  return `${keyPrefix}${workerId}`;
};
