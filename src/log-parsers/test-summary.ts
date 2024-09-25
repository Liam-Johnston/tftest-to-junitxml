import { TestRun } from "../test-objects/test-run";

export const parse = (timestamp: Date, testRun: TestRun) => {
  testRun.end(timestamp);
};
