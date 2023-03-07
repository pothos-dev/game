import { Observable, Observer } from "rxjs"
import type { ClientMessage, ServerMessage } from "../../shared/messages"

export * from "../../shared/messages"

export type SessionId = string

export type ClientConnection = {
  clientId: string
  serverEvents: Observer<ServerMessage>
  clientMessages: Observable<ClientMessage>
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
