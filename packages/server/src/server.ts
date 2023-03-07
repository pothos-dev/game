import { Server } from "ws"
import { handleWebsocketConnection } from "~/clientConnection"
import { createLogger } from "~/lib/logging"

const log = createLogger("Server")

export function startServer() {
  const server = new Server({ port: 3001 })

  // Handle incoming socket connections
  server.on("connection", handleWebsocketConnection)

  // Shutdown gracefully
  process.on("SIGTERM", () => {
    log.info("Stopping")
    server.close()
  })

  log.info("Running on ws://localhost:3001")
}
