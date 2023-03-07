import { WebSocket } from "ws"
import { createLogger } from "~/logging"
import { getSession } from "~/sessions"
import { ClientEvent, SessionId } from "~/types"

const log = createLogger("SocketManager")
const connectedClients = new Map<WebSocket, { sessionId: SessionId; playerName: string }>()

// This function is called when a new WebSocket connection is established
// We figure out which session the client is trying to connect to
// and store the connection in a Map.
export function handleWebsocketConnection(socket: WebSocket) {
  socket.once("message", (message) => {
    const event = JSON.parse(message.toString()) as ClientEvent

    if (event.type != "connect") {
      log.error("First message by a WebSocket connection must be the 'connect' event")
      socket.close()
      return
    }

    const { sessionId, playerName } = event
    connectedClients.set(socket, { sessionId, playerName })

    const session = getSession(sessionId)
    const unlisten = session.listen((event) => {
      socket.send(JSON.stringify(event))
    })

    session.send({ type: "user connected", playerName })
    log.info("Client connected", { sessionId, playerName })

    socket.once("close", () => {
      unlisten()
      const { sessionId, playerName } = connectedClients.get(socket)!
      connectedClients.delete(socket)
      log.info("Client disconnected", { sessionId, playerName })
      session.send({ type: "user disconnected", playerName })
    })
  })
}
