import { Subscription } from "rxjs"
import { Scheduler } from "~/types"

export function createScheduler(): Scheduler {
  const timers = new Set<NodeJS.Timeout>()

  return {
    in(sec: number, fn: () => void): Subscription {
      const timer = setTimeout(() => {
        fn()
        timers.delete(timer)
      }, sec * 1000)
      timers.add(timer)
      return new Subscription(() => {
        clearTimeout(timer)
        timers.delete(timer)
      })
    },

    every(sec: number, fn: () => void): Subscription {
      const timer = setInterval(fn, sec * 1000)
      timers.add(timer)
      return new Subscription(() => {
        clearInterval(timer)
        timers.delete(timer)
      })
    },

    shutdown(): void {
      timers.forEach((timer) => clearTimeout(timer))
      timers.clear()
    },
  }
}
