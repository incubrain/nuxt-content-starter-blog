<template>
  <div
    class="space-y-4 h-auto md:border md:border-color md:rounded-md md:p-4 lg:p-8 foreground md:background"
  >
    <div class="flex gap-4 flex-wrap">
      <UButton
        v-for="cat in CATEGORIES"
        :key="`${website.nameSlug}-blog-${cat}`"
        color="primary"
        :aria-label="`${cat} posts`"
        :variant="selectedCategory === cat ? 'solid' : 'outline'"
        :to="`/blog/${cat}`"
        :label="upperFirstCategory(cat)"
        size="sm"
        class="cursor-pointer"
        @click="toggleCategory(cat)"
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
import { CATEGORIES, TAGS } from '~/types/posts'
import type { PostCategoriesT } from '~/types/posts'

const selectedCategory = ref<PostCategoriesT>('frontend')
const upperFirstCategory = (cat: string) => cat.charAt(0).toUpperCase() + cat.slice(1)

function toggleCategory(category: PostCategoriesT) {
  if (selectedCategory.value !== category) {
    selectedCategory.value = category
  }
}

const { website } = useInfo()
</script>
