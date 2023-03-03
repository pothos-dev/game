import { initTRPC } from '@trpc/server'
import { applyWSSHandler } from '@trpc/server/adapters/ws'
import { observable } from '@trpc/server/observable'

import ws from 'ws'

// You can use any variable name you like.
// We use t to keep things simple.
const t = initTRPC.create()

const appRouter = t.router({
  greeting: t.procedure.query(() => 'hello tRPC v10!'),
  ping: t.procedure.subscription(() => {
    return observable((observer) => {
      const interval = setInterval(() => {
        observer.next('pong')
      }, 100)
      return () => {
        clearInterval(interval)
      }
    })
  }),
})

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter

const wss = new ws.Server({
  port: 3001,
})
const handler = applyWSSHandler({ wss, router: appRouter })
wss.on('connection', (ws) => {
  console.log(`➕➕ Connection (${wss.clients.size})`)
  ws.once('close', () => {
    console.log(`➖➖ Connection (${wss.clients.size})`)
  })
})
console.log('✅ WebSocket Server listening on ws://localhost:3001')
process.on('SIGTERM', () => {
  console.log('SIGTERM')
  handler.broadcastReconnectNotification()
  wss.close()
})
