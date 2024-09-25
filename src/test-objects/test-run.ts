import { TestSuite } from "./test-suite";
import { calculateDuration } from "../utils";
import { logger } from "../logger";

export class TestRun {
  private startTime?: Date;
  private endTime?: Date;

  private testSuites: Map<string, TestSuite>;

  constructor() {
    this.testSuites = new Map();
  }

  start(startTime: Date) {
    logger.debug({
      msg: "starting test run",
      startTime,
    });
    this.startTime = startTime;
  }

  end(endTime: Date) {
    logger.debug({
      msg: "ending test run",
      endTime,
    });

    this.endTime = endTime;
  }

  addTestSuite(path: string, testSuite: TestSuite) {
    logger.debug({
      msg: "adding test suite",
      testSuiteName: path,
    });

    this.testSuites.set(path, testSuite);
  }

  getTestSuite(path: string) {
    return this.testSuites.get(path);
  }

  render() {
    const time = calculateDuration(this.startTime, this.endTime);

    if (time === undefined) {
      throw new Error("Tried To Render Unfinished Test Run");
    }

    return {
      "@": {
        time,
      },
      testsuite: Array.from(this.testSuites.values()).map((testSuite) =>
        testSuite.render()
      ),
    };
  }
}
