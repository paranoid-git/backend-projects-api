import Logger from "@ptkdev/logger";
const logger = new Logger();

export const info = (...args: any[]) => {
  logger.info(...args);
};
export const error = (...args: any[]) => {
  logger.error(...args);
};
export const warn = (...args: any[]) => {
  logger.warn(...args);
};
export const debug = (...args: any[]) => {
  logger.debug(...args);
};
