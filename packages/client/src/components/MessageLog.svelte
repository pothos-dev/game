<script lang="ts">
  import { onMount } from "svelte"
  import { getGame } from "~/lib/game"
  import { prettyJson } from "~/lib/json"
  import type { ServerMessage } from "~/types"

  let messages: ServerMessage[] = []

  const serverConnection = getGame().serverConnection
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
      <span>{prettyJson(message.payload)}</span>
    </div>
  {/each}
</div>
