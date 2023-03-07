import { writable } from "svelte/store"
import { connectToServer } from "~/lib/connection"
import type { ActiveGame, GameState, LobbyState, ServerMessage } from "~/types"

const serverEventHandler: {
  [T in ServerMessage["type"]]: (gs: GameState, event: Extract<ServerMessage, { type: T }>) => void
} = {
  "draw card": (gs, event) => {
    gs.hand.update((hand) => [...hand, event.card])
  },
  "chat message": () => {},
  "user connected": () => {},
  "user disconnected": () => {},
}

export async function startGame(lobby: LobbyState): Promise<ActiveGame> {
  // Connect to the server
  const serverConnection = await connectToServer()

  // Initialize connection
  serverConnection.clientMessages.next({
    type: "join lobby",
    playerName: lobby.playerName,
    lobbyId: lobby.lobbyId,
  })

  // Create empty game state
  const gameState: GameState = {
    player: { name: lobby.playerName },
    hand: writable([]),
  }

  // Process incoming events and update the game state
  const subsription = serverConnection.serverMessages.subscribe((serverMessage) => {
    serverEventHandler[serverMessage.type](gameState, serverMessage as any)
  })

  // TODO unsubscribe
  return { gameState, serverConnection }
}
