import { defineHex, Orientation } from "honeycomb-grid"

export class Tile extends defineHex({ dimensions: 100, orientation: Orientation.FLAT }) {
  controllingPlayerId?: string

  get id() {
    return `tile[${this.q},${this.r},${this.s}]`
  }
}
