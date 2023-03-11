import { ServerMessages } from "@shared/types/messages"
import { PlayerConfig } from "@shared/types/players"
import { Client } from "~/Client"

// A player currently logged into the server
export class Player {
  id: string
  name: string
  color: string
  socket: Client

  // Send a message to the player's client
  send<T extends keyof ServerMessages>(type: T, payload: ServerMessages[T]): void {
    this.socket.send(type, payload)
  }

  constructor(socket: Client, config: PlayerConfig) {
    this.socket = socket
    this.id = config.id
    this.name = config.name
    this.color = config.color
  }
}
