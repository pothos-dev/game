import type { Writable } from "svelte/store"
import type { ServerConnection } from "~/lib/srverConnection"
import type { Card } from "../../shared"
import type { Grid, Hex } from "honeycomb-grid"

export * from "../../shared"

export type LobbyState = {
  lobbyId: string
  playerName: string
}

export type GameState = {
  player: {
    name: string
    hand: Writable<Card[]>
  }

  map: {
    grid: Grid<Hex>
  }
}

export type ActiveGame = {
  gameState: GameState
  serverConnection: ServerConnection
}
