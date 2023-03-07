import { faker } from "@faker-js/faker"
import { createId } from "@shared/lib/utils"
import { Card } from "~/Card"
import { Logger } from "~/lib/Logger"
import { Player } from "~/Player"

export class Game {
  id: string
  players: Player[]

  #log = new Logger("Game")
  constructor(players: Player[]) {
    this.id = createId("game")
    this.players = players

    this.#start()
  }

  #start() {
    this.#log.info("Starting game", { gameId: this.id })

    this.#every(2, this.#drawAndDiscard)
  }

  #drawAndDiscard() {
    this.players.forEach((player) => {
      // Create a random card
      const card = Card.random()
      player.send("game/player/draw", { card })

      const discardAfter = faker.datatype.number({ min: 1, max: 5 })
      this.#in(discardAfter, () => {
        player.send("game/player/discard", { cardId: card.id })
      })
    })
  }

  #in(seconds: number, fn: () => void) {
    setTimeout(fn, seconds * 1000)
  }

  #every(seconds: number, fn: () => void) {
    setInterval(fn, seconds * 1000)
  }
}
