import { defineHex, Grid, Orientation, spiral } from "honeycomb-grid"

const Tile = defineHex({ dimensions: 100, orientation: Orientation.FLAT })

export class GameMap {
  grid = new Grid(Tile, spiral({ radius: 4 }))
}
