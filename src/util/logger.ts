import winston from "winston";

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.json(),
    winston.format.colorize({ all: true }),
    winston.format.timestamp(),
    winston.format.errors({ stack: true })
  ),
  defaultMeta: { service: "course-api" },
  transports: [
    new winston.transports.Console({
      silent: process.env.NODE_ENV === "test",
    }),
  ],
});

export default logger;
