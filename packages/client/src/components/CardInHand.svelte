<script lang="ts">
  import type { Card } from "~/lib/Card"

  export let card: Card
</script>

<div
  class="w-32 h-12 rounded-md flex flex-col items-center justify-center"
  style="background-color: {card.color};"
>
  <p>{card.name}</p>
</div>
