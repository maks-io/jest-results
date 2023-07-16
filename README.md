# jest-results

[![Version](https://img.shields.io/npm/v/jest-results)](https://www.npmjs.com/package/jest-results)

<img alt="jest-results-logo" src="documentation/jestResultsLogo01.png" height="280px" />

Capture jest test output and collect it in individual log files.

## Features

- console output (`.log()`, `.warn()`, etc.) will be captured and written to individual log files next to the test file itself
- actual log output can either be (1) kept in the console or (2) solely written to the log files
- statistics about any given test file will also be written into 1 additional file per test file
- the status of tests (`OK`, `FAIL`, `SKIP`, `TODO`) is directly visible via log file names
- mechanism correctly handles explicit and implicit skipping of tests (where _explicit_ would be the usage of `.skip()`, and _implicit_ would be the usage of `.only()` on _other_ tests - and similar scenarios)
- **included command line tool** allows to easily clean repo from log- and/or stats-files
- entire mechanism can conditionally be turned off (for instance for CI/CD pipelines via env var `process.env.CI === 'true'`)
- _jest-results_ is actual a set of 2 similar jest `testEnvironments`, and provides both, a `node` and a `jsdom` variant. (For more infos on what that means, please refer to the [Jest documentation](https://jestjs.io/docs/configuration#testenvironment-string).)

## Install

```
npm install --save jest-results
```

Or if you use Yarn:

```
yarn add jest-results
```

## Usage

To use _jest-results_ simply set it as your `testEnvironment`. It depends on how you have set up Jest in your project, in case you are using a `jest.config.js` file for instance, you would just add the following:

```javascript
module.exports = {
  // ...some already existing here props maybe...

  testEnvironment: "jest-results/node",
  // OR:
  testEnvironment: "jest-results/jsdom",
};
```

If you run your tests after doing the above, it should already be working (meaning, creating stats- and log-files at the end of each test run).

However, a few things are configurable, and so far it will use the default settings. If you want to have more control over how it behaves, check out the following section.

## Options

To configure _jest-results_ provide a `testEnvironmentOptions` property, similar to how you have already defined the `testEnvironment`. Again, this can vary, for instance you can also provide these things via command line etc.

The following example, again, shows how to do it via the `jest.config.js` file:

```javascript
module.exports = {
  // ...some already existing here props maybe, including your testEnvironment setting!...

  testEnvironmentOptions: {
    jestResults: {
      keepLoggingToConsole: false,
      ignoreExplicitlySkippedTests: false,
      ignoreImplicitlySkippedTests: true,
      ignoreNotRunTests: false,
      setupHook: () => {
        console.log("Hi from setupHook!");
      },
      teardownHook: () => {
        console.log("Hi from teardownHook!");
      },
    },
  },
};
```

The following table describes the meaning of these configuration options. None of them is mandatory for now, you can see the corresponding fallback/default value too:

| option                       | type         | default value | description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ---------------------------- | ------------ | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| keepLoggingToConsole         | `boolean`    | `false`       | Every log statement will basically be redirected - from the original console, to the resulting log file(s) - if set to `false`. If you set it to `true` you will still be seeing the log statements also on your console.                                                                                                                                                                                                                                                                                                  |
| ignoreExplicitlySkippedTests | `boolean`    | `false`       | A test is "explicitly skipped", if the `.skip()` statement is used.<br/>If you set this to `true` it means _jest-results_ will ignore tests that were marked with `.skip()` - in other words, if such a test previously already had a test result, let's say `FAIL`, that result (and also the corresponding log output) will be kept during the next test run(s).<br/>If this is set to `false`, such a test will be updated during test runs, meaning the status in our example would change from `FAIL` to `SKIP`, etc. |
| ignoreImplicitlySkippedTests | `boolean`    | `true`        | A test is "implicitly skipped", if the `.only()` statement was used on other (!) tests, or if only failed tests are re-run but the test we are looking at succeeded already, etc.<br/>The meaning of this option is the same as for the one above, with the only difference that we are referring to _implicitly_ skipped tests here.                                                                                                                                                                                      |
| ignoreNotRunTests            | `boolean`    | `false`       | If you run a set of tests for the first time, no _jest-results_ files have been written yet. In such a case you can decide what happens with tests, that are skipped (both explicitly + implicitly) - should a log file with status `NOT_RUN_YET` be created? Then set this option to `false`. Or should no log file be created at all? Then set this option to `true`.                                                                                                                                                    |
| setupHook                    | `() => void` | `() => {}`    | If you need to run some code during the test environment setup phase, you can provide it here.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| teardownHook                 | `() => void` | `() => {}`    | If you need to run some code during the test environment teardown phase, you can provide it here.                                                                                                                                                                                                                                                                                                                                                                                                                          |

## Clean up / Command line tool

A command line tool for cleaning up / removing _jest-results_ files is included.

To use it simply run `jest-results` somewhere inside your repository. You can use this tool in the root folder as well as some deeper nested directory - the tool is capable of identifying the repository's root - if necessary.

Usage and options for this tool can be found by running `jest-results -h`, which will show the following:

```
Usage:
jest-results -c <clean_mode> [-d <directory_option>]

Options:
-h, --help      Display this help info
-v, --version   Return this package's version number
-c              CLEAN MODE
                Select which kinds of files should be removed.
                Accepts one of the following values:
                'all', 'stats', 'logs'
-d              DIRECTORY OPTION (optional)
                Select which directory is going to be clean up recursively.
                Accepts one of the following values:
                'root', 'current'
                When using 'root', which is the default, it does not matter what your current working directory is,
                it will clean your entire repository. When using 'current' it will clean your current working directory
                recursively.
-i              INVERT DIRECTORY SELECTION (optional)
                This can only be used in combination with `-d current`.
                When set, it will clean your entire repository except for the current working directory (and children directories).

```
