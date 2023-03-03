import { EventEmitter } from 'ws'
import { SessionEvent } from './events'

export type Session = {
  sessionId: string

  // Emit an event to all subscribers
  emit(event: SessionEvent): void

  // Subscribe to events
  subscribe(listener: (event: SessionEvent) => void): () => void
}

export const sessions = new Map<string, Session>()

export function getSession(sessionId: string): Session {
  let session = sessions.get(sessionId)
  if (session) return session

  const emitter = new EventEmitter()
  const emit = (event: SessionEvent) => emitter.emit('event', event)
  const subscribe = (listener: (event: SessionEvent) => void) => {
    emitter.on('event', listener)
    return () => emitter.off('event', listener)
  }
  session = { sessionId, emit, subscribe }
  sessions.set(sessionId, session)

  return session
}
