<script>
  import { onMount } from 'svelte'
  import { trpc } from '../lib/trpc'

  let currentTime = 'loading...'

  onMount(() => {
    trpc.ping.subscribe(undefined, {
      onData(data) {
        currentTime = data
      },
    })
  })
</script>

<p>It is currently {currentTime}</p>
