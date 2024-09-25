import * as fs from "fs";
import * as readline from "readline";

import { TestRun } from "./test-objects/test-run";
import { logger } from "./logger";
import { parserMap } from "./log-parsers";

export const parseTerraformTestLog = async (
  filePath: string
): Promise<TestRun> => {
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const testRun = new TestRun();

  for await (const line of rl) {
    logger.debug({
      message: "parsing line of log file",
      line,
    });

    const {
      type: logType,
      "@timestamp": rawTimestamp,
      ...jsonObject
    } = JSON.parse(line);

    logger.debug({
      message: "extracted values from log entry",
      logType,
      rawTimestamp,
      jsonObject,
    });

    const timestamp = new Date(rawTimestamp);

    const parser = parserMap[logType];

    if (parser === undefined) {
      logger.debug({
        message: "log entry type doesn't have parser defined for it",
        logType,
      });

      continue;
    }

    parser(timestamp, testRun, jsonObject);

    logger.debug({
      message: "log entry parsed",
    });
  }

  logger.debug({
    message: "finished parsing log file",
  });

  return testRun;
};
