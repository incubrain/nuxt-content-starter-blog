<template>
  <div>
    <div class="flex flex-wrap gap-4">
      <UBadge
        :id="`${postLink}-${category}`"
        :label="category"
        :class="`${badgeColor(category)}`"
      />
      <UBadge
        v-for="tag in tags"
        :key="`${postLink}-${tag}`"
        :label="tag"
        variant="subtle"
        :color="badgeColor(tag)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PostTagsT, PostCategoriesT } from '~/types/posts'

// TODO: Add full post as prop and types for post
defineProps({
  postLink: {
    type: String,
    required: true
  },
  tags: {
    type: Array as PropType<PostTagsT[]>,
    required: false,
    default: () => []
  },
  category: {
    type: String as PropType<PostCategoriesT>,
    required: false,
    default: 'category missing'
  }
})

const badgeColor = (badge: PostCategoriesT | PostTagsT): string => {
  switch (badge) {
    // Categories
    case 'frontend':
      return 'primary'
    case 'backend':
      return 'amber'
    case 'projects':
      return 'purple'

    // Tags
    case 'nuxt':
    case 'vue':
    case 'supabase':
      return 'primary'
    case 'nitro':
    case 'auth':
    case 'ci':
      return 'orange'
    case 'tailwindcss':
    case 'postgresql':
    case 'typescript':
      return 'cyan' // Assuming a custom color in your Tailwind configuration
    case 'learning':
    case 'testing':
    case 'productivity':
      return 'yellow'
    default:
      return 'gray'
  }
}
</script>

<style scoped></style>
