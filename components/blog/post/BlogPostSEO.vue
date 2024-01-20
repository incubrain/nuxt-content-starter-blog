<template>
  <div
    class="fixed bottom-4 right-4 z-50"
    v-if="seoErrors.length > 0 && process.env.NODE_ENV !== 'production'"
  >
    <UChip
      :text="seoErrors.length"
      color="orange"
      size="2xl"
    >
      <UButton
        @click="isOpen = true"
        icon="i-mdi-magnify"
        class="rounded-full"
      />
    </UChip>

    <USlideover v-model="isOpen">
      <div class="p-4 grid gap-4">
        <h2> SEO Errors </h2>
        <UNotification
          v-for="error in seoErrors"
          :key="error.id"
          :title="error.title"
          :description="error.description"
          color="orange"
          icon="i-mdi-alert-circle-outline"
          :id="error.id"
          :timeout="0"
        />
      </div>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false)

// SEO Error Notifications (not visible in production)
const { seoErrors } = usePosts()
</script>

<style scoped></style>
