<script lang="ts">
  import type { Hex } from "honeycomb-grid"

  export let tile: Hex

  const center = tile.center
  const points = tile.corners
    .map(({ x, y }) => {
      const dx = x - center.x
      const dy = y - center.y
      x += dx * 0.04
      y += dy * 0.04
      return `${x},${y}`
    })
    .join(" ")
</script>

<polygon {points} fill="#fff4" stroke="#0004" stroke-width="5" />
