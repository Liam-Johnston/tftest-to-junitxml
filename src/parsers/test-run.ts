import { LogParser, TestRunResult } from "../interfaces";

import { formatTestFile } from "./utils";

interface TestRunLog {
  path: string;
  run: string;
  progress: "complete" | "starting" | "teardown";
  elapsed?: number;
  status?: "pass" | "fail";
}

export const parse: LogParser = (
  timestamp: Date,
  testRunResult: TestRunResult,
  { test_run: { path, run, progress, status } }: { test_run: TestRunLog }
): TestRunResult => {
  const testFilePath = formatTestFile(path);

  if (progress === "starting") {
    testRunResult.testSuites[testFilePath].testCases[run] = {
      startTime: timestamp,
    };
  }

  if (progress === "complete") {
    testRunResult.testSuites[testFilePath].testCases[run].endTime = timestamp;
    testRunResult.testSuites[testFilePath].testCases[run].pass =
      status === "pass";
  }

  return testRunResult;
};
