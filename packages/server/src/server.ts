import { Server } from "ws"
import { handleWebsocketConnection } from "~/clientConnection"
import { createLogger } from "~/lib/logging"

const log = createLogger("Server")

export function startServer(port = 8080) {
  const server = new Server({ port })

  // Handle incoming socket connections
  server.on("connection", handleWebsocketConnection)

  // Shutdown gracefully
  process.on("SIGTERM", () => {
    log.info("Stopping")
    server.close()
  })

  server.once("listening", () => {
    log.info(`Listening on ws://localhost:${port}`)
  })
}
