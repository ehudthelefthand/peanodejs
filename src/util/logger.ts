import winston from "winston";

const logger = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { service: "course-api" },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "log/combined.log" }),
  ],
});

export default logger;
