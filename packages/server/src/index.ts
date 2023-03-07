import { Server } from "ws"
import { handleWebsocketConnection } from "~/clients"
import { createLogger } from "~/logging"

const log = createLogger("Server")

// Websocket Server
const server = new Server({ port: 3001 })
process.on("SIGTERM", () => {
  log.info("Stopping")
  server.close()
})

server.on("connection", handleWebsocketConnection)

log.info("Running on ws://localhost:3001")
