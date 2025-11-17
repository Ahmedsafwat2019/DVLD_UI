// Simple logger that works in Next.js without worker threads
const isProduction = process.env.NODE_ENV === "production";

const logger = {
  info: (message: string | object, ...args: any[]) => {
    if (typeof message === "object") {
      console.info(args[0] || "INFO", message);
    } else {
      console.info(`[INFO] ${message}`, ...args);
    }
  },
  warn: (message: string | object, ...args: any[]) => {
    if (typeof message === "object") {
      console.warn(args[0] || "WARN", message);
    } else {
      console.warn(`[WARN] ${message}`, ...args);
    }
  },
  error: (message: string | object, ...args: any[]) => {
    if (typeof message === "object") {
      console.error(args[0] || "ERROR", message);
    } else {
      console.error(`[ERROR] ${message}`, ...args);
    }
  },
  debug: (message: string | object, ...args: any[]) => {
    if (!isProduction) {
      if (typeof message === "object") {
        console.debug(args[0] || "DEBUG", message);
      } else {
        console.debug(`[DEBUG] ${message}`, ...args);
      }
    }
  },
};

export default logger;
