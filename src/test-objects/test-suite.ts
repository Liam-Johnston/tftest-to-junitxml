import { TestCase } from "./test-case";
import { calculateDuration } from "../utils";
import { logger } from "../logger";

export class TestSuite {
  private readonly name: string;
  private endTime?: Date;
  private testCases: Map<string, TestCase>;

  constructor(name: string, private readonly startTime: Date) {
    this.name = name.replace("/", "_");

    this.testCases = new Map();
  }

  addTestCase(testCase: TestCase) {
    this.testCases.set(testCase.name, testCase);
  }

  getTestCase(testCaseName: string) {
    return this.testCases.get(testCaseName);
  }

  complete(endTime: Date) {
    logger.debug({
      msg: "completing test suite",
      endTime,
      name: this.name,
      numberOfTestCases: this.testCases.size,
    });

    this.endTime = endTime;
  }

  render() {
    return {
      "@": {
        time: calculateDuration(this.startTime, this.endTime),
        name: this.name,
      },
      testcase: Array.from(this.testCases.values()).map((testCase) =>
        testCase.render(this.name)
      ),
    };
  }
}
