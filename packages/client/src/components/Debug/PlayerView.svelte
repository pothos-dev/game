<script lang="ts">
  import PhoneLayout from "~/components/Debug/PhoneLayout.svelte"
  import ConnectView from "~/components/Lobby/ConnectView.svelte"
  import { providePlayer, type Player } from "~/lib/Player"

  export let player: Player
  providePlayer(player)
</script>

<PhoneLayout>
  <ConnectView />
</PhoneLayout>
