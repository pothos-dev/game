import { observable } from '@trpc/server/observable'
import { procedure, router } from './trpc'
import { SessionEvent } from './events'

export type AppRouter = typeof appRouter

export const appRouter = router({
  gameEvents: procedure.subscription(({ ctx }) => {
    return observable<SessionEvent>((observer) => {
      const unsubscribe = ctx.subscribe(observer.next)
      ctx.emit({ type: 'user connected' })

      return () => {
        unsubscribe()
        ctx.emit({ type: 'user disconnected' })
      }
    })
  }),
})
