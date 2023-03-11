import type { ClientMessages, ServerMessage } from "@shared/types/messages"
import { Observable } from "rxjs"

export class Socket {
  messages: Observable<ServerMessage>

  send<T extends keyof ClientMessages>(type: T, payload: ClientMessages[T]): void {
    const data = JSON.stringify({ type, payload })
    this.#socket.send(data)
  }

  static connect(): Promise<Socket> {
    return new Promise((resolve, reject) => {
      const socket = new WebSocket("ws://localhost:8080")
      socket.onopen = () => {
        resolve(new Socket(socket))
      }
      socket.onerror = (ev) => {
        reject(new Error("An error occured during connection"))
      }
    })
  }

  #socket: WebSocket = new WebSocket("ws://localhost:8080")
  private constructor(socket: WebSocket) {
    this.#socket = socket
    this.messages = new Observable((observer) => {
      const onMessage = (ev: MessageEvent) => {
        const serverMessage = JSON.parse(ev.data as string) as ServerMessage
        observer.next(serverMessage)
      }
      const onClose = () => {
        observer.complete()
      }

      this.#socket.addEventListener("message", onMessage)
      this.#socket.addEventListener("close", onClose)
      return () => {
        this.#socket.removeEventListener("message", onMessage)
        this.#socket.removeEventListener("close", onClose)
      }
    })
  }
}
