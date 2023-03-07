import * as chalk from "chalk"
import { prettyJson } from "@shared/lib/utils"

export type LogLevel = "debug" | "info" | "warn" | "error"
export class Logger {
  name: string

  constructor(name: string) {
    this.name = name
  }

  debug(message: string, jsonPayload?: object) {
    this.#log("debug", message, jsonPayload)
  }
  info(message: string, jsonPayload?: object) {
    this.#log("info", message, jsonPayload)
  }
  warn(message: string, jsonPayload?: object) {
    this.#log("warn", message, jsonPayload)
  }
  error(message: string, jsonPayload?: object) {
    this.#log("error", message, jsonPayload)
  }

  #log(level: LogLevel, message: string, jsonPayload?: object) {
    this.#logToConsole(level, message, jsonPayload)
  }

  #logToConsole(level: LogLevel, message: string, jsonPayload?: object) {
    const now = new Date().toISOString()
    console[level](
      chalk.gray(`${now}`),
      chalk.blue(`[${this.name}]`),
      message,
      jsonPayload ? chalk.gray(prettyJson(jsonPayload)) : ""
    )
  }
}
