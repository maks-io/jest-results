export const initializeStats = () => {
  return {
    success: {
      count: 0,
      uniqueTestIdentifiers: [],
      uniqueTestIdentifiersFromPreviousRun: undefined,
    },
    fail: {
      count: 0,
      uniqueTestIdentifiers: [],
      uniqueTestIdentifiersFromPreviousRun: undefined,
    },
    skip: {
      count: 0,
      uniqueTestIdentifiers: [],
      uniqueTestIdentifiersFromPreviousRun: undefined,
    },
    todo: {
      count: 0,
      uniqueTestIdentifiers: [],
      uniqueTestIdentifiersFromPreviousRun: undefined,
    },
    notRunYet: {
      count: 0,
      uniqueTestIdentifiers: [],
      uniqueTestIdentifiersFromPreviousRun: undefined,
    },
  };
};
