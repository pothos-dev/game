import type { ServerMessage } from "@shared/types/messages"
import { getContext, setContext } from "svelte"
import { GameMap } from "~/lib/GameMap"
import { Hand } from "~/lib/Hand"
import type { Player } from "~/lib/Player"
import type { Socket } from "~/lib/Socket"

export class Game {
  socket: Socket
  player: Player

  hand = new Hand()
  map = new GameMap()

  connect(lobbyId: string) {
    this.socket.send("connect", {
      lobbyId,
      player: this.player,
    })

    this.socket.messages.subscribe((message) => {
      this.#handleMessage(message)
    })
  }

  constructor({ socket, player }: { socket: Socket; player: Player }) {
    this.player = player
    this.socket = socket
  }

  #handleMessage(message: ServerMessage) {
    if (message.type === "game/player/draw") {
      this.hand.draw(message.payload.card)
    }
    if (message.type === "game/player/discard") {
      this.hand.discard(message.payload.cardId)
    }
  }
}

const gameCtx = Symbol()
export function getGame(): Game {
  return getContext(gameCtx)
}
export function provideGame(game: Game) {
  setContext(gameCtx, game)
}
