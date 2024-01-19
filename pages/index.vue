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
const {website, seo } = useInfo()

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

if (website.name) {
  useSeoMeta({
    title: `${website.name} Home Page`,
    ogTitle: `${website.name} Home Page`,
    description: `${website.name} Home Page`,
    ogDescription: `${website.name} Home Page`,
    ogImage: `${website.url}/images/icons/home-icon.svg`,
    twitterCard: 'summary_large_image',
    twitterTitle: `${website.name} Home Page`,
    twitterDescription: `${website.name} Home Page`,
    twitterImage: `${website.url}/images/icons/home-icon.svg`
  })

  defineOgImageComponent('OgImageDefault', {
    title: seo.home.title,
    description: seo.home.description,
    image: seo.image
  })
}
</script>

<style scoped></style>
