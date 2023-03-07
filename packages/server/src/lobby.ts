import { TypedClientMessage } from "@shared/types/messages"
import { startGame } from "~/game"
import { createLogger } from "~/lib/logging"
import { ClientConnection, GameLobby, PlayerConnection } from "~/types"

const log = createLogger("Lobby")

const lobbies = new Map<string, GameLobby>()

export function joinLobby(client: ClientConnection, message: TypedClientMessage<"lobby/join">) {
  const { clientId } = client
  const { lobbyId, playerName } = message.payload

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
