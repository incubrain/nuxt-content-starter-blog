<template>
  <div>

  </div>
</template>

<script setup lang="ts">

const info = useInfo()

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
  
  defineOgImageComponent('NuxtSeo', {
    title: `${info.website.name} Home Page`,
    image: `images/icons/home-icon.svg`
  })
}

</script>

<style scoped>

</style>