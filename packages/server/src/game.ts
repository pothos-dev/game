import { faker } from "@faker-js/faker"
import { createId } from "~/lib/ids"
import { createLogger } from "~/lib/logging"
import { createScheduler } from "~/lib/scheduler"
import { ActiveGame, GameLobby } from "~/types"

const log = createLogger("Game")

export function startGame(lobby: GameLobby): ActiveGame {
  log.info("Starting game", {
    lobbyId: lobby.lobbyId,
    players: lobby.players.map((p) => p.playerName),
  })

  const game = {
    gameId: lobby.lobbyId,
    players: lobby.players,
    scheduler: createScheduler(),
  }

  game.scheduler.every(2, () => {
    game.players.forEach((players) => {
      players.send("game/draw", {
        card: {
          cardId: createId("card"),
          name: faker.science.chemicalElement().name,
          color: faker.color.rgb(),
        },
      })
    })
  })

  return game
}
