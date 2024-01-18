<template>
  <div class="relative">
    <slot />
    <div class="absolute z-10 top-2 right-2">
      <div class="flex gap-1 justify-center items-center text-white">
        <span
          v-if="copied"
          class="text-primary-500 text-sm"
        >
          Copied!
        </span>
        <span
          v-else
          class="text-sm"
        >
          Copy
        </span>
        <UIcon
          name="i-material-symbols-content-copy-outline cursor-pointer"
          @click="copy(code)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { copy, copied, text } = useClipboard()

defineProps({
  code: {
    type: String,
    required: true
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
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
code {
  padding-top: 1.5rem;
}
</style>
