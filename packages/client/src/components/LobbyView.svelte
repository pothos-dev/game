<script lang="ts">
  import GameView from "~/components/GameView.svelte"
  import { initGame } from "~/lib/game/GameState"

  export let playerName: string
  const sessionId = "main-session"
</script>

{#await initGame({ playerName, sessionId })}
  <p>Connecting...</p>
{:then activeGame}
  <GameView {activeGame} />
{/await}
