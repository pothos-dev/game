import type { ClientMessage, ServerMessage } from "~/types"
import { Observable, type Observer } from "rxjs"

// Wraps a websocket connection to allow for bidirectional communication
// with the server.
export type ServerConnection = {
  serverMessages: Observable<ServerMessage>
  clientMessages: Observer<ClientMessage>
}

// Connects to the server and returns a Socket object.
export async function connectToServer(): Promise<ServerConnection> {
  const socket = new WebSocket("ws://localhost:3001")

  const serverConnection: ServerConnection = {
    serverMessages: new Observable((observer) => {
      const onMessage = (ev: MessageEvent) => {
        const serverMessage = JSON.parse(ev.data as string) as ServerMessage
        observer.next(serverMessage)
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

    clientMessages: {
      next(clientMessage: ClientMessage) {
        const data = JSON.stringify(clientMessage)
        socket.send(data)
      },
      error(error) {
        console.error("Error in clientMessages", { error })
      },
      complete() {
        socket.close()
      },
    },
  }

  // Wait for the socket to completely open before returning
  return new Promise((resolve) => {
    socket.addEventListener("open", () => resolve(serverConnection), { once: true })
  })
}
