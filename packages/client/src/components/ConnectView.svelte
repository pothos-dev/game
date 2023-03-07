<script lang="ts">
  import LobbyView from "~/components/LobbyView.svelte"
  import { Socket } from "~/lib/Socket"

  let socket = Socket.connect()
</script>

{#await socket}
  <p>Connecting...</p>
{:then socket}
  <LobbyView {socket} />
{/await}
