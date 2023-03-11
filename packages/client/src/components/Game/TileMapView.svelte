<script lang="ts">
  import { getGame } from "~/lib/Game"
  import TileView from "./TileView.svelte"

  const grid = getGame().map.grid
  const tiles = grid.toArray()

  const w = grid.pixelWidth * 1.1
  const h = grid.pixelHeight * 1.1
  const viewBox = [-w / 2, -h / 2, w, h].join(" ")
</script>

<svg class="w-full aspect-square" {viewBox}>
  {#each tiles as tile}
    <TileView {tile} />
  {/each}
</svg>
