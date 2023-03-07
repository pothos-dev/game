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
      players.serverEvents.next({
        type: "draw card",
        card: {
          cardId: "1",
          name: "Card 1",
          color: "red",
        },
      })
    })
  })

  return game
}
