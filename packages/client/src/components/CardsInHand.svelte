<script lang="ts">
  import CardInHand from "./CardInHand.svelte"
  import { getGameState } from "~/lib/game"

  let hand = getGameState().player.hand
</script>

<div class="flex flex-row space-x-1">
  {#each $hand as card}
    <CardInHand {card} />
  {/each}
</div>
