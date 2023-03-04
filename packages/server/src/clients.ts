import { WebSocket } from "ws"
import { getSession } from "~/sessions"
import { ClientEvent, SessionId } from "~/types"

type ConnectedClient = {
  sessionId: SessionId
  playerName: string
}

const connectedClients = new Map<WebSocket, ConnectedClient>()

// This function is called when a new WebSocket connection is established
// We figure out which session the client is trying to connect to
// and store the connection in a Map.
export function handleWebsocketConnection(socket: WebSocket) {
  socket.once("message", (message) => {
    const event = JSON.parse(message.toString()) as ClientEvent

    if (event.type != "connect") {
      console.error("First message by a WebSocket connection must be the 'connect' event")
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
    console.log("Client connected", { sessionId, playerName })

    socket.once("close", () => {
      unlisten()
      const { sessionId, playerName } = connectedClients.get(socket)!
      connectedClients.delete(socket)
      console.log("Client disconnected", { sessionId, playerName })
      session.send({ type: "user disconnected", playerName })
    })
  })
}
