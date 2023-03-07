import { startGame } from "~/game"
import { createLogger } from "~/lib/logging"
import { ClientConnection, ClientMessageOf, GameLobby, PlayerConnection } from "~/types"

const log = createLogger("Lobby")

const lobbies = new Map<string, GameLobby>()

export function joinLobby(client: ClientConnection, message: ClientMessageOf<"join lobby">) {
  const { clientId } = client
  const { lobbyId, playerName } = message

  const playerConnection: PlayerConnection = {
    ...client,
    playerName,
  }

  let lobby = lobbies.get(lobbyId)
  if (!lobby) {
    lobby = {
      lobbyId,
      players: [],
    }
    lobbies.set(lobbyId, lobby)
  }

  lobby.players.push(playerConnection)

  log.info("Player joined lobby", { lobbyId, clientId, playerName })

  if (lobby.players.length == 2) {
    startGame(lobby)
  }
}
