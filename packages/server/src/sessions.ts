import { EventEmitter } from "ws"
import { ServerEvent } from "~/types"

export type Session = {
  sessionId: string

  // Emit an event to all subscribers
  emit(event: ServerEvent): void

  // Subscribe to events
  subscribe(listener: (event: ServerEvent) => void): () => void
}

export const sessions = new Map<string, Session>()

export function getSession(sessionId: string): Session {
  let session = sessions.get(sessionId)
  if (session) return session

  const emitter = new EventEmitter()
  const emit = (event: ServerEvent) => emitter.emit("event", event)
  const subscribe = (listener: (event: ServerEvent) => void) => {
    emitter.on("event", listener)
    return () => emitter.off("event", listener)
  }
  session = { sessionId, emit, subscribe }
  sessions.set(sessionId, session)

  return session
}
