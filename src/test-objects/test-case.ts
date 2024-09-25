import { calculateDuration } from "../utils";
import { logger } from "../logger";

interface FailureDetails {
  message: string;
  type: string;
  callStack: string;
}

export class TestCase {
  private endTime?: Date;
  private failureDetails?: FailureDetails;

  constructor(public readonly name: string, private readonly startTime: Date) {}

  complete(endTime: Date) {
    logger.debug({
      msg: "completing test case",
      name: this.name,
    });

    this.endTime = endTime;
  }

  addFailureDetails(failureDetails: FailureDetails) {
    logger.debug({
      msg: "adding failure details to test case",
      name: this.name,
      failureDetails,
    });

    this.failureDetails = failureDetails;
  }

  render(className: string) {
    const time = calculateDuration(this.startTime, this.endTime);

    if (time === undefined) {
      throw new Error("Tried To Render Unfinished Test Case");
    }

    const baseRender = {
      "@": {
        classname: className,
        time: calculateDuration(this.startTime, this.endTime),
        name: this.name,
      },
    };

    if (this.failureDetails === undefined) {
      return baseRender;
    }

    return {
      ...baseRender,
      failure: this.failureDetails,
    };
  }
}
