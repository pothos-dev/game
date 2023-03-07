import { getContext, setContext } from "svelte"
import { GameMap } from "~/lib/GameMap"
import type { Player } from "~/lib/Player"
import type { Socket } from "~/lib/Socket"

export class Game {
  socket: Socket
  player: Player

  hand = []
  map = new GameMap()

  connect(lobbyId: string) {
    this.socket.send("connect", {
      lobbyId,
      player: this.player,
    })
  }

  constructor({ socket, player }: { socket: Socket; player: Player }) {
    this.player = player
    this.socket = socket
  }
}

const gameCtx = Symbol()
export function getGame(): Game {
  return getContext(gameCtx)
}
export function provideGame(game: Game) {
  setContext(gameCtx, game)
}
