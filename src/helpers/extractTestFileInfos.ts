import { FileInfo } from "../types/FileInfo";

export const extractTestFileInfos = (testPath: string): FileInfo => {

  const rootDirectoryAbsolute =
    require.main.filename.split("/node_modules/")[0];
  const packagePathRaw = testPath.split(rootDirectoryAbsolute)[1];

  // console.log("packagePathRaw", packagePathRaw);
  const packagePath_doubleDotSplit: string[] = packagePathRaw.split(":");
  const column = parseInt(packagePath_doubleDotSplit.pop() as string);
  const line = parseInt(packagePath_doubleDotSplit.pop() as string);
  const packagePath = packagePath_doubleDotSplit as unknown as string;

  const absolutePathInclFileNameRaw: string =
    rootDirectoryAbsolute +
    testPath.split("at ")[1].split(rootDirectoryAbsolute)[1];
  const absolutePathInclFileName: string =
    absolutePathInclFileNameRaw.split(":")[0];
  const absolutePathInclFileName_slashSplit: string[] =
    absolutePathInclFileName.split("/");
  const fileName: string = absolutePathInclFileName_slashSplit.pop() as string;
  const absolutePathName: string =
    absolutePathInclFileName_slashSplit.join("/") + "/";

  return {
    absolutePathInclFileNameRaw,
    absolutePathInclFileName,
    absolutePathName,
    fileName,
    packagePathRaw,
    packagePath,
    line,
    column,
  };
};
