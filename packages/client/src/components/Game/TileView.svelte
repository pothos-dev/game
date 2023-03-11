<script lang="ts">
  import { getGame } from "~/lib/Game"
  import type { Tile } from "~/lib/Tile"

  export let tile: Tile
  let { id, controllingPlayerId, center, corners } = tile

  const game = getGame()
  $: color = $controllingPlayerId ? game.player.color : "#fff4"

  function onClick() {
    game.socket.send("game/map/flip", { tileId: id })
  }

  const points = corners
    .map(({ x, y }) => {
      const dx = x - center.x
      const dy = y - center.y
      x += dx * 0.04
      y += dy * 0.04
      return `${x},${y}`
    })
    .join(" ")
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<polygon {points} fill={color} stroke="#0004" stroke-width="5" on:click={onClick} />
