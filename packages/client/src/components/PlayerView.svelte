<script lang="ts">
  import ConnectView from "~/components/ConnectView.svelte"
  import { providePlayer, type Player } from "~/lib/Player"

  export let player: Player
  providePlayer(player)
</script>

<ConnectView />
