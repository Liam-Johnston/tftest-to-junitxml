export interface TestCase {
  startTime: Date;
  endTime?: Date;
  pass?: boolean;
  details?: {
    message: string;
    type: string;
    callStack: string;
  };
}

export interface TestSuiteResult {
  startTime: Date;
  endTime?: Date;
  testCases: {
    [name: string]: TestCase;
  };
}

export interface TestRunResult {
  startTime?: Date;
  endTime?: Date;
  testSuites: {
    [name: string]: TestSuiteResult;
  };
}

export interface TestFileLog {
  path: string;
  progress: "starting" | "teardown" | "complete";
  status?: "pass";
}

export interface LogParser {
  (timestamp: Date, testRunResult: TestRunResult, log: any): TestRunResult;
}
