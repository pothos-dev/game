import type { Card } from "./cards"

// Messages that the server sends to the client
export type ServerMessage =
  | { type: "user connected"; playerName: string }
  | { type: "user disconnected"; playerName: string }
  | { type: "chat message"; message: string; playerName: string }
  | { type: "draw card"; card: Card }

// Messages that the client sends to the server
export type ClientMessage =
  // This should be the first message sent by the client
  { type: "join lobby"; lobbyId: string; playerName: string }

export type ServerMessageOf<T extends ServerMessage["type"]> = Extract<ServerMessage, { type: T }>
export type ClientMessageOf<T extends ClientMessage["type"]> = Extract<ClientMessage, { type: T }>
