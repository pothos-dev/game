import type { ClientEvent, ServerEvent } from "~/types"

// Wraps a websocket connection to allow for bidirectional communication
// with the server.
export type Socket = {
  listen: (listener: (event: ServerEvent) => void) => () => void
  send: (event: ClientEvent) => void
}

// Connects to the server and returns a Socket object.
export async function connectSocket(): Promise<Socket> {
  const socket = new WebSocket("ws://localhost:3001")

  const send = (event: ClientEvent) => {
    const message = JSON.stringify(event)
    socket.send(message)
  }

  const listen = (eventListener: (event: ServerEvent) => void) => {
    const messageListener = (e: MessageEvent) => {
      const event = JSON.parse(e.data) as ServerEvent
      eventListener(event)
    }
    socket.addEventListener("message", messageListener)
    return () => socket.removeEventListener("message", messageListener)
  }

  // Wait for the socket to completely open before returning
  return new Promise<Socket>((resolve) => {
    socket.addEventListener("open", () => {
      resolve({ listen, send })
    })
  })
}
