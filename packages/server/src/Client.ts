import { WebSocket, MessageEvent } from "ws"
import { ClientMessage, ServerMessages } from "@shared/types/messages"
import { createId } from "@shared/lib/utils"
import { Observable } from "rxjs"

export class Client {
  id: string
  messages: Observable<ClientMessage>

  send<T extends keyof ServerMessages>(type: T, payload: ServerMessages[T]): void {
    const data = JSON.stringify({ type, payload })
    this.#socket.send(data)
  }

  #socket: WebSocket
  constructor(socket: WebSocket) {
    this.#socket = socket
    this.id = createId("socket")
    this.messages = new Observable((observer) => {
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
    })
  }
}
