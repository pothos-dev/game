<script lang="ts">
  import GameView from "~/components/GameView.svelte"
  import { startGame } from "~/lib/game"

  export let playerName: string
  const lobbyId = "lobby:asdf"
</script>

{#await startGame({ playerName, lobbyId })}
  <p>Connecting to Lobby...</p>
{:then activeGame}
  <GameView {activeGame} />
{/await}
