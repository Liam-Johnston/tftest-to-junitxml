import * as diagnostic from "./diagnostic";
import * as testAbstract from "./test-abstract";
import * as testFile from "./test-file";
import * as testRun from "./test-run";
import * as testSummary from "./test-summary";

import { LogParser } from "../interfaces";

export const parserMap: Record<string, LogParser> = {
  test_abstract: testAbstract.parse,
  test_file: testFile.parse,
  test_run: testRun.parse,
  test_summary: testSummary.parse,
  diagnostic: diagnostic.parse,
};
