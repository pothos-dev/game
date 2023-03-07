import type { Card } from "./cards"

// Messages that the server sends to the client
export type ServerMessages = {
  "lobby/connected": { playerName: string }
  "lobby/disconnected": { playerName: string }
  "lobby/chat": { message: string; playerName: string }
  "game/draw": { card: Card }
  "game/discard": { cardId: string }
}

// Messages that the client sends to the server
export type ClientMessages = {
  "lobby/join": { lobbyId: string; playerName: string }
}

export type ServerMessage = {
  [T in keyof ServerMessages]: { type: T; payload: ServerMessages[T] }
}[keyof ServerMessages]

export type ClientMessage = {
  [T in keyof ClientMessages]: { type: T; payload: ClientMessages[T] }
}[keyof ClientMessages]

export type TypedServerMessage<T extends ServerMessage["type"]> = Extract<
  ServerMessage,
  { type: T }
>
export type TypedClientMessage<T extends ClientMessage["type"]> = Extract<
  ClientMessage,
  { type: T }
>
