<template>
  <div
    class="relative w-full h-full md:rounded-md border border-color p-4 gap-2 flex flex-col overflow-hidden background"
  >
    <BlogCatTag
      :tags="post.tags"
      :category="post.category"
      :post-link="post._path.split('/')[2]"
      class="pb-2 pl-2"
    />
    <NuxtImg
      class="rounded-md w-full object-cover aspect-video border border-color"
      :src="`images/blog/${post.category}/${post.featured_image}`"
      width="400"
      height="300"
      quality="80"
    />
    <div class="flex flex-col gap-2 items-start w-full px-2 pt-2 justify-center">
      <NuxtLink :to="`blog-${post.category}/${post._path.split('/')[3]}`">
        <h3 class="text-xl lg:text-xl font-bold">
          {{ post.title }}
        </h3>
      </NuxtLink>

      <div class="flex flex-row gap-2 justify-center items-center text-sm">
        <p class="text-primary">
          {{ useDateFormat(post.publishedAt, 'DD MMM YYYY').value }}
        </p>
        <span class="flex gap-2">
          by
          {{ author.name.given }}
          {{ author.name.surname }}
        </span>
      </div>
      <p class="text-sm">
        {{ post.description }}
      </p>
    </div>
    <div class="w-full flex justify-end h-full items-end pt-2">
      <UButton
        :to="`blog-${post.category}/${post._path.split('/')[3]}`"
        color="white"
        variant="solid"
      >
        Read More
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const { author } = useInfo()


defineProps({
  post: {
    type: Object,
    required: true
  }
})
</script>
