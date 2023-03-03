<script lang="ts">
  import { onMount } from 'svelte'
  import type { SessionEvent } from '../../../server/src/events'
  import GameView from '../components/GameView.svelte'
  import { trpc } from '../lib/trpc'

  let events: SessionEvent[] = []

  onMount(() => {
    trpc.gameEvents.subscribe(undefined, {
      onData(event) {
        events = [event, ...events]
      },
    })
  })
</script>

<!-- 
{#each events as event}
  <div>{JSON.stringify(event)}</div>
{/each} -->

<div class="flex-1 flex flex-row">
  <GameView />
  <GameView />
</div>
