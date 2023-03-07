import type { Writable } from "svelte/store"
import type { ServerConnection } from "~/lib/connection"
import type { Card, ClientMessage, ServerMessage } from "../../shared"

export * from "../../shared"

export type LobbyState = {
  lobbyId: string
  playerName: string
}

export type GameState = {
  player: {
    name: string
  }
  hand: Writable<Card[]>
}

export type ActiveGame = {
  gameState: GameState
  serverConnection: ServerConnection
}
