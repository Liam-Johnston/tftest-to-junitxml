import * as fs from "fs";
import * as readline from "readline";

import { TestRunResult } from "./interfaces";
import { logger } from "./logger";
import { parserMap } from "./parsers";

export const parseTerraformTestLog = async (
  filePath: string
): Promise<TestRunResult> => {
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let parsedTestLog: TestRunResult = {
    testSuites: {},
  };

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

    parsedTestLog = parser(timestamp, parsedTestLog, jsonObject);

    logger.debug({
      message: "log entry parsed",
      parsedTestLog,
    });
  }

  logger.debug({
    message: "finished parsing log file",
    parsedTestLog,
  });

  return parsedTestLog;
};
