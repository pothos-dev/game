export type SessionEvent =
  | { type: 'user connected' }
  | { type: 'user disconnected' }
  | { type: 'chat message'; message: string }
