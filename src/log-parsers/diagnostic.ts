import { TestRun } from "../test-objects/test-run";
import { logger } from "../logger";

interface DiagnosticLog {
  range?: {
    filename?: string;
  };
  detail?: string;
  summary?: string;
  snippet?: {
    context?: string;
    code?: string;
  };
}

export const parse = (
  _: Date,
  testRun: TestRun,
  { diagnostic: log }: { diagnostic: DiagnosticLog }
) => {
  const testSuiteName = log.range?.filename;
  const testCaseName = log.snippet?.context?.split('"')?.at(1);

  if (testSuiteName === undefined || testCaseName === undefined) {
    logger.debug({
      msg: "attempted to parse diagnostic log in unexpected format",
      log,
    });

    return;
  }

  testRun
    .getTestSuite(testSuiteName)
    ?.getTestCase(testCaseName)
    ?.addFailureDetails({
      message: log.detail || "",
      type: log.summary || "",
      callStack: "\n" + log.snippet?.context + "\n" + log.snippet?.code + "\n",
    });
};
