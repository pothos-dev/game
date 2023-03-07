<script lang="ts">
  import CardsInHand from "~/components/CardsInHand.svelte"
  import HexMap from "~/components/HexMap.svelte"
  import MessageLog from "~/components/MessageLog.svelte"
  import { setGameContext } from "~/lib/game"
  import type { ActiveGame } from "~/types"

  export let activeGame: ActiveGame
  const gameState = activeGame.gameState

  setGameContext(activeGame)
</script>

<div class="flex flex-col flex-1 bg-slate-300 m-4 rounded-lg border-black border-2 p-4">
  <!-- Player Name -->
  <p class="font-bold">{gameState.player.name}</p>

  <!-- Spacer -->
  <div class="flex-1" />

  <HexMap />

  <!-- Spacer -->
  <div class="flex-1" />

  <CardsInHand />

  <MessageLog />
</div>
