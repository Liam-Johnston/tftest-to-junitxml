import { enableDebugLogging, logger } from "./logger";

import { parse } from "js2xmlparser";
import { parseTerraformTestLog } from "./parser";
import { program } from "commander";
import { writeFileSync } from "fs";

interface Options {
  output: string;
  debug?: boolean;
}

const main = async (testResultLogFilePath: string, options: Options) => {
  if (options.debug === true) {
    enableDebugLogging();
  }

  logger.debug({
    message: "starting tftest output parser",
    options,
    testResultLogFilePath,
    outputFile: options.output,
  });

  const testRun = await parseTerraformTestLog(testResultLogFilePath);

  const xml = parse("testsuites", testRun.render(), {
    declaration: {
      encoding: "UTF-8",
    },
  });

  writeFileSync(options.output, xml);
};

program
  .option("--debug", "enable debug logging")
  .option(
    "--output <file>",
    "output file path for the formatted test results",
    "./TEST-terraform.xml"
  )
  .argument("<testResultLogFilePath>", "terraform test json log output file")
  .action(async (testResultLogFilePath, options) => {
    await main(testResultLogFilePath, options);
  });

program.parse();
