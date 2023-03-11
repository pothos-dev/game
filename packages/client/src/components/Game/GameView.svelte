<script lang="ts">
  import HandView from "~/components/Game/HandView.svelte"
  import TileMapView from "~/components/Game/TileMapView.svelte"
  import { getPlayer } from "~/lib/Player"
</script>

<div class="flex-1 flex flex-col bg-slate-800 m-4 rounded-lg border-black border-2">
  <!-- Player Name -->
  <p class="font-bold p-4">{getPlayer().name}</p>

  <!-- Spacer -->
  <div class="flex-1" />

  <TileMapView />

  <!-- Spacer -->
  <div class="flex-1" />

  <HandView />
</div>
