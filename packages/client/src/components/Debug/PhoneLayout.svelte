<script lang="ts">
  // Pixel 6a
  export let aspectRatio = 1080 / 2040

  let containerWidth = 0
  let containerHeight = 0
  $: containerAspectRatio = containerWidth / containerHeight
  $: limitHeight = containerAspectRatio < aspectRatio
  $: slotWidth = limitHeight ? containerWidth : containerHeight * aspectRatio
  $: slotHeight = limitHeight ? containerWidth / aspectRatio : containerHeight
</script>

<div class="p-4 w-full h-full bg-slate-700">
  <div
    class="w-full h-full items-center justify-center flex"
    bind:clientWidth={containerWidth}
    bind:clientHeight={containerHeight}
  >
    <div
      class="flex bg-black rounded-3xl m-4 border-2 border-black text-white"
      style="width:{slotWidth}px;height:{slotHeight}px"
    >
      <slot />
    </div>
  </div>
</div>
