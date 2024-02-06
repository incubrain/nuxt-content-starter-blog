import type { ssrContextKey } from 'vue';
<script setup lang="ts">
import type { ImageProps } from '~/types/inline'

defineProps({
  images: {
    type: Array as () => ImageProps[],
    required: true
  }
})
</script>

<template>
  <div>
    <UCarousel
      v-slot="{ item }"
      :items="images"
      :ui="{ item: 'basis-full' }"
      class="rounded-lg overflow-hidden"
      arrows
    >
      <NuxtImg
        :src="item.src"
        :alt="`Image ${item.alt}`"
        class="w-full"
        draggable="false"
      />
    </UCarousel>
  </div>
</template>
