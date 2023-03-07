import { faker } from "@faker-js/faker"
import { Card } from "@shared/types/cards"
import { ServerMessage, ServerMessages } from "@shared/types/messages"
import { createGameState, GameState } from "~/gameState"
import { createId } from "~/lib/ids"
import { createLogger } from "~/lib/logging"
import { PlayerConnection, GameLobby } from "~/lobby"
import { createScheduler, Scheduler } from "~/scheduler"

const log = createLogger("Game")

export type ActiveGame = {
  id: string
  playerConnections: PlayerConnection[]
  state: GameState
  scheduler: Scheduler

  sendToPlayer<T extends keyof ServerMessages>(
    playerId: string,
    type: T,
    payload: ServerMessages[T]
  ): void
}

export function startGame(lobby: GameLobby): ActiveGame {
  const { playerConnections } = lobby

  const id = createId("game")
  const players = playerConnections.map((player) => player.player)
  const scheduler = createScheduler()
  const state = createGameState(players)

  const game: ActiveGame = {
    id,
    playerConnections,
    scheduler,
    state,
    sendToPlayer(playerId, type, payload) {
      const playerConnection = playerConnections.find(({ id }) => id == playerId)
      playerConnection?.send(type, payload)
    },
  }

  log.info("Starting game", { gameId: id, lobbyId: lobby.id })
  gameLoop(game)
  return game
}

function gameLoop(game: ActiveGame) {
  const { state, scheduler, sendToPlayer } = game

  scheduler.every(2, () => {
    state.players.forEach((player) => {
      const card: Card = {
        cardId: createId("card"),
        name: faker.science.chemicalElement().name,
        color: faker.color.rgb(),
      }

      sendToPlayer(player.id, "game/player/draw", { card })
      scheduler.in(4.5, () => {
        sendToPlayer(player.id, "game/player/discard", { cardId: card.cardId })
      })
    })
  })
}
