import { Observable } from "rxjs"
import { WebSocket, MessageEvent, ErrorEvent } from "ws"
import { createId } from "~/lib/ids"
import { joinLobby } from "~/lobby"
import { createLogger } from "~/lib/logging"
import { ClientConnection, ClientMessage, ServerMessage } from "~/types"

const log = createLogger("ClientConnection")

// This function is called when a new WebSocket connection is established
// We figure out which session the client is trying to connect to
// and store the connection in a Map.
export function handleWebsocketConnection(socket: WebSocket) {
  // Convert the WebSocket into a ClientConnection
  const clientConnection: ClientConnection = {
    // Create a unique ID for this client
    clientId: createId("client"),

    // Wrap incoming messages in an Observable
    clientMessages: new Observable((observer) => {
      const onMessage = (ev: MessageEvent) => {
        const clientMessage = JSON.parse(ev.data as string) as ClientMessage
        observer.next(clientMessage)
      }
      const onClose = () => {
        observer.complete()
      }

      socket.addEventListener("message", onMessage)
      socket.addEventListener("close", onClose)
      return () => {
        socket.removeEventListener("message", onMessage)
        socket.removeEventListener("close", onClose)
      }
    }),

    // Wrap outgoing messages in an Observer
    serverEvents: {
      next(serverMessage: ServerMessage) {
        const data = JSON.stringify(serverMessage)
        socket.send(data)
      },
      error(error) {
        log.error("Error in serverEvents", { error })
      },
      complete() {
        socket.close()
      },
    },
  }

  log.info("Client connected", { clientId: clientConnection.clientId })

  // Wait for the client to join a lobby
  clientConnection.clientMessages.subscribe({
    next(message) {
      if (message.type == "join lobby") {
        joinLobby(clientConnection, message)
        // TODO prevent joining multiple lobbies!
      }
    },
    complete() {
      log.info("Client disconnected", { clientId: clientConnection.clientId })
    },
  })
}
