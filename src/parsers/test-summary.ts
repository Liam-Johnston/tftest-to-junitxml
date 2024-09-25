import { LogParser, TestRunResult } from "../interfaces";

export const parse: LogParser = (
  timestamp: Date,
  testRunResults: TestRunResult,
  _: any
) => {
  testRunResults.endTime = timestamp;

  return testRunResults;
};
