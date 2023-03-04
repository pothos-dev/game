import { EventEmitter } from "ws"
import { ServerEvent, SessionId } from "~/types"

export type Session = {
  sessionId: SessionId

  // Emit an event to all subscribers
  send(event: ServerEvent): void

  // Subscribe to events
  listen(listener: (event: ServerEvent) => void): () => void
}

const sessions = new Map<SessionId, Session>()

export function getSession(sessionId: SessionId): Session {
  if (!sessions.has(sessionId)) {
    const emitter = new EventEmitter()

    const send = (event: ServerEvent) => emitter.emit("event", event)
    const listen = (listener: (event: ServerEvent) => void) => {
      emitter.on("event", listener)
      return () => emitter.off("event", listener)
    }

    sessions.set(sessionId, { sessionId, send, listen })
  }

  return sessions.get(sessionId)!
}
