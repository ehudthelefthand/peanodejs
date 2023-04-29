import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "app-service" },
  transports: [
    new winston.transports.File({ filename: "log/error.log", level: "error" }),
    new winston.transports.File({ filename: "log/combined.log" }),
    new winston.transports.Console(),
  ],
});

export default logger;
