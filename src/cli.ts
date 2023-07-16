#!/usr/bin/env node
import minimist from "minimist";
import fs from "fs";
import { glob } from "glob";
import { identifyMonorepoRoot } from "identify-monorepo-root";
import { getHelp } from "./getHelp.js";
import {
  jestResultsFileSuffix,
  statsFileSuffix,
} from "./fileWriters/constants";

const packageJson = JSON.parse(
  fs.readFileSync(__dirname + "/../package.json", "utf-8"),
);
const argv = minimist(process.argv.slice(2));

const { h, help, v, version, d, i } = argv;

if (h || help) {
  console.log(getHelp(true));
  process.exit(0);
}

if (v || version) {
  console.log(packageJson.version);
  process.exit(0);
}

const cleanMode = argv.c;
const allowedCleanModes = ["all", "stats", "logs"];

if (!cleanMode || !allowedCleanModes.includes(cleanMode)) {
  console.log(getHelp(true));
  process.exit(1);
}

const dir = argv.d;
const allowedDirs = ["root", "current"];
if (d && (!dir || !allowedDirs.includes(dir))) {
  console.log(getHelp(true));
  process.exit(1);
}

const usedDirMode = dir ?? "root";
const repoRoot = identifyMonorepoRoot();
if (usedDirMode === "root" && !repoRoot) {
  console.log(getHelp(true));
  process.exit(1);
}
if (usedDirMode === "root" && i) {
  console.log(getHelp(true));
  process.exit(1);
}

const currentDir = process.cwd();
const usedDir =
  usedDirMode === "root" ? repoRoot : Boolean(i) ? repoRoot : currentDir;

// console.log("repoRoot", repoRoot);
const pattern = `${usedDir}/**/*${jestResultsFileSuffix}`;

const inversionFilter = (f) =>
  !i ? true : !`${usedDir}/${f}`.includes(currentDir);

const allJestResultsFiles = glob
  .globSync(pattern, { ignore: "node_modules" })
  .filter(inversionFilter);

const allJestResultsStatsFiles = allJestResultsFiles
  .filter((f) => f.endsWith(statsFileSuffix))
  .filter(inversionFilter);
const allJestResultsLogFiles = allJestResultsFiles
  .filter((f) => !f.endsWith(statsFileSuffix))
  .filter(inversionFilter);

const filesToDelete =
  cleanMode === "all"
    ? allJestResultsFiles
    : cleanMode === "stats"
    ? allJestResultsStatsFiles
    : allJestResultsLogFiles;

filesToDelete.forEach((f) => {
  fs.unlinkSync(f);
});

// print output message:

const msgStatsFiles = `Number of removed stats files: ${
  cleanMode !== "logs" ? allJestResultsStatsFiles.length : 0
}\n`;
const msgLogFiles = `Number of removed log files: ${
  cleanMode !== "stats" ? allJestResultsLogFiles.length : 0
}\n`;

const tab = "  ";

console.log(
  `🃏 jest-results clean-up 🃏\n\n${tab}Targeting directory:  \t${usedDir}${
    Boolean(i) ? `\n${tab}and excluding directory:\t${currentDir}` : ""
  }\n\n${tab}Result:\n${tab}${msgStatsFiles}${tab}${msgLogFiles}`,
);
