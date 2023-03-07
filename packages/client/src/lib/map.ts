import type { GameState } from "~/types"
import { defineHex, Grid, Orientation, spiral } from "honeycomb-grid"

export function createMap(): GameState["map"] {
  const Tile = defineHex({ dimensions: 100, orientation: Orientation.FLAT })

  return {
    grid: new Grid(Tile, spiral({ radius: 4 })),
  }
}
