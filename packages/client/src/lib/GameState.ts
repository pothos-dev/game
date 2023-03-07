import { writable } from "svelte/store"
import { connectToServer } from "~/lib/srverConnection"
import type { ActiveGame, GameState, LobbyState, ServerMessage, ServerMessages } from "~/types"

const serverEventHandler: {
  [T in keyof ServerMessages]: (gs: GameState, payload: ServerMessages[T]) => void
} = {
  "lobby/connected": () => {},
  "lobby/disconnected": () => {},
  "lobby/chat": () => {},
  "game/draw": (gs, { card }) => {
    gs.hand.update((hand) => [...hand, card])
  },
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
  const gameState: GameState = {
    player: { name: lobby.playerName },
    hand: writable([]),
  }

  // Process incoming events and update the game state
  const subscription = serverConnection.messages.subscribe((serverMessage) => {
    serverEventHandler[serverMessage.type](gameState, serverMessage.payload as any)
  })

  // TODO unsubscribe
  return { gameState, serverConnection }
}
