import type { Config } from "jest";

const config: Config = {
  verbose: true,
  testEnvironment: "./build/jestResultEnvironmentJsdom.js",
  testEnvironmentOptions: {
    logOriginRoot: __dirname,
    prependLogOrigin: true
  },
};

export default config;
