import type { JestEnvironment } from "@jest/environment";

export type TestEnvironment = JestEnvironment & {
  workerId: number;
};
