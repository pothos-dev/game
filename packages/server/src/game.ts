import { faker } from "@faker-js/faker"
import { Card } from "@shared/types/cards"
import { createId } from "~/lib/ids"
import { createLogger } from "~/lib/logging"
import { createScheduler } from "~/lib/scheduler"
import { ActiveGame, GameLobby } from "~/types"

const log = createLogger("Game")

export function startGame(lobby: GameLobby): ActiveGame {
  const gameId = createId("game")
  const players = lobby.players
  const scheduler = createScheduler()

  log.info("Starting game", {
    lobbyId: lobby.lobbyId,
    players: players.map((p) => p.playerName),
  })

  scheduler.every(2, () => {
    players.forEach((players) => {
      const card: Card = {
        cardId: createId("card"),
        name: faker.science.chemicalElement().name,
        color: faker.color.rgb(),
      }

      players.send("game/draw", { card })
      scheduler.in(4.5, () => {
        players.send("game/discard", { cardId: card.cardId })
      })
    })
  })

  return {
    gameId,
    players,
    scheduler,
  }
}
