import { Client } from "~/Client"
import { Player } from "~/Player"

const lobbyRegister = new Map<string, Lobby>()

export class Lobby {
  id: string
  players: Player[] = []

  static welcome(socket: Client) {
    // Once the client has introduced itself,
    // we can route the player to the correct lobby.
    socket.messages.subscribe((message) => {
      if (message.type == "connect") {
        const lobby = Lobby.get(message.payload.lobbyId)
        const player = new Player(socket, message.payload.player)
        lobby.connect(player)
      }
    })
  }

  // Get the lobby with the given ID
  static get(id: string): Lobby {
    if (!lobbyRegister.has(id)) {
      lobbyRegister.set(id, new Lobby(id))
    }
    return lobbyRegister.get(id)!
  }

  // Let a player connect to a lobby
  connect(player: Player) {
    this.players.push(player)
  }

  constructor(id: string) {
    this.id = id
    this.players = []
  }
}
