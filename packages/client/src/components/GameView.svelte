<script lang="ts">
  import CardsInHand from "~/components/CardsInHand.svelte"
  import EventLog from "~/components/EventLog.svelte"
  import { connectSocket } from "~/lib/socket"

  export let playerName: string

  const socket = connectSocket({ playerName, sessionId: "main-session" })
</script>

<div class="flex flex-col flex-1 bg-slate-300 m-4 rounded-lg border-black border-2 p-4">
  <!-- Player Name -->
  <p class="font-bold">{playerName}</p>

  <!-- Spacer -->
  <div class="flex-1" />

  <CardsInHand />

  <EventLog {socket} />
</div>
