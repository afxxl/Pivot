import { injectable } from "inversify";
import { ILogger } from "../../core/services/ILogger";
import winston from "winston";

@injectable()
export class WinstonService implements ILogger {
  logger = winston.createLogger({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
    transports: [new winston.transports.Console()],
  });

  debug(message: string, meta?: unknown): void {
    this.logger.debug(message, meta);
  }

  info(message: string, meta?: unknown): void {
    this.logger.info(message, meta);
  }

  warn(message: string, meta?: unknown): void {
    this.logger.warn(message, meta);
  }

  error(message: string, meta?: unknown): void {
    this.logger.error(message, meta);
  }
}
