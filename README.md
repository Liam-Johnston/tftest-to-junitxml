# Terraform Test to JUnit XML

A handy command line tool to translate terraform test json logs into compatible JUnit XML

This tool is particularly handy when wanting to report on test results in Azure DevOps pipelines using the `PublishTestResults@2` task.

Currently this functionality exists only in the experimental terraform CLI tool and at time of writing seemingly has been abandoned.

## Quick Start

1. Generate the terraform test log

```bash
  terraform test -json | tee test-output.log
```

2. Parse the log file

```bash
npx tftest-to-junitxml ./test-output.log
```

Note: By default the output file name is `TEST-terraform.xml`, this will be picked up by default when using the `PublishTestResults@2` tas in Azure DevOps pipelines. It can be modified by using the `--output [OutputFileLocation]` flag

## TODO
 - [ ] Automate npm publishing
 - [ ] Include test suite
