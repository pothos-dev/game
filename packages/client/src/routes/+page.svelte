<script>
  import { onMount } from 'svelte'
  import { trpc } from '../lib/trpc'

  onMount(() => {
    trpc.ping.subscribe(undefined, {
      onData(data) {
        console.log('data', data)
      },
    })
  })
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
