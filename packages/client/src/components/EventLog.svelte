<script lang="ts">
  import { onMount } from "svelte"
  import type { ServerConnection } from "~/lib/connection"

  export let serverConnection: ServerConnection
  let messages: string[] = []

  onMount(() =>
    serverConnection.serverMessages.subscribe((message) => {
      messages = [JSON.stringify(message), ...messages]
    })
  )
</script>

<div class="flex flex-col max-h-40 overflow-y-scroll">
  {#each messages as message}
    <div>{message}</div>
  {/each}
</div>
