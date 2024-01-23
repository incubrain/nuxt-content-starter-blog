<template>
  <div
    class="space-y-4 h-auto md:border md:border-color md:rounded-md md:p-4 lg:p-8 foreground md:background"
  >
    <div class="flex gap-4 flex-wrap">
      <UButton
        v-for="cat in categories.array"
        :key="`${website.nameSlug}-blog-${cat}`"
        color="primary"
        :aria-label="`${cat} posts`"
        :variant="categories.selected.lower.value === cat ? 'solid' : 'outline'"
        :to="`/blog-${cat}`"
        :label="cat"
        size="sm"
        class="cursor-pointer"
        @click="categories.toggle(cat)"
      />
    </div>
    <!-- <div class="space-y-2">
      <p class="text-xs">Tags:</p>
      <div class="flex gap-2 flex-wrap">
        <UButton
          v-for="tag in tags"
          :key="tag"
          color="primary"
          :variant="selectedTags.includes(tag) ? 'solid' : 'outline'"
          :label="tag"
          size="sm"
          class="cursor-pointer"
          :ui="{
            font: 'font-semibold',
            padding: {
              sm: 'py-1 px-2',
            }
          }"
          @click="postStore.toggleTag(tag)"
        />
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
const { categories } = useCatTag()
const { website } = useInfo()
</script>
