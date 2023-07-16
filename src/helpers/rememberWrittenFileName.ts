import { getUniqueKeyPerWorkerForFileNameRemembering } from "./getUniqueKeyPerWorkerForFileNameRemembering";

export const rememberWrittenFileName = (
  global,
  workerId: number,
  writtenFileName: string
) => {
  const keyForFileNameRemembering =
    getUniqueKeyPerWorkerForFileNameRemembering(workerId);
  global[keyForFileNameRemembering].push(writtenFileName);
};
