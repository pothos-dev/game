<script lang="ts">
  import { onMount } from "svelte"
  import { prettyJson } from "@shared/lib/utils"
  import type { ServerMessage } from "@shared/types/messages"
  import { getGame } from "~/lib/Game"

  const game = getGame()
  let messages: ServerMessage[] = []

  onMount(() => {
    const subscription = game.socket.messages.subscribe((message) => {
      messages = [message, ...messages]
    })
    return () => subscription.unsubscribe()
  })
</script>

<div class="flex flex-col h-20 overflow-y-scroll text-sm">
  {#each messages as message}
    <div>
      <span class="font-bold">{message.type}</span>
      <span>{prettyJson(message.payload)}</span>
    </div>
  {/each}
</div>
