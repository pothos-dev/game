<script lang="ts">
  import GameView from "~/components/GameView.svelte"
  import { Game, provideGame } from "~/lib/Game"
  import { getPlayer } from "~/lib/Player"
  import type { Socket } from "~/lib/Socket"

  export let socket: Socket
  export let lobbyId = "lobby:asdf"

  const player = getPlayer()
  const game = new Game({ socket, player })
  provideGame(game)
  game.connect(lobbyId)
</script>

<GameView />
