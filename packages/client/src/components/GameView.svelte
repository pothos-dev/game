<script lang="ts">
  import { onMount } from "svelte"
  import { connectSocket } from "~/lib/socket"
  import type { ServerEvent } from "~/types"

  export let playerName: string

  let events: ServerEvent[] = []

  const socket = connectSocket({ playerName, sessionId: "main-session" })

  onMount(() =>
    socket.listen((event) => {
      events = [event, ...events]
    })
  )
</script>

<div class="flex flex-col flex-1 bg-slate-300 m-4 rounded-lg border-black border-2 p-4">
  {playerName}

  <div class="flex-1" />

  <div class="flex flex-col">
    {#each events as event}
      <span>{JSON.stringify(event)}</span>
    {/each}
  </div>
</div>
