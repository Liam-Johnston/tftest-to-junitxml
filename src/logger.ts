import pino from "pino";

export const logger = pino({
  level: "info",
  transport: { target: "pino-pretty" },
});

export const enableDebugLogging = () => (logger.level = "debug");
