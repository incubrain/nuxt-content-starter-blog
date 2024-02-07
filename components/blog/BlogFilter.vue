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
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CATEGORIES } from '~/types/posts'
import type { PostCategoriesT } from '~/types/posts'

const selectedCategory = ref<PostCategoriesT>(String(useRoute().params.category) as PostCategoriesT)
const upperFirstCategory = (cat: string) => cat.charAt(0).toUpperCase() + cat.slice(1)

const { website } = useInfo()
</script>
