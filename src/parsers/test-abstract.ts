import { LogParser, TestRunResult } from "../interfaces";

export const parse: LogParser = (
  timestamp: Date,
  testRunResult: TestRunResult,
  _: any
): TestRunResult => {
  testRunResult.startTime = timestamp;

  return testRunResult;
};
