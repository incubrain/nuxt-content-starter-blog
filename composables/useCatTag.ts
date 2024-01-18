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

  /**
   * Toggle the selected tag in the filter.
   * @param tag - The tag to toggle.
   */

  // function toggleTag(tag: PostTagsT) {
  //   const index = selectedTags.value.indexOf(tag)
  //   if (index < 0) {
  //     selectedTags.value.push(tag)
  //   } else {
  //     selectedTags.value.splice(index, 1)
  //   }
  // }

  return {
    categories: {
      initialize: initializeCategories,
      selected: selectedCategory,
      toggle: toggleCategory,
      array: CATEGORIES
    }
  }
}
