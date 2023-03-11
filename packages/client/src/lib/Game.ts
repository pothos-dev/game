import type { ServerMessage } from "@shared/types/messages"
import { getContext, setContext } from "svelte"
import { TileMap } from "~/lib/TileMap"
import { Hand } from "~/lib/Hand"
import type { Player } from "~/lib/Player"
import type { Socket } from "~/lib/Socket"

export class Game {
  socket: Socket
  player: Player
  players: Player[]
  hand: Hand
  map: TileMap

  connect(lobbyId: string) {
    this.socket.send("server/connect", {
      lobbyId,
      player: this.player,
    })

    this.socket.messages.subscribe((message) => {
      this.#handleMessage(message)
    })
  }

  getPlayer(id: string): Player {
    for (const player of this.players) {
      if (player.id == id) {
        return player
      }
    }
    throw new Error(`Player with id ${id} not found`)
  }

  constructor({ socket, player }: { socket: Socket; player: Player }) {
    this.player = player
    this.socket = socket
    this.players = [player]
    this.hand = new Hand()
    this.map = new TileMap()
  }

  #handleMessage({ type, payload }: ServerMessage) {
    if (type == "game/start") {
      this.players = payload.players
    }
    if (type == "game/player/draw") {
      this.hand.draw(payload.card)
    }
    if (type == "game/player/discard") {
      this.hand.discard(payload.cardId)
    }
    if (type == "game/map/flip") {
      this.map.getTile(payload.tileId).flip(payload.playerId)
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
