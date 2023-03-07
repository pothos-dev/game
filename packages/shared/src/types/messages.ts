import { PlayerConfig } from "~/types/players"
import type { Card } from "./cards"

// Messages that the server sends to the client
export type ServerMessages = {
  // A new player joins the lobby
  "lobby/connected": { player: PlayerConfig }

  // A player leaves lobby
  "lobby/disconnected": { playerId: string }

  // A player sends a chat message to all players
  "lobby/chat": { player: PlayerConfig; message: string }

  // The game has started
  "game/start": { startPlayerId: string }

  // The player draws a card
  "game/player/draw": { card: Card }

  // The player discards a card
  "game/player/discard": { cardId: string }
}

// Messages that the client sends to the server
export type ClientMessages = {
  // The player joins a lobby
  "lobby/connect": { lobbyId: string; player: PlayerConfig }
}

/*
 * Helper methods below
 */

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
