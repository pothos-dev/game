import type { Writable } from "svelte/store"
import type { Card, ServerEvent } from "~/types"

export type GameState = {
  hand: Writable<Card[]>
}

export const serverEventHandler: {
  [T in ServerEvent["type"]]: (gs: GameState, event: Extract<ServerEvent, { type: T }>) => void
} = {
  "draw card": (gs, event) => {
    gs.hand.update((hand) => [...hand, event.card])
  },
  "chat message": () => {},
  "user connected": () => {},
  "user disconnected": () => {},
}
