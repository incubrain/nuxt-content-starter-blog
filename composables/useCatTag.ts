import { CATEGORIES, TAGS } from '~/types/posts'

import type { PostTagsT, PostCategoriesT } from '~/types/posts'

const selectedCategory = ref<PostCategoriesT>('all')
// const selectedTags = ref<PostTagsT[]>([...TAGS])

export default () => {
  function initializeCategories<T>(
    initializer: (category: PostCategoriesT) => T
  ): Record<PostCategoriesT, T> {
    return Object.fromEntries(
      CATEGORIES.map((category) => [category, initializer(category)])
    ) as Record<PostCategoriesT, T>
  }

  /**
   * Change the selected category and fetch relevant posts.
   * @param category - The new category to set.
   */

  function toggleCategory(category: PostCategoriesT) {
    if (selectedCategory.value !== category) {
      selectedCategory.value = category
    }
  }

  return {
    categories: {
      initialize: initializeCategories,
      selected: {
        lower: selectedCategory,
        upperFirst: computed(
          () => selectedCategory.value.slice(0, 1).toUpperCase() + selectedCategory.value.slice(1)
        )
      },
      toggle: toggleCategory,
      array: CATEGORIES
    }
  }
}
