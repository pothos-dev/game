import { writable, type Writable } from "svelte/store"
import { connectSocket, type Socket } from "~/lib/socket"
import type { Card, ServerEvent } from "~/types"

export type LobbyState = {
  sessionId: string
  playerName: string
}

export type GameState = {
  player: {
    name: string
  }
  hand: Writable<Card[]>
}

export type ActiveGame = {
  gameState: GameState
  socket: Socket
}

const serverEventHandler: {
  [T in ServerEvent["type"]]: (gs: GameState, event: Extract<ServerEvent, { type: T }>) => void
} = {
  "draw card": (gs, event) => {
    gs.hand.update((hand) => [...hand, event.card])
  },
  "chat message": () => {},
  "user connected": () => {},
  "user disconnected": () => {},
}

export async function initGame({ playerName, sessionId }: LobbyState): Promise<ActiveGame> {
  // Connect to the server
  const socket = await connectSocket()

  // Initialize connection
  socket.send({ type: "connect", playerName, sessionId })

  // Create empty game state
  const gameState: GameState = {
    player: { name: playerName },
    hand: writable([]),
  }

  // Process incoming events and update the game state
  const unsubscribe = socket.listen((event) => {
    serverEventHandler[event.type](gameState, event as any)
  })

  // TODO unsubscribe
  return { gameState, socket }
}
