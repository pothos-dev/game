<script lang="ts">
  import { onMount } from "svelte"
  import type { ServerConnection } from "~/lib/srverConnection"
  import type { ServerMessage } from "~/types"

  export let serverConnection: ServerConnection
  let messages: ServerMessage[] = []

  onMount(() =>
    serverConnection.messages.subscribe((message) => {
      messages = [message, ...messages]
    })
  )
</script>

<div class="flex flex-col h-20 overflow-y-scroll text-sm">
  {#each messages as message}
    <div>
      <span class="font-bold">{message.type}</span>
      <span>{JSON.stringify(message.payload)}</span>
    </div>
  {/each}
</div>
