<template>
  <div ref="sentinel" />
</template>

<script setup lang="ts">
const { getPostsOnScroll } = usePosts()
// Infinate Post Scroll
const sentinel = ref<HTMLElement | null>(null)

watchEffect((onCleanup) => {
  if (!sentinel.value) {
    // The sentinel element is not yet in the DOM.
    return
  }

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        await getPostsOnScroll()
      }
    })
  }, options)

  observer.observe(sentinel.value)

  // Remove Sentinel On UnMounted
  onCleanup(() => {
    if (observer && sentinel.value) {
      observer.unobserve(sentinel.value)
    }
  })
})
</script>

<style scoped></style>
