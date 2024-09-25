import { TestRun } from "../test-objects/test-run";
import { TestSuite } from "../test-objects/test-suite";

const startTestSuite = (
  timestamp: Date,
  testSuiteName: string,
  testRun: TestRun
) => {
  const testSuite = new TestSuite(testSuiteName, timestamp);

  testRun.addTestSuite(testSuiteName, testSuite);
};

const completeTestSuite = (
  timestamp: Date,
  testSuiteName: string,
  testRun: TestRun
) => {
  const testSuite = testRun.getTestSuite(testSuiteName);

  if (testSuite === undefined) {
    throw new Error("Trying To Finish Test Suite Before Starting It");
  }

  testSuite.complete(timestamp);
};

interface TestFileLog {
  path: string;
  progress: "starting" | "teardown" | "complete";
  status?: "pass";
}

export const parse = (
  timestamp: Date,
  testRun: TestRun,
  { test_file: log }: { test_file: TestFileLog }
) => {
  const { path: testSuiteName, progress } = log;

  if (progress === "starting") {
    return startTestSuite(timestamp, testSuiteName, testRun);
  }

  if (progress === "complete") {
    return completeTestSuite(timestamp, testSuiteName, testRun);
  }
};
