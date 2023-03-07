<script lang="ts" context="module">
  const lobbyId = createId("lobby")
</script>

<script lang="ts">
  import { createId } from "@shared/lib/utils"
  import GameView from "~/components/GameView.svelte"
  import { Game, provideGame } from "~/lib/Game"
  import { getPlayer } from "~/lib/Player"
  import type { Socket } from "~/lib/Socket"

  export let socket: Socket

  const player = getPlayer()
  const game = new Game({ socket, player })
  provideGame(game)
  game.connect(lobbyId)
</script>

<GameView />
