<script lang="ts">
  import { getGame } from "~/lib/Game"
  import CardView from "./CardView.svelte"

  const cards = getGame().hand.cards

  function left(i: number) {
    const num = $cards.length
    const left = (i / num) * 100 + "%"
    return left
  }
</script>

<div class="h-12 relative w-full">
  {#each $cards as card, i}
    <div class="absolute w-30" style="margin-left: {left(i)}">
      <CardView {card} />
    </div>
  {/each}
</div>
