<script lang="ts">
  import CardsInHand from "~/components/HandView.svelte"
  import HexMap from "~/components/GameMapView.svelte"
  import MessageLog from "~/components/MessageLog.svelte"
  import { getPlayer } from "~/lib/Player"
</script>

<div class="flex flex-col flex-1 bg-slate-300 m-4 rounded-lg border-black border-2 p-4">
  <!-- Player Name -->
  <p class="font-bold">{getPlayer().name}</p>

  <!-- Spacer -->
  <div class="flex-1" />

  <HexMap />

  <!-- Spacer -->
  <div class="flex-1" />

  <CardsInHand />

  <MessageLog />
</div>
