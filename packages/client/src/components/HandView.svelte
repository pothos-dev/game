<script lang="ts">
  import { getGame } from "~/lib/Game"
  import CardInHand from "./CardView.svelte"

  const cards = getGame().hand.cards
</script>

<div class="flex flex-row space-x-1">
  {#each $cards as card}
    <CardInHand {card} />
  {/each}
</div>
