<script lang="ts">
  import LobbyView from "~/components/Lobby/LobbyView.svelte"
  import { Socket } from "~/lib/Socket"
</script>

{#await Socket.connect()}
  <p class="m-4">Connecting...</p>
{:then socket}
  <LobbyView {socket} />
{:catch error}
  <p class="m-4">{error.message}</p>
{/await}
