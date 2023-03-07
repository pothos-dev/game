<script lang="ts">
  import CardsInHand from "~/components/CardsInHand.svelte"
  import EventLog from "~/components/EventLog.svelte"
  import type { ActiveGame } from "~/lib/game/GameState"

  export let activeGame: ActiveGame
  const socket = activeGame.socket
  const gameState = activeGame.gameState
</script>

<div class="flex flex-col flex-1 bg-slate-300 m-4 rounded-lg border-black border-2 p-4">
  <!-- Player Name -->
  <p class="font-bold">{gameState.player.name}</p>

  <!-- Spacer -->
  <div class="flex-1" />

  <CardsInHand />

  <EventLog {socket} />
</div>
