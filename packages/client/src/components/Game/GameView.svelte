<script lang="ts">
  import CardsInHand from "~/components/Game/HandView.svelte"
  import HexMap from "~/components/Game/GameMapView.svelte"
  import MessageLog from "~/components/Debug/MessageLog.svelte"
  import { getPlayer } from "~/lib/Player"
</script>

<div class="flex-1 flex flex-col bg-slate-800 m-4 rounded-lg border-black border-2">
  <!-- Player Name -->
  <p class="font-bold p-4">{getPlayer().name}</p>

  <!-- Spacer -->
  <div class="flex-1" />

  <HexMap />

  <!-- Spacer -->
  <div class="flex-1" />

  <CardsInHand />

  <MessageLog />
</div>
