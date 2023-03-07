import { TypedClientMessage } from "@shared/types/messages"
import { PlayerConfig } from "@shared/types/players"
import { ClientConnection } from "~/clientConnection"
import { startGame } from "~/game"
import { createLogger } from "~/lib/logging"

const log = createLogger("Lobby")

export type GameLobby = {
  id: string
  playerConnections: PlayerConnection[]
}

export type PlayerConnection = ClientConnection & { player: PlayerConfig }

export function joinLobby(
  client: ClientConnection,
  payload: TypedClientMessage<"lobby/connect">["payload"]
) {
  const { lobbyId, player } = payload
  const playerConnection: PlayerConnection = { ...client, player: payload.player }

  const lobby = getLobby(lobbyId)
  lobby.playerConnections.push(playerConnection)

  log.info("Player joined lobby", { lobbyId, clientId: client.id, player })

  // Automatically start the game when two players have joined
  if (lobby.playerConnections.length == 2) {
    startGame(lobby)
  }
}

const lobbies = new Map<string, GameLobby>()

function getLobby(lobbyId: string): GameLobby {
  let lobby = lobbies.get(lobbyId)
  if (!lobby) {
    lobby = { id: lobbyId, playerConnections: [] }
    lobbies.set(lobbyId, lobby)
  }
  return lobby
}
