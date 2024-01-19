<template>
  <div class="relative w-full flex justify-center items-center overflow-hidden padded-y padded-x background bg-highlight rounded-md border border-color">
    <div class="bg-pattern" />
    <CommonBg />
    <CommonTitle :title="title" is-cta alignment="center" class="mx-auto">
      <slot />
    </CommonTitle>
  </div>
</template>

<script setup lang="ts">
import type { TitleT } from '~/types/content'

defineProps({
  title: {
    type: Object as PropType<TitleT>,
    required: true
  }
})
</script>

<style scoped></style>
