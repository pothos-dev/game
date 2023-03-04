<script lang="ts">
  import { onMount } from "svelte"
  import type { Socket } from "~/lib/socket"
  import type { ServerEvent } from "~/types"

  export let socket: Socket

  let events: ServerEvent[] = []

  onMount(() =>
    socket.listen((event) => {
      events = [event, ...events]
    })
  )
</script>

<div class="flex flex-col">
  {#each events as event}
    <span>{JSON.stringify(event)}</span>
  {/each}
</div>
