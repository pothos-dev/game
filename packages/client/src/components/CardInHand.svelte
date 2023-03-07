<script lang="ts">
  import type { Card } from "~/types"

  export let card: Card
</script>

<div class="w-32 h-12 rounded-md" style="background-color: {card.color};">
  <p>{card.name}</p>
</div>
