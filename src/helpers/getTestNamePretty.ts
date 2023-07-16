import type { Circus } from "@jest/types";

export const getTestNamePretty = (
  parent: Circus.TestEntry | Circus.DescribeBlock | undefined
): string[] => {
  if (!parent) {
    return [];
  }

  if (parent.name === "ROOT_DESCRIBE_BLOCK") {
    return [];
  }

  const parentName = getTestNamePretty(parent.parent);
  return [...parentName, parent.name];
};
