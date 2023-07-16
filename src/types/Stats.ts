interface StatDetails {
  count: number;
  uniqueTestIdentifiers: string[];
  uniqueTestIdentifiersFromPreviousRun?: string[];
}

export interface Stats {
  success: StatDetails;
  fail: StatDetails;
  skip: StatDetails;
  todo: StatDetails;
  notRunYet: StatDetails;
}
