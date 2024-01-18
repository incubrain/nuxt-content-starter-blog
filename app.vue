<template>
  <div class="w-full foreground">
    <NavTop />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <LazyNavFooterWebsite />
    <UNotifications :timeout="4000" />
  </div>
</template>

<script setup lang="ts">
const info = useInfo()

useHead({
  htmlAttrs: {
    lang: 'en'
  },
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    }
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png'
    }
  ]
})

defineOgImageComponent('NuxtSeo', {
  title: `Welcome to ${info.website.name}`,
  description: 'Affordable Nuxt Expert Contractors'
})
</script>
