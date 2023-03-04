import type { ClientEvent, ServerEvent } from "~/types"

type ConnectArgs = {
  sessionId: string
  playerName: string
}

export type Socket = {
  listen: (listener: (event: ServerEvent) => void) => () => void
  send: (event: ClientEvent) => void
}

export function connectSocket({ playerName, sessionId }: ConnectArgs): Socket {
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

  socket.onopen = () => {
    send({ type: "connect", playerName, sessionId })
  }

  return { listen, send }
}
