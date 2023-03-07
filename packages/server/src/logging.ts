import * as chalk from "chalk"

export type LogLevel = "debug" | "info" | "warn" | "error"
export type Logger = {
  [level in LogLevel]: (message: string, jsonPayload?: object) => void
}

export function createLogger(name: string): Logger {
  return {
    debug: (message, ...args) => _log("debug", name, message, ...args),
    info: (message, ...args) => _log("info", name, message, ...args),
    warn: (message, ...args) => _log("warn", name, message, ...args),
    error: (message, ...args) => _log("error", name, message, ...args),
  }
}

function _log(level: LogLevel, name: string, message: string, jsonPayload?: object) {
  const now = new Date().toISOString()

  console[level](
    chalk.gray(`${now}`),
    chalk.blue(`[${name}]`),
    message,
    jsonPayload ? chalk.gray(JSON.stringify(jsonPayload)) : ""
  )
}
