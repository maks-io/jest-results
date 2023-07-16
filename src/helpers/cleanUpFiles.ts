import fs from "fs";
import { getUniqueKeyPerWorkerForFileNameRemembering } from "./getUniqueKeyPerWorkerForFileNameRemembering";

export const cleanUpFiles = (that) => {
  const keyForFileNameRemembering = getUniqueKeyPerWorkerForFileNameRemembering(
    that.workerId,
  );
  const recentlyAddedFiles = that.global[keyForFileNameRemembering];

  const { absolutePathName: absolutePath, fileName } =
    that.currentTest.fileInfo;

  const allFiles = fs.readdirSync(absolutePath);
  const jestResultsFiles = allFiles.filter((f) => f.endsWith("--.test.log"));

  jestResultsFiles.forEach((file) => {
    if (
      !recentlyAddedFiles.includes(`${absolutePath}${file}`) &&
      file.includes(fileName)
    ) {
      console.log("DEBUGB DELETE", {
        file,
        s: `${absolutePath}${file}`,
        fileName,
      });
      fs.unlinkSync(`${absolutePath}${file}`);
    }
  });
};
