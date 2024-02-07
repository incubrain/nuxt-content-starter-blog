<template>
  <div class="relative">
    <slot
      name="base"
      :toggle-open="toggleOpen"
    />
    <UModal
      v-model="isOpen"
      fullscreen
      :ui="{
        background: '',
        fullscreen: 'w-[minmax(300px,1400px)] max-w-[1400px] h-auto'
      }"
    >
      <div class="w-full h-auto rounded-md overflow-hidden background">
        <slot name="modal" />

        <div
          class="background p-4 rounded-full absolute top-4 right-4 flex justify-center items-center border border-color"
        >
          <UButton
            variant="link"
            class="absolute"
            icon="i-mdi-close"
            aria-label="Close image modal"
            @click="isOpen = false"
          />
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false)

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}
</script>

<style scoped></style>
