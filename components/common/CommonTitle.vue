<template>
  <div
    :class="`flex flex-col gap-4 lg:gap-6 text-${alignment} items-${alignment} lg:max-w-lg relative`"
  >
    <p
      v-if="title.label"
      class="text-sm font-bold uppercase text-primary"
    >
      {{ title.label }}
    </p>
    <h2
      class="text-3xl lg:text-4xl font-bold"
      :class="isCta ? 'underline decoration-primary-500 dark:decoration-primary-900' : ''"
    >
      {{ title.main }}
    </h2>
    <p
      v-if="title.subtitle"
      class="text-base text-balance max-w-sm"
    >
      {{ title.subtitle }}
    </p>
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { TitleT } from '~/types/content'

defineProps({
  title: {
    type: Object as PropType<TitleT>,
    required: true
  },
  alignment: {
    type: String,
    default: 'left'
  },
  isCta: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped></style>
