import { applyWSSHandler } from '@trpc/server/adapters/ws'

import { appRouter } from './router'
import ws from 'ws'
import { createContext } from './context'

// Websocket Server
const wss = new ws.Server({ port: 3001 })

// TRPC Handler bound to the websocket server
const handler = applyWSSHandler({ wss: wss, router: appRouter, createContext })

// Log when a client connects or disconnects
wss.on('connection', (ws) => {
  console.log(`-- Client connected (${wss.clients.size} clients)`)
  ws.once('close', () => {
    console.log(`-- Client disconnected (${wss.clients.size} clients)`)
  })
})

// Log when the server is shutting down
process.on('SIGTERM', () => {
  console.log('-- Server stopped')
  handler.broadcastReconnectNotification()
  wss.close()
})

//Log when the server has started
console.log('-- Server started on ws://localhost:3001')
