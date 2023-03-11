import { Grid, spiral } from "honeycomb-grid"
import { Tile } from "~/Tile"

export class TileMap {
  grid = new Grid(Tile, spiral({ radius: 4 }))

  tileById(id: string): Tile {
    for (const tile of this.grid) {
      if (tile.id == id) {
        return tile
      }
    }
    throw new Error(`Tile not found: ${id}`)
  }
}
