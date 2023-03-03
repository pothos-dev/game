import { observable } from '@trpc/server/observable'
import { procedure, router } from './trpc'

export type AppRouter = typeof appRouter

export const appRouter = router({
  // Returns the current time every second.
  ping: procedure.subscription(() => {
    return observable<string>((observer) => {
      const interval = setInterval(() => {
        observer.next(new Date().toISOString())
      }, 1000)

      return () => clearInterval(interval)
    })
  }),
})
