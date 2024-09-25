import { TestCase, TestRunResult, TestSuiteResult } from "./interfaces";

import { parse } from "js2xmlparser";

const calculateDuration = (startTime?: Date, endTime?: Date) => {
  if (endTime === undefined || startTime === undefined) {
    return 0;
  }

  return (endTime.getTime() - startTime.getTime()) / 1000;
};

const parseTestCase = (
  name: string,
  className: string,
  { startTime, endTime, pass, details }: TestCase
) => {
  const structuredTest: Record<string, any> = {
    "@": {
      name,
      classname: className,
      time: calculateDuration(startTime, endTime),
    },
  };

  if (pass === true) {
    return structuredTest;
  }

  return {
    ...structuredTest,
    failure: {
      ...details,
    },
  };
};

const parseTestSuite = (
  name: string,
  { startTime, endTime, testCases }: TestSuiteResult
) => ({
  "@": {
    name,
    time: calculateDuration(startTime, endTime),
  },
  testcase: Object.entries(testCases).map(([testName, test]) =>
    parseTestCase(testName, name, test)
  ),
});

export const generateXML = ({
  startTime,
  endTime,
  testSuites,
}: TestRunResult) => {
  const structuredJson = {
    "@": {
      time: calculateDuration(startTime, endTime),
    },
    testsuite: Object.entries(testSuites).map(([className, testSuite]) =>
      parseTestSuite(className, testSuite)
    ),
  };

  return parse("testsuites", structuredJson, {
    declaration: {
      encoding: "UTF-8",
    },
  });
};
