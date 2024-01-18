<template>
  <div class="w-full grid grid-cols-1 lg:grid-cols-2 lg:gap-6 xl:gap-8">
    <div class="w-full lg:w-auto flex-col gap-2 lg:gap-6 xl:gap-8">
      <p class="page-showcase">
        <MDCSlot 
          :use="$slots.default"
          unwrap="p"
        />
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>
