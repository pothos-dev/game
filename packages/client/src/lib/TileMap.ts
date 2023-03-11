import { Grid, spiral } from "honeycomb-grid"
import { Tile } from "~/lib/Tile"

export class TileMap {
  grid = new Grid(Tile, spiral({ radius: 4 }))
}
