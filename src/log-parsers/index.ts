import * as diagnostic from "./diagnostic";
import * as testAbstract from "./test-abstract";
import * as testFile from "./test-file";
import * as testRun from "./test-run";
import * as testSummary from "./test-summary";

import { TestRun } from "../test-objects/test-run";

interface LogParser {
  (timestamp: Date, testRun: TestRun, log?: any): void;
}

export const parserMap: Record<string, LogParser> = {
  test_abstract: testAbstract.parse,
  test_file: testFile.parse,
  test_run: testRun.parse,
  test_summary: testSummary.parse,
  diagnostic: diagnostic.parse,
};
