import { TestCase } from "../test-objects/test-case";
import { TestRun } from "../test-objects/test-run";
import { TestSuite } from "../test-objects/test-suite";

const startTestCase = (timestamp: Date, testSuite: TestSuite, name: string) => {
  const testCase = new TestCase(name, timestamp);

  testSuite.addTestCase(testCase);
};

const completeTestCase = (
  timeStamp: Date,
  testSuite: TestSuite,
  name: string
) => {
  const testCase = testSuite.getTestCase(name);

  if (testCase === undefined) {
    throw new Error("Trying to Complete Unknown Test Case");
  }

  testCase.complete(timeStamp);
};

interface TestRunLog {
  path: string;
  run: string;
  progress: "complete" | "starting" | "teardown";
  elapsed?: number;
  status?: "pass" | "fail";
}

export const parse = (
  timestamp: Date,
  testRun: TestRun,
  { test_run: log }: { test_run: TestRunLog }
) => {
  const { progress, path: testSuiteName, run: name } = log;

  if (progress !== "starting" && progress !== "complete") {
    return;
  }

  const testSuite = testRun.getTestSuite(testSuiteName);

  if (testSuite === undefined) {
    throw new Error("Trying To Update Test Case of Unknown Test Suite");
  }

  if (progress === "starting") {
    return startTestCase(timestamp, testSuite, name);
  }

  if (progress === "complete") {
    return completeTestCase(timestamp, testSuite, name);
  }
};
