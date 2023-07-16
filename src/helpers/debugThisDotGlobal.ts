import fs from "fs";
import util from "util";

export const debugThisDotGlobal = (
  thisDotGlobal,
  context: string,
  onlyLookAtJestResultsProps = true
) => {
  if (!onlyLookAtJestResultsProps) {
    fs.writeFileSync(
      `./global${context}.json`,
      util.inspect(thisDotGlobal, { maxStringLength: 255 }),
      "utf-8"
    );
  }
  const thisDotGlobalRelevant = {};
  const relevantKeys = Object.keys(thisDotGlobal).filter((key) =>
    key.startsWith("JEST_RESULTS")
  );
  relevantKeys.forEach((key) => {
    thisDotGlobalRelevant[key] = thisDotGlobal[key];
  });
};
