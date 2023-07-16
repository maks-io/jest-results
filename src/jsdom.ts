// @ts-nocheck
import { TestEnvironment } from "jest-environment-jsdom";
import { Event, State } from "jest-circus";
import { _handleTestEvent } from "./eventHandlers/_handleTestEvent";
import { getUniqueKeyPerWorkerForStats } from "./helpers/getUniqueKeyPerWorkerForStats";
import { digestStats } from "./fileWriters/digestStats";
import { interceptLogger } from "./helpers/interceptLogger";
import { Stats } from "./types/Stats";
import { TextEncoder } from "util";
import { initializeStats } from "./helpers/initializeStats";
import { getUniqueKeyPerWorkerForFileNameRemembering } from "./helpers/getUniqueKeyPerWorkerForFileNameRemembering";
import { cleanUpFiles } from "./helpers/cleanUpFiles";
import { getTestEnvironmentOptions } from "./helpers/getTestEnvironmentOptions";

export default class Jsdom extends TestEnvironment {
  workerId: number = -1;
  consoleBackup;
  currentTest;
  isEnabled: boolean = (() => {
    const { getIsJestResultsEnabled } = getTestEnvironmentOptions(this);
    return getIsJestResultsEnabled();
  })();

  constructor(config, context) {
    const { globalConfig, projectConfig } = config;
    super({ globalConfig, projectConfig }, context);

    if (typeof this.global.TextEncoder === "undefined") {
      const { TextEncoder } = require("util");
      this.global.TextEncoder = TextEncoder;
    }

    this.workerId = parseInt(process.env.JEST_WORKER_ID, 10);
  }

  public async setup(): Promise<void> {
    await super.setup();

    if (!this.isEnabled) {
      return;
    }

    const { setupHook } = getTestEnvironmentOptions(this);

    interceptLogger(this);

    const keyForStats = getUniqueKeyPerWorkerForStats(this.workerId);
    this.global[keyForStats] = initializeStats();

    const keyForFileNameRemembering =
      getUniqueKeyPerWorkerForFileNameRemembering(this.workerId);
    this.global[keyForFileNameRemembering] = [];

    if (setupHook) {
      setupHook();
    }
  }

  public async teardown(): Promise<void> {
    if (!this.isEnabled) {
      return;
    }

    const { teardownHook } = getTestEnvironmentOptions(this);

    if (this.currentTest && this.currentTest.fileInfo) {
      const absolutePathInclFileName =
        this.currentTest.fileInfo.absolutePathInclFileName;
      const keyForStats = getUniqueKeyPerWorkerForStats(this.workerId);
      digestStats(
        this,
        absolutePathInclFileName,
        this.global[keyForStats] as Stats,
      );
      cleanUpFiles(this);
    } else {
      // nothing to do
    }

    this.global.console = this.consoleBackup;

    if (teardownHook) {
      teardownHook();
    }

    await super.teardown();
  }

  handleTestEvent = !this.isEnabled
    ? () => {}
    : async (event: Event, state: State): Promise<void> => {
        await _handleTestEvent(this, event, state);
      };
}
