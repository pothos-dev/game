<script lang="ts">
  import { getGame } from "~/lib/Game"
  import CardInHand from "./CardInHand.svelte"
</script>

<div class="flex flex-row space-x-1">
  {#each getGame().hand as card}
    <CardInHand {card} />
  {/each}
</div>
