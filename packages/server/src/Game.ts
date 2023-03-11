import { faker } from "@faker-js/faker"
import { createId } from "@shared/lib/utils"
import { ClientMessage, ServerMessages } from "@shared/types/messages"
import { Card } from "~/Card"
import { Logger } from "~/lib/Logger"
import { Player } from "~/Player"
import { TileMap } from "~/TileMap"

export class Game {
  id: string
  players: Player[]
  map: TileMap

  #log = new Logger("Game")
  constructor(players: Player[]) {
    this.id = createId("game")
    this.players = players
    this.map = new TileMap()

    this.players.forEach((player) => {
      player.socket.messages.subscribe((message) => this.#handleMessage(message, player))
    })
  }

  start() {
    this.#log.info("Starting game", { gameId: this.id })
    this.#sendToAll("game/start", {
      players: this.players.map((player) => ({
        id: player.id,
        name: player.name,
        color: player.color,
      })),
    })

    // All 10 seconds, replace the cards in each players hand
    this.#every(10, () => {
      this.players.forEach((player) => {
        const cards = [Card.random(), Card.random(), Card.random(), Card.random()]
        cards.forEach((card) => player.send("game/player/draw", { card }))
        this.#in(10, () => {
          cards.forEach((card) => player.send("game/player/discard", { cardId: card.id }))
        })
      })
    })
  }

  #handleMessage({ type, payload }: ClientMessage, activePlayer: Player) {
    if (type == "game/map/flip") {
      this.#sendToAll("game/map/flip", {
        playerId: activePlayer.id,
        tileId: payload.tileId,
      })
    }
  }

  #in(seconds: number, fn: () => void) {
    setTimeout(fn, seconds * 1000)
  }

  #every(seconds: number, fn: () => void) {
    setInterval(fn, seconds * 1000)
  }

  #sendToAll<T extends keyof ServerMessages>(type: T, payload: ServerMessages[T]): void {
    this.players.forEach((player) => player.send(type, payload))
  }
}
