<script lang="ts">
  import { getGameState } from "~/lib/game"
  import HexTile from "./HexTile.svelte"

  const map = getGameState().map
  const tiles = map.grid.toArray()

  const w = map.grid.pixelWidth * 1.1
  const h = map.grid.pixelHeight * 1.1
  const viewBox = [-w / 2, -h / 2, w, h].join(" ")
</script>

<svg class="w-full aspect-square" {viewBox}>
  {#each tiles as tile}
    <HexTile {tile} />
  {/each}
</svg>
