const keyPrefix = "JEST_RESULTS__STATS_FOR_";

export const getUniqueKeyPerWorkerForStats = (workerId: number): string => {
  return `${keyPrefix}${workerId}`;
};
