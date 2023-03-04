import * as ws from "ws"

// Websocket Server
const server = new ws.Server({ port: 3001 })

server.on("connection", (socket) => {
  console.log(`-- Client connected (${server.clients.size} clients)`)
  socket.once("close", () => {
    console.log(`-- Client disconnected (${server.clients.size} clients)`)
  })
})

console.log("-- Server started on ws://localhost:3001")

process.on("SIGTERM", () => {
  console.log("-- Server stopped")
  server.close()
})
