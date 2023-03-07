import { getContext, setContext } from "svelte"
import { writable } from "svelte/store"
import { createMap } from "~/lib/map"
import { connectToServer } from "~/lib/srverConnection"
import type { ActiveGame, GameState, LobbyState, ServerMessage, ServerMessages } from "~/types"

const serverEventHandler: {
  [T in keyof ServerMessages]: (gs: GameState, payload: ServerMessages[T]) => void
} = {
  "lobby/connected": () => {},
  "lobby/disconnected": () => {},
  "lobby/chat": () => {},

  "game/draw": (gs, { card }) => {
    gs.player.hand.update((hand) => [...hand, card])
  },
  "game/discard": (gs, { cardId }) => {
    gs.player.hand.update((hand) => hand.filter((card) => card.cardId !== cardId))
  },
}

const gameKey = Symbol()

export function getGame(): ActiveGame {
  return getContext(gameKey)
}

export function getGameState(): GameState {
  return getGame().gameState
}

export function setGameContext(game: ActiveGame) {
  setContext(gameKey, game)
}

export async function startGame(lobby: LobbyState): Promise<ActiveGame> {
  // Connect to the server
  const serverConnection = await connectToServer()

  // Initialize connection
  serverConnection.send("lobby/join", {
    lobbyId: lobby.lobbyId,
    playerName: lobby.playerName,
  })

  // Create empty game state
  const gameState = createGameState(lobby)

  // Process incoming events and update the game state
  serverConnection.messages.subscribe((serverMessage) => {
    serverEventHandler[serverMessage.type](gameState, serverMessage.payload as any)
  })

  return { gameState, serverConnection }
}

function createGameState(lobby: LobbyState): GameState {
  return {
    player: {
      name: lobby.playerName,
      hand: writable([]),
    },
    map: createMap(),
  }
}
