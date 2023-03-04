import { Server } from "ws"
import { handleWebsocketConnection } from "~/clients"

// Websocket Server
const server = new Server({ port: 3001 })
process.on("SIGTERM", () => {
  console.log("-- Server stopped")
  server.close()
})

server.on("connection", handleWebsocketConnection)

console.log("-- Server started on ws://localhost:3001")
