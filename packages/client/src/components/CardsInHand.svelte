<script lang="ts">
  import CardInHand from "./CardInHand.svelte"
  import type { GameState } from "~/types"

  export let gameState: GameState
  let hand = gameState.hand
</script>

<div class="flex flex-row space-x-1">
  {#each $hand as card}
    <CardInHand {card} />
  {/each}
</div>
