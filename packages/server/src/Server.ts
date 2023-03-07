import { Server as WSServer } from "ws"
import { Client } from "~/Client"
import { Logger } from "~/lib/Logger"
import { Lobby } from "~/Lobby"

export class Server {
  start() {
    this.#server.once("listening", () => {
      this.#log.info(`Listening on ws://localhost:${this.#server.options.port}`)
    })

    this.#server.on("connection", (socket) => {
      const client = new Client(socket)
      Lobby.welcome(client)
    })
  }

  stop() {
    this.#log.info("Stopping")
    this.#server.close()
  }

  #server: WSServer
  #log = new Logger("Server")
  constructor(port = 8080) {
    this.#server = new WSServer({ port })
  }
}
