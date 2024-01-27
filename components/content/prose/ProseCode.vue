<template>
  <div class="rounded-md w-full flex flex-col overflow-hidden my-8">
    <div
      class="w-full flex justify-between items-center foreground px-4 h-10 mb-[-4px] relative"
    >
      <span class="text-xs m-0 p-0 h-full leading-none flex items-center"> {{ language }}</span>
      <div class="flex gap-1 justify-center items-center">
        <UButton
          color="white"
          variant="link"
          class="text-xs"
          @click="copy(code)"
        >
          <UIcon name="i-mdi-content-copy" />
          <span
            v-if="copied"
            class="text-primary-500 text-xs"
          >
            Copied!
          </span>
          <span
            v-else
            class="text-xs"
          >
            Copy code
          </span>
        </UButton>
      </div>
    </div>
    <div class="prose min-w-full">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const { copy, copied, text } = useClipboard()

defineProps({
  code: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: null
  },
  filename: {
    type: String,
    default: null
  },
  highlights: {
    type: Array as () => number[],
    default: () => []
  },
  meta: {
    type: String,
    default: null
  }
})
</script>

<style>
pre code .line {
  display: block;
  min-height: 1rem;
}
</style>
