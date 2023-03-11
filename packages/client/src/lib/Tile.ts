import { defineHex, Orientation } from "honeycomb-grid"
import { writable } from "svelte/store"

export class Tile extends defineHex({ dimensions: 100, orientation: Orientation.FLAT }) {
  controllingPlayerId = writable<string | undefined>(undefined)

  get id() {
    return `tile[${this.q},${this.r},${this.s}]`
  }

  flip(playerId: string) {
    this.controllingPlayerId.set(playerId)
  }
}
