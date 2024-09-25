import { LogParser, TestRunResult } from "../interfaces";

import { formatTestFile } from "./utils";

interface TestFileLog {
  path: string;
  progress: "starting" | "teardown" | "complete";
  status?: "pass";
}

export const parse: LogParser = (
  timestamp: Date,
  testRunResult: TestRunResult,
  { test_file: { path, progress } }: { test_file: TestFileLog }
) => {
  const testFilePath = formatTestFile(path);

  if (progress === "starting") {
    testRunResult.testSuites = {
      ...testRunResult.testSuites,
      [testFilePath]: {
        startTime: timestamp,
        testCases: {},
      },
    };
  }

  if (progress === "complete") {
    testRunResult.testSuites[testFilePath].endTime = timestamp;
  }

  return testRunResult;
};
