<script>
  import PlayerView from "../components/PlayerView.svelte"
  import { Player } from "../lib/Player"
  const players = [
    new Player({ id: "1", name: "Yin", color: "red" }),
    new Player({ id: "2", name: "Yang", color: "blue" }),
  ]
</script>

<div class="flex-1 flex flex-row">
  {#each players as player}
    <PlayerView {player} />
  {/each}
</div>
