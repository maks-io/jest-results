export interface JestResultsTestEnvironmentOptions {
  getIsJestResultsEnabled?: () => boolean;
  keepLoggingToConsole?: boolean;
  ignoreExplicitlySkippedTests?: boolean;
  ignoreImplicitlySkippedTests?: boolean;
  ignoreNotRunTests?: boolean;
  setupHook?: () => void;
  teardownHook?: () => void;
}
