import { Observable } from "rxjs"
import type { ClientMessage, ServerMessages } from "../../shared/messages"

export * from "../../shared/messages"

export type SessionId = string

export type ClientConnection = {
  clientId: string
  messages: Observable<ClientMessage>
  send<T extends keyof ServerMessages>(type: T, payload: ServerMessages[T]): void
}

export type PlayerConnection = ClientConnection & {
  playerName: string
}

export type GameLobby = {
  lobbyId: string
  players: PlayerConnection[]
}

export type ActiveGame = {
  gameId: string
  players: PlayerConnection[]
  scheduler: Scheduler
}

export type Scheduler = {
  in(sec: number, fn: () => void): void
  every(sec: number, fn: () => void): void
  shutdown(): void
}
