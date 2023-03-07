import { Server } from "~/Server"

const server = new Server(8080)

server.start()
process.on("SIGINT", () => server.stop())
