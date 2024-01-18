<template>
  <div class="h-screen w-full wrapper">
    <div
      class="w-full h-full flex flex-col gap-8 items-center justify-center leading-none max-w-xl mx-auto"
    >
      <h2 class="text-3xl font-semibold">Route {{ error.url }} returned {{ error.statusCode }}</h2>
      <p class="text-xl">{{ error.message }}</p>
      <UAlert
        v-if="error.stack"
        color="red"
        variant="soft"
        title="Stack Trace"
        :description="error.stack"
      />
      <UButton
        size="lg"
        @click="handleError"
      >
        GO HOME
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Error {
  url: string
  statusCode: number
  statusMessage: string
  message: string
  description: string
  data: any
  stack: string
}

defineProps({
  error: {
    type: Object as PropType<Error>,
    required: true
  }
})

// clear error and redirect to home page
const handleError = () => clearError({ redirect: '/' })
</script>

<style></style>
