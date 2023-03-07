import { PlayerConfig } from "@shared/types/players"

export type GameState = {
  players: PlayerConfig[]
  map: MapState
}

export type MapState = {
  tiles: TileState[]
}

export type TileState = {
  id: string
  color: string
}

export function createGameState(players: PlayerConfig[]): GameState {
  return {
    players,
    map: {
      tiles: [],
    },
  }
}
