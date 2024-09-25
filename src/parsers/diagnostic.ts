import { LogParser, TestRunResult } from "../interfaces";

import { formatTestFile } from "./utils";

interface DiagnosticLog {
  range: {
    filename: string;
  };
  detail: string;
  summary: string;
  snippet: {
    context: string;
    code: string;
  };
}

export const parse: LogParser = (
  _: Date,
  testRunResult: TestRunResult,
  {
    diagnostic: { range, snippet, detail, summary },
  }: { diagnostic: DiagnosticLog }
) => {
  const testFilePath = formatTestFile(range.filename);
  const testName = snippet.context.split('"')[1];

  const test = testRunResult.testSuites[testFilePath].testCases[testName];

  if (test === undefined) {
    return testRunResult;
  }

  const { context, code } = snippet;

  test.details = {
    message: detail,
    type: summary,
    callStack: "\n" + context + "\n" + code + "\n",
  };

  return testRunResult;
};
