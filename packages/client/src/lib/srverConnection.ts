import type { ClientMessages, ServerMessage } from "~/types"
import { Observable } from "rxjs"

// Wraps a websocket connection to allow for bidirectional communication
// with the server.
export type ServerConnection = {
  messages: Observable<ServerMessage>

  send<T extends keyof ClientMessages>(type: T, payload: ClientMessages[T]): void
}

// Connects to the server and returns a Socket object.
export async function connectToServer(): Promise<ServerConnection> {
  const socket = new WebSocket("ws://localhost:3001")

  const serverConnection: ServerConnection = {
    messages: new Observable((observer) => {
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

    send(type, payload) {
      const data = JSON.stringify({ type, payload })
      socket.send(data)
    },
  }

  // Wait for the socket to completely open before returning
  return new Promise((resolve) => {
    socket.addEventListener("open", () => resolve(serverConnection), { once: true })
  })
}
