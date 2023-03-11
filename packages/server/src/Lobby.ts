import { Client } from "~/Client"
import { Game } from "~/Game"
import { Logger } from "~/lib/Logger"
import { Player } from "~/Player"

export class Lobby {
  id: string
  players: Player[] = []
  game?: Game

  static welcome(socket: Client) {
    // Once the client has introduced itself,
    // we can route the player to the correct lobby.
    socket.messages.subscribe((message) => {
      if (message.type == "connect") {
        const lobby = getLobby(message.payload.lobbyId)
        const player = new Player(socket, message.payload.player)
        lobby.connect(player)
      }
    })
  }

  // Let a player connect to a lobby
  connect(player: Player) {
    if (this.game) {
      this.#log.error("Cannot join lobby while game is in progress")
      return
    }

    this.players.push(player)

    if (this.players.length == 2) {
      this.game = new Game(this.players)
      this.game.start()
    }
  }

  #log = new Logger("Lobby")
  constructor(id: string) {
    this.id = id
    this.players = []
  }
}

const lobbyRegister = new Map<string, Lobby>()
function getLobby(id: string) {
  if (!lobbyRegister.has(id)) {
    lobbyRegister.set(id, new Lobby(id))
  }
  return lobbyRegister.get(id)!
}
