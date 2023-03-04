<script lang="ts">
  import { connectSocket } from "~/lib/socket"

  export let playerName: string

  const socket = connectSocket({ playerName })
</script>

<p class="flex-1 bg-slate-300 m-4 rounded-lg border-black border-2 p-4">
  {playerName}
</p>
