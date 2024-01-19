<template>
  <div>
    <CommonCTA
      :title="mainCTA"
      class="min-h-[100vh]"
    />
    <div class="spaced-y wrapper padded-x py-16">
      <LazyBlogShowcase
        :title="postTitle"
        post-category="frontend"
      >
        <UButton
          to="/blog/all"
          variant="outline"
        >
          View All
        </UButton>
      </LazyBlogShowcase>
    </div>
  </div>
</template>

<script setup lang="ts">
const info = useInfo()

const mainCTA = {
  label: 'Incubrain Blog Starter',
  main: 'SSR Ready Blog Starter Using Nuxt Content & Nuxt SEO',
  subtitle: 'This is still an active WIP, a landing page will be coming soon'
}

const postTitle = {
  label: 'Showcase Component',
  main: 'Why Should People Read?',
  subtitle: 'What can you find on our blog?'
}

if (info.website.name) {
  useSeoMeta({
    title: `${info.website.name} Home Page`,
    ogTitle: `${info.website.name} Home Page`,
    description: `${info.website.name} Home Page`,
    ogDescription: `${info.website.name} Home Page`,
    ogImage: `${info.website.url}/images/icons/home-icon.svg`,
    twitterCard: 'summary_large_image',
    twitterTitle: `${info.website.name} Home Page`,
    twitterDescription: `${info.website.name} Home Page`,
    twitterImage: `${info.website.url}/images/icons/home-icon.svg`
  })

  defineOgImageComponent('OgImageDefault', {
    title: info.seo.home.title,
    description: info.seo.home.description,
    image: info.seo.image
  })
}
</script>

<style scoped></style>
